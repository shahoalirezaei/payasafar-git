"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import RouteVisualizer from "@/components/utils/RouteVisualizer";

// هوک‌ها و استورها
import { useSearchStore, LocationData } from "@/store/zustand/search.store";
import { useCities } from "@/hooks/useCities";

// تعریف پراپ‌ها برای ارتباط با والد
interface ChangeDirectionContentProps {
  onOriginChange: (location: LocationData) => void;
  onDestChange: (location: LocationData) => void;
}

function ChangeDirectionContent({ onOriginChange, onDestChange }: ChangeDirectionContentProps) {
  // 1. دریافت مقادیر اولیه از استور
  const { bus } = useSearchStore(); // فقط bus را می‌خوانیم، متدهای set را اینجا استفاده نمی‌کنیم
  const { cities, isLoading } = useCities();

  // 2. استیت‌های لوکال (چرکنویس)
  // این‌ها دقیقاً همان چیزی هستند که کاربر در حال تایپ یا انتخاب آن‌هاست
  const [localOrigin, setLocalOrigin] = useState<LocationData>(bus.origin);
  const [localDest, setLocalDest] = useState<LocationData>(bus.destination);

  // استیت‌های نمایش لیست
  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);
  const sourceRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // 3. همگام‌سازی اولیه با استور (فقط یکبار)
  useEffect(() => {
    setLocalOrigin(bus.origin);
    setLocalDest(bus.destination);
    // اطلاع به والد از مقادیر اولیه (برای اطمینان)
    onOriginChange(bus.origin);
    onDestChange(bus.destination);
  }, []); // فقط در مانت اولیه

  // 4. هندلر جابجایی لوکال
  const handleSwapLocal = () => {
    const temp = localOrigin;
    
    // جابجایی در لوکال
    setLocalOrigin(localDest);
    setLocalDest(temp);

    // اطلاع به والد
    onOriginChange(localDest);
    onDestChange(temp);
  };

  // 5. هندلر انتخاب شهر
  const handleSelectOrigin = (city: any) => {
    const newLocation = { id: city.id, title: city.title, code: city.code, etitle: city.etitle || "" };
    setLocalOrigin(newLocation);
    onOriginChange(newLocation); // پاس به والد
    setShowSourceList(false);
  };

  const handleSelectDestination = (city: any) => {
    const newLocation = { id: city.id, title: city.title, code: city.code, etitle: city.etitle || "" };
    setLocalDest(newLocation);
    onDestChange(newLocation); // پاس به والد
    setShowDestList(false);
  };

  // توابع کمکی (کلیک بیرون و فیلتر)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) setShowSourceList(false);
      if (destRef.current && !destRef.current.contains(event.target as Node)) setShowDestList(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFilteredCities = (query: string) => {
    if (!cities) return [];
    if (!query) return cities;
    return cities.filter(c => c.title.includes(query) || c.etitle?.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div className="flex flex-col w-[323px] mt-3 gap-7 mx-auto">
      <RouteVisualizer
        imgSrc="/images/images/blue-bus1.webp"
        leftClassName="text-[#FF9A0D]"
        rightClassName="text-[#FF9A0D]"
      />
      
      <div className="relative input-base mb-[46px] flex justify-between z-20">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[41px] w-px bg-gray-400" />
        
        {/* دکمه جابجایی (لوکال) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange p-0.5 w-[25px] h-[25px] cursor-pointer hover:rotate-180 transition-transform duration-300 z-10 rounded-full border border-gray-200"
          onClick={handleSwapLocal}
        >
          <Image src="/images/icons/icon-switch.svg" width={17} height={17} alt="icon-switch" />
        </div>

        {/* --- مبدا --- */}
        <div className="relative w-full flex items-center" ref={sourceRef}>
          <input
            type="text"
            placeholder=" "
            value={localOrigin.title} 
            onFocus={() => setShowSourceList(true)}
            onChange={(e) => {
                const newTitle = e.target.value;
                // فقط تایتل عوض میشه، کد نال میشه
                const newLoc = { ...localOrigin, title: newTitle, code: null };
                setLocalOrigin(newLoc);
                onOriginChange(newLoc); // به والد میگیم که کاربر داره تایپ میکنه (و کد معتبر نیست)
                setShowSourceList(true);
            }}
            className="peer w-full pl-3 pr-5 text-sm rounded-xl outline-none border-none bg-inherit text-black placeholder-transparent"
          />
          <div className={`floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 text-xs transition-opacity ${localOrigin.title ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">مبدا</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>

          {showSourceList && (
            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-52 overflow-y-auto z-50">
              {isLoading ? ( <div className="p-3 text-xs text-gray-500 text-center">در حال دریافت...</div> ) 
              : getFilteredCities(localOrigin.title).length > 0 ? (
                <ul>
                  {getFilteredCities(localOrigin.title).map((city) => (
                    <li key={city.id} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-none border-gray-50 text-right" 
                        onClick={() => handleSelectOrigin(city)}>
                      {city.title}
                    </li>
                  ))}
                </ul>
              ) : ( <div className="p-3 text-xs text-red-400 text-center">موردی یافت نشد</div> )}
            </div>
          )}
        </div>

        {/* --- مقصد --- */}
        <div className="relative w-full flex items-center" ref={destRef}>
          <input
            type="text"
            placeholder=" "
            value={localDest.title}
            onFocus={() => setShowDestList(true)}
            onChange={(e) => {
                const newTitle = e.target.value;
                const newLoc = { ...localDest, title: newTitle, code: null };
                setLocalDest(newLoc);
                onDestChange(newLoc);
                setShowDestList(true);
            }}
            className="peer w-full bg-inherit text-sm rounded-xl outline-none border-none text-black focus:text-black pl-3 mr-2.5 pr-5"
          />
          <div className={`floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 pr-5 text-gray-400 text-xs transition-opacity ${localDest.title ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">مقصد</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>

          {showDestList && (
            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-52 overflow-y-auto z-50">
               {isLoading ? ( <div className="p-3 text-xs text-gray-500 text-center">در حال دریافت...</div> ) 
              : getFilteredCities(localDest.title).length > 0 ? (
                <ul>
                  {getFilteredCities(localDest.title).map((city) => (
                    <li key={city.id} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-none border-gray-50 text-right" 
                        onClick={() => handleSelectDestination(city)}>
                      {city.title}
                    </li>
                  ))}
                </ul>
              ) : ( <div className="p-3 text-xs text-red-400 text-center">موردی یافت نشد</div> )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeDirectionContent;