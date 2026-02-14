"use client";

import { useEffect, useState, useRef, use, useMemo } from "react";
import { useSearchStore } from "@/store/zustand/search.store";
import moment from "jalali-moment";
import { useCities } from "@/hooks/useCities"; 
import { FlagIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import PersianDatePicker from "../ui/PersianDatePicker";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";

export default function BusSearch() {
  // 1. دریافت استیت و متدها از Zustand
  const { 
    bus,                 // دسترسی به آبجکت bus که شامل origin و destination است
    setBusOrigin,        // تابع جدید برای تنظیم مبدا
    setBusDestination,   // تابع جدید برای تنظیم مقصد
    swapBusLocations     // تابع جدید برای جابجایی
  } = useSearchStore();

const source = bus.origin;
  const destination = bus.destination;
  const setSource = setBusOrigin;
  const setDestination = setBusDestination;
  const swapLocations = swapBusLocations;

  // 2. دریافت لیست شهرها از هوک دیتا
  const { cities, isLoading } = useCities();

  // تقویم
  const { setCalendarOpen, selectedDate,setSelectedDate } = useCalendarStore();

  // 3. استیت‌های لوکال برای نمایش دراپ‌داون
  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);

  // 4. رفرنس برای بستن لیست با کلیک بیرون
  const sourceRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

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

  // تابع کمکی برای فیلتر کردن
  const getFilteredCities = (query: string) => {
    if (!cities) return [];
    if (!query) return cities;
    return cities.filter(
      (c) => c.title.includes(query) || c.etitle?.toLowerCase().includes(query.toLowerCase())
    );
  };

  // ===============================
    // 📅 helpers
    // ===============================
  
    const todayMoment = useMemo(
      () => moment().startOf("day"),
      []
    );
  
    function isDisabled(m: moment.Moment) {
      return m.isBefore(todayMoment, "day");
    }
  
    function isSameDay(a?: Date | null, b?: moment.Moment) {
      if (!a || !b) return false;
      return moment(a).isSame(b, "day");
    }

    const formattedInput = useMemo(() => {
      if (!selectedDate) return "";
      return moment(selectedDate).format("jYYYY/jMM/jDD");
    }, [selectedDate]);
  
    const dayOfWeek = useMemo(() => {
      if (!selectedDate) return "";
      return moment(selectedDate).format("dddd");
    }, [selectedDate]);
  
    const relativeText = useMemo(() => {
      if (!selectedDate) return "";
  
      const diff = moment(selectedDate)
        .startOf("day")
        .diff(todayMoment, "days");
  
      if (diff === 0) return "امروز";
      if (diff === 1) return "فردا";
      if (diff > 1) return `${diff} روز بعد`;
      if (diff === -1) return "دیروز";
      return `${Math.abs(diff)} روز قبل`;
    }, [selectedDate, todayMoment]);

  return (
    <>
      {/* --- Header Decoration --- */}
      <div className="h-[21px] mt-[57px] mb-5 flex w-[298px] items-center justify-between">
         {/* قسمت‌های گرافیکی بالای فرم (بدون تغییر) */}
         <div className="flex items-center text-[#D9D9D9] justify-between gap-[6.5px]">
          <span className={source.title ? "text-orange" : ""}>
            <MapPinIcon className="w-4 h-4 p-0" />
          </span>
          <div className="flex flex-row-reverse items-center">
            <div className={`w-[89px] h-px border-t ${source.title ? "text-orange" : "text-current"}`} style={{ borderStyle: "dashed", borderWidth: "1px", borderImage: "repeating-linear-gradient(to left, currentColor 0 5px, transparent 5px 10px) 1" }}></div>
            <div className={`ml-0.5 w-0 h-0 border-t-[4px] border-b-[4px] border-r-[6px] border-t-transparent border-b-transparent ${source.title ? "border-r-orange-500 text-orange" : "border-r-current"}`}></div>
          </div>
        </div>
        <div>
          <Image src="/images/images/bus-icon.webp" width={60} height={21} alt="bus icon" />
        </div>
        <div className="flex items-center text-[#D9D9D9] justify-between gap-[6.5px]">
          <div className="flex items-center gap-0">
            <div className={`w-[89px] h-px border-t ${destination.title ? "text-orange" : "text-current"}`} style={{ borderStyle: "dashed", borderWidth: "1px", borderImage: "repeating-linear-gradient(to right, currentColor 0 5px, transparent 5px 10px) 1" }}></div>
            <div className={`mr-0.5 w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent ${destination.title ? "border-l-orange-500" : "border-l-current"}`}></div>
          </div>
          <span className={destination.title ? "text-orange" : ""}>
            <FlagIcon className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* --- Main Inputs Container --- */}
      {/* z-index 20 مهم است تا لیست روی تقویم بیفتد */}
      <div className="relative input-base !h-[41px] mb-[46px] flex justify-between z-20"> 
        
        {/* Divider */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[41px] w-px bg-gray-400" />
        
        {/* Switch Button */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange p-0.5 w-[25px] h-[25px] rounded-full border border-gray-200 cursor-pointer z-10 hover:rotate-180 transition-transform duration-300"
          onClick={swapLocations}
        >
          <Image src="/images/icons/icon-switch.svg" width={17} height={17} alt="icon-switch" />
        </div>

        {/* --- ORIGIN (مبدا) --- */}
        <div className="relative w-full flex items-center h-[41px]" ref={sourceRef}>
          <input
            type="text"
            placeholder=" "
            value={source.title}
            onFocus={() => setShowSourceList(true)}
            onChange={(e) => {
              setSource(e.target.value, null); // کد نال می‌شود چون دستی تایپ شده
              setShowSourceList(true);
            }}
            className="peer w-full px-3 text-sm rounded-xl outline-none border-none bg-inherit text-black placeholder-transparent"
          />
          <div className={`floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 text-xs transition-opacity ${source.title ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">مبدا</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>

          {/* Absolute List for Origin */}
          {showSourceList && (
            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-52 overflow-y-auto z-50">
              {isLoading ? (
                 <div className="p-3 text-xs text-gray-500 text-center">در حال دریافت لیست...</div>
              ) : getFilteredCities(source.title).length > 0 ? (
                <ul>
                  {getFilteredCities(source.title).map((city) => (
                    <li
                      key={city.id}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-none border-gray-50"
                      onClick={() => {
                        setSource(city.title, city.code);
                        setShowSourceList(false);
                      }}
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

        {/* --- DESTINATION (مقصد) --- */}
        <div className="relative w-full flex items-center h-[41px]" ref={destRef}>
          <input
            type="text"
            placeholder=" "
            value={destination.title}
            onFocus={() => setShowDestList(true)}
            onChange={(e) => {
              setDestination(e.target.value, null);
              setShowDestList(true);
            }}
            className="peer w-full bg-inherit text-sm rounded-xl outline-none border-none text-black focus:text-black pl-3 mr-2.5 pr-5"
          />
          <div className={`floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 pr-5 text-gray-400 text-xs transition-opacity ${destination.title ? "opacity-0" : "opacity-100"}`}>
            <span className="font-semibold">مقصد</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>

          {/* Absolute List for Destination */}
          {showDestList && (
            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-52 overflow-y-auto z-50">
               {isLoading ? (
                 <div className="p-3 text-xs text-gray-500 text-center">در حال دریافت لیست...</div>
              ) : getFilteredCities(destination.title).length > 0 ? (
                <ul>
                  {getFilteredCities(destination.title).map((city) => (
                    <li
                      key={city.id}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-none border-gray-50"
                      onClick={() => {
                        setDestination(city.title, city.code);
                        setShowDestList(false);
                      }}
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

      {/* --- Date Picker (بدون تغییر) --- */}
      <div className="input-base mb-[46px] relative flex items-center">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder=" "
                  className="
                  peer
                  w-full
                  bg-inherit
                  text-sm
                  rounded-xl
                  outline-none
                  text-black
                  focus:text-black
                  pr-3 pl-10
                "
                value={selectedDate
          ? `${formattedInput} (${dayOfWeek}، ${relativeText})`
          : ""}
                />
      
                <div
                  className="
                  floating-placeholder
                  pointer-events-none
                  absolute right-3 top-1/2 -translate-y-1/2
                  flex gap-1
                  text-gray-400 text-xs
                  transition-opacity
                "
                >
                  <span className="font-semibold">1403/11/28</span>
                  <span className="font-light">(یکشنبه، امروز)</span>
                </div>
      
                {/* Calendar icon */}
                <div
                onClick={(e) => {
        e.stopPropagation(); // جلوگیری از تداخل کلیک
        setCalendarOpen(true);
      }}
                  className="
                  absolute left-[10px] top-1/2 -translate-y-1/2
                  bg-orange
                  flex items-center justify-center
                  w-[25px] h-[25px]
                  rounded-full
                "
                >
                  <CalendarDays className="w-[15px] h-[15px] text-white" />
                </div>
              </div>
            </div>

      <div className="absolute left-1/2 -bottom-[20px] -translate-x-1/2">
        <button className="btn-blue" onClick={() => console.log(source, destination)}>
            جستجو بلیط
        </button>

        
      </div>
      
    </>
  );
}
