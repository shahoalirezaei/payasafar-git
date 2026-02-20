// src/components/Bus/Search/SearchInfoBar.tsx
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { FlagIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";
import moment from "jalali-moment";

// هوک‌ها و استورها
import { useSearchStore } from "@/store/zustand/search.store";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";
import { useCities } from "@/hooks/useCities";

function SearchInfoBar() {
  const router = useRouter();

  // 1. دریافت استیت و اکشن‌ها
  const { 
    bus, 
    setBusOrigin, 
    setBusDestination, 
    swapBusLocations 
  } = useSearchStore();

  const { cities, isLoading } = useCities();
  const { setCalendarOpen, selectedDate, setSelectedDate } = useCalendarStore();

  const source = bus.origin;
  const destination = bus.destination;

  // 2. استیت‌های لوکال برای مقدار اینپوت (رفع مشکل تایپ)
  const [originQuery, setOriginQuery] = useState(source.title);
  const [destQuery, setDestQuery] = useState(destination.title);

  // 3. استیت‌های لوکال برای نمایش لیست
  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);

  // 4. رفرنس‌ها برای بستن دراپ‌داون
  const sourceRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // 5. سینک کردن استیت لوکال با استور (وقتی دکمه جابجایی زده میشه یا صفحه لود میشه)
  useEffect(() => {
    setOriginQuery(source.title);
  }, [source.title]);

  useEffect(() => {
    setDestQuery(destination.title);
  }, [destination.title]);

  // بستن لیست با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) {
        setShowSourceList(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 6. تابع فیلتر شهرها
  const getFilteredCities = (query: string) => {
    if (!cities) return [];
    if (!query) return cities;
    return cities.filter(
      (c) => c.title.includes(query) || (c.etitle && c.etitle.toLowerCase().includes(query.toLowerCase()))
    );
  };

  // 7. فرمت‌دهی تاریخ
  const formattedInput = useMemo(() => {
    if (!selectedDate) return "";
    return moment(selectedDate).format("jYYYY/jMM/jDD");
  }, [selectedDate]);

  const dayOfWeek = useMemo(() => {
    if (!selectedDate) return "";
    return moment(selectedDate).format("dddd");
  }, [selectedDate]);

  // 8. هندلر جستجو (تغییر URL)
  const handleSearch = () => {
    // بررسی اینکه آیا شهرها کد دارند (یعنی از لیست انتخاب شده‌اند)
    if (!source.code || !destination.code) {
      alert("لطفا شهر مبدا و مقصد را از لیست انتخاب کنید.");
      return;
    }
    if (!selectedDate) {
      alert("لطفا تاریخ سفر را انتخاب کنید.");
      return;
    }

    const originSlug = source.etitle.trim().toLowerCase().replace(/\s+/g, '-');
    const destSlug = destination.etitle.trim().toLowerCase().replace(/\s+/g, '-');
    const jalaliDate = moment(selectedDate).format("jYYYY-jMM-jDD");

    // هدایت به صفحه جدید (یا رفرش شدن همین صفحه با پارامترهای جدید)
    router.push(`/bus/${originSlug}-${destSlug}?departing=${jalaliDate}`);
  };

  // 9. هندلر روز بعد
  const handleNextDay = () => {
    let nextDay;
    if (selectedDate) {
      nextDay = moment(selectedDate).add(1, 'day').toDate();
    } else {
      nextDay = moment().add(1, 'day').toDate();
    }
    setSelectedDate(nextDay);
    
    // اختیاری: اگر بخواهید بلافاصله بعد از زدن دکمه روز بعد جستجو انجام شود، اینجا handleSearch را صدا نزنید
    // چون ممکن است کاربر بخواهد چند روز جلو برود. بهتر است کاربر خودش دکمه جستجو را بزند.
    // اما اگر اصرار دارید بلافاصله رفرش شود، باید منطق router.push را اینجا هم کپی کنید.
  };

  // 10. هندلرهای انتخاب شهر
  const handleSelectOrigin = (city: any) => {
    setBusOrigin({ id: city.id, title: city.title, code: city.code, etitle: city.etitle || "" });
    setOriginQuery(city.title); // آپدیت دستی لوکال
    setShowSourceList(false);
  };

  const handleSelectDestination = (city: any) => {
    setBusDestination({ id: city.id, title: city.title, code: city.code, etitle: city.etitle || "" });
    setDestQuery(city.title); // آپدیت دستی لوکال
    setShowDestList(false);
  };

  return (
    <div className="lg:flex items-center px-[18px] bg-white w-[858px] h-[78px] rounded-[20px] shadow-box mx-auto hidden">
      <div className="relative input-base w-[323px] flex justify-between ml-9">
        {/* Divider */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[41px] w-px bg-gray-400" />
        
        {/* Icon Switch */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange p-0.5 w-[25px] h-[25px] cursor-pointer hover:rotate-180 transition-transform duration-300 z-10"
          onClick={swapBusLocations}
        >
          <Image
            src="/images/icons/icon-switch.svg"
            width={17}
            height={17}
            alt="icon-switch"
          />
        </div>
        
        <div className="absolute top-1/2 right-[12px] -translate-y-1/2 text-[#D9D9D9]">
          <MapPinIcon className="w-4 h-4 p-0"/>
        </div>
        <div className="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#D9D9D9]">
          <FlagIcon className="w-4 h-4 p-0"/>
        </div>

        {/* --- مبدا --- */}
        <div className="relative w-full flex items-center" ref={sourceRef}>
          <input
            type="text"
            placeholder=" "
            // بایند به استیت لوکال
            value={originQuery} 
            onFocus={() => setShowSourceList(true)}
            onChange={(e) => {
                // فقط آپدیت استیت لوکال
                setOriginQuery(e.target.value);
                setShowSourceList(true);
            }}
            className="peer w-full pl-3 pr-14 text-sm rounded-xl outline-none border-none bg-inherit text-black placeholder-transparent"
          />

          <div className={`floating-placeholder pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 text-xs transition-opacity ${originQuery ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">مبدا</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>

          {/* دراپ‌داون مبدا */}
          {showSourceList && (
            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-52 overflow-y-auto z-50">
              {isLoading ? (
                 <div className="p-3 text-xs text-gray-500 text-center">در حال بارگذاری...</div>
              ) : getFilteredCities(originQuery).length > 0 ? (
                <ul>
                  {getFilteredCities(originQuery).map((city) => (
                    <li
                      key={city.id}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-none border-gray-50 text-right"
                      onClick={() => handleSelectOrigin(city)}
                    >
                      {city.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-xs text-red-400 text-center">موردی یافت نشد</div>
              )}
            </div>
          )}
        </div>

        {/* --- مقصد --- */}
        <div className="relative w-full flex items-center" ref={destRef}>
          <input
            type="text"
            placeholder=" "
            // بایند به استیت لوکال
            value={destQuery}
            onFocus={() => setShowDestList(true)}
            onChange={(e) => {
                setDestQuery(e.target.value);
                setShowDestList(true);
            }}
            className="peer w-full bg-inherit text-sm rounded-xl outline-none border-none text-gray-400 focus:text-black pl-3 mr-2.5 pr-10"
          />

          <div className={`floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 pr-5 text-gray-400 text-xs transition-opacity ${destQuery ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">مقصد</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>

          {/* دراپ‌داون مقصد */}
          {showDestList && (
            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-52 overflow-y-auto z-50">
               {isLoading ? (
                 <div className="p-3 text-xs text-gray-500 text-center">در حال بارگذاری...</div>
              ) : getFilteredCities(destQuery).length > 0 ? (
                <ul>
                  {getFilteredCities(destQuery).map((city) => (
                    <li
                      key={city.id}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-none border-gray-50 text-right"
                      onClick={() => handleSelectDestination(city)}
                    >
                      {city.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-xs text-red-400 text-center">موردی یافت نشد</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- Date Picker --- */}
      <div className="input-base w-[186px] h-[41px] relative flex items-center ml-2.5">
        <div className="relative w-full">
          <input
            type="text"
            placeholder=" "
            readOnly
            onClick={(e) => {
                e.stopPropagation();
                setCalendarOpen(true);
            }}
            className="peer w-full bg-inherit text-sm rounded-xl outline-none text-gray-400 focus:text-black pr-3 pl-10 cursor-pointer"
            value={selectedDate ? `${formattedInput} (${dayOfWeek})` : ""}
          />

          <div className={`floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 text-xs transition-opacity ${selectedDate ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">تاریخ سفر</span>
            <span className="font-light">(انتخاب کنید)</span>
          </div>

          {/* Calendar icon */}
          <div
            className="absolute left-[10px] top-1/2 -translate-y-1/2 bg-orange flex items-center justify-center w-[25px] h-[25px] rounded-full cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                setCalendarOpen(true);
            }}
          >
            <CalendarDays className="w-[15px] h-[15px] text-white" />
          </div>
        </div>
      </div>

      {/* دکمه روز بعد */}
      <button 
        onClick={handleNextDay}
        className="btn-orange font-semibold text-[10px] flex gap-1 h-[25px]"
      >
        روز بعد
        <ArrowLeft size={16} />
      </button>

      {/* دکمه جستجو */}
      <button 
        onClick={handleSearch}
        className="btn-orange px-7 h-[40px] text-[16px] font-semibold mr-auto"
      >
        جستجو بلیط
      </button>
    </div>
  );
}

export default SearchInfoBar;