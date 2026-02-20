"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  ChevronDown,
  Calendar,
  Plus,
  CirclePlus,
  Check,
  CalendarDays,
} from "lucide-react";
import { Passenger } from "@/types/booking";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import { SeatIcon, ArrowDownfill } from "../ui/StepperIcons";

interface PassengerRowProps {
  seatNumber: number;
  index: number;
}

// 🛠 تابع کمکی: فقط حروف فارسی (برای نام و نام خانوادگی)
const persianAlphaOnly = (value: string) => {
  return value.replace(/[^آ-یژپچگ \s]/g, "");
};

// 🛠 تابع کمکی: تبدیل اعداد فارسی به انگلیسی و حذف حروف
const toEnglishDigits = (value: string) => {
  return value
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
    .replace(/\D/g, "");
};

// 🛠 تابع کمکی: بررسی صحت فرمول کد ملی ایران
function isValidNationalCode(nc: string) {
  if (!nc || nc.length !== 10) return false;
  if (
    nc === "1111111111" || nc === "0000000000" ||
    nc === "2222222222" || nc === "3333333333" ||
    nc === "4444444444" || nc === "5555555555" ||
    nc === "6666666666" || nc === "7777777777" ||
    nc === "8888888888" || nc === "9999999999"
  ) {
    return false;
  }
  var c = parseInt(nc.charAt(9));
  var n =
    parseInt(nc.charAt(0)) * 10 +
    parseInt(nc.charAt(1)) * 9 +
    parseInt(nc.charAt(2)) * 8 +
    parseInt(nc.charAt(3)) * 7 +
    parseInt(nc.charAt(4)) * 6 +
    parseInt(nc.charAt(5)) * 5 +
    parseInt(nc.charAt(6)) * 4 +
    parseInt(nc.charAt(7)) * 3 +
    parseInt(nc.charAt(8)) * 2;
  var r1 = parseInt((n % 11).toString());
  if (r1 < 2) {
    if (c === r1) return true;
  } else if (11 - r1 === c) {
    return true;
  }
  return false;
}

const PassengerRow = ({ seatNumber, index }: PassengerRowProps) => {
  const { passengers, updatePassenger } = useBookingStore();
  
  // خواندن اطلاعات از استور (اگر نبود، مقدار پیش‌فرض می‌دهیم)
  const data = passengers[seatNumber] || {
    firstName: "",
    LastName: "",
    nationalCode: "",
    gender: 0, // 1 = مرد، 2 = زن
    birthDate: "",
  };

  // استیت‌های محلی برای مدیریت راحت‌تر تاریخ
  const [bDay, setBDay] = useState("");
  const [bMonth, setBMonth] = useState("");
  const [bYear, setBYear] = useState("");

  // استیت برای نمایش ارورها
  const [errors, setErrors] = useState({ nationalCode: "", birthDate: "", gender: "" });

  // اگر دیتا از قبل تو استور بود، روز و ماه و سال رو پر کن
  useEffect(() => {
    if (data.birthDate) {
      const parts = data.birthDate.split("/");
      if (parts.length === 3) {
        setBYear(parts[0]);
        setBMonth(parts[1]);
        setBDay(parts[2]);
      }
    }
  }, [data.birthDate]);

  // تابع آپدیت استور
  const handleUpdate = (field: string, value: any) => {
    updatePassenger(seatNumber, { [field]: value });
  };

  // هندلر کد ملی
  const handleNationalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = toEnglishDigits(e.target.value);
    if (val.length <= 10) {
      handleUpdate("nationalCode", val);
      
      if (val.length > 0 && val.length < 10) {
        setErrors((prev) => ({ ...prev, nationalCode: "کد ملی باید ۱۰ رقم باشد" }));
      } else if (val.length === 10) {
        if (!isValidNationalCode(val)) {
          setErrors((prev) => ({ ...prev, nationalCode: "کد ملی نامعتبر است" }));
        } else {
          setErrors((prev) => ({ ...prev, nationalCode: "" })); 
        }
      } else {
        setErrors((prev) => ({ ...prev, nationalCode: "" }));
      }
    }
  };

  // هندلرهای تاریخ تولد
  const checkAndSaveBirthDate = (y: string, m: string, d: string) => {
    if (y.length === 4 && m.length > 0 && d.length > 0) {
      const yearNum = parseInt(y);
      if (yearNum < 1300 || yearNum > 1404) {
        setErrors((prev) => ({ ...prev, birthDate: "سال نامعتبر" }));
        handleUpdate("birthDate", "");
      } else {
        setErrors((prev) => ({ ...prev, birthDate: "" }));
        const formattedM = m.padStart(2, "0");
        const formattedD = d.padStart(2, "0");
        handleUpdate("birthDate", `${y}/${formattedM}/${formattedD}`);
      }
    } else {
      handleUpdate("birthDate", "");
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = toEnglishDigits(e.target.value);
    if (val.length > 2) return;
    if (parseInt(val) > 31) val = "31";
    setBDay(val);
    checkAndSaveBirthDate(bYear, bMonth, val);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = toEnglishDigits(e.target.value);
    if (val.length > 2) return;
    if (parseInt(val) > 12) val = "12";
    setBMonth(val);
    checkAndSaveBirthDate(bYear, val, bDay);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = toEnglishDigits(e.target.value);
    if (val.length > 4) return;
    setBYear(val);
    checkAndSaveBirthDate(val, bMonth, bDay);
  };

  // هندلر تغییر جنسیت (ارور را هم پاک می‌کند)
  const handleGenderChange = (val: number) => {
    handleUpdate("gender", val);
    setErrors((prev) => ({ ...prev, gender: "" }));
  };

  return (
    <div
      className={`w-full relative py-4 ${index !== 0 ? "border-t border-t-[#EDEDED]" : ""}`}
    >
      {/* بخش شماره صندلی - بدون تغییر */}
      <div className="mb-4">
        <SeatIcon className="blue600 w-5 h-5" />
        <span className="blue600 text-[12px] font-semibold">
          صندلی {seatNumber} {index === 0 && "(سرپرست)"}
        </span>
      </div>

      {/* ردیف اول: نام، نام خانوادگی، کدملی */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between lg:justify-start items-center gap-y-4 gap-x-2 lg:gap-x-8 mb-[22px]">
        {/* اینپوت نام */}
        <div className="form-input px-4 flex items-center p-1 w-[48%] lg:w-[126px]">
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleUpdate("firstName", persianAlphaOnly(e.target.value))}
            className="w-full bg-inherit outline-none text-gray-400 focus:text-black pr-2 rounded-[33px]"
            placeholder="نام"
          />
        </div>

        {/* اینپوت نام خانوادگی */}
        <div className="form-input px-4 flex items-center p-1 w-[48%] lg:w-[161px]">
          <input
            type="text"
            value={data.LastName}
            onChange={(e) => handleUpdate("LastName", persianAlphaOnly(e.target.value))}
            className="w-full bg-inherit outline-none text-gray-400 focus:text-black pr-2 rounded-[33px] text-[12px]"
            placeholder="نام خانوادگی"
          />
        </div>

        {/* اینپوت کدملی */}
        <div className="form-input px-4 relative flex items-center w-full lg:w-[195px] lg:mr-[7px]">
          <div className="relative w-full">
            <input
              type="text"
              value={data.nationalCode}
              onChange={handleNationalCodeChange}
              placeholder=" "
              className={`peer w-full bg-inherit text-sm rounded-[33px] text-[12px] outline-none text-gray-400 focus:text-black pr-3 pl-10 ${errors.nationalCode ? 'border-b border-red-500' : ''}`}
            />
            <div className="floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 text-xs transition-opacity">
              <span className="font-semibold">کد ملی</span>
              <span className="font-light">(اتباع خارجه)</span>
            </div>
            {/* نمایش ارور کدملی */}
            {errors.nationalCode && <span className="text-red-500 text-[10px] absolute -bottom-5 right-2">{errors.nationalCode}</span>}
          </div>
        </div>
      </div>

      {/* ردیف دوم: تاریخ تولد و جنسیت */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between lg:justify-start items-center gap-y-4 gap-x-2 lg:gap-[7px]">
        {/* روز */}
        <div className="form-input px-4 flex items-center p-1 w-[30%] lg:w-[69px]">
          <input
            type="text"
            value={bDay}
            onChange={handleDayChange}
            className="w-full bg-inherit outline-none text-gray-400 focus:text-black pr-2 rounded-[33px] text-[12px] text-center"
            placeholder="روز"
          />
        </div>

        {/* ماه */}
        <div className="form-input px-4 flex items-center p-1 w-[30%] lg:w-[93px]">
          <input
            type="text"
            value={bMonth}
            onChange={handleMonthChange}
            className="w-full bg-inherit outline-none text-gray-400 focus:text-black pr-2 rounded-[33px] text-[12px] text-center"
            placeholder="ماه"
          />
        </div>

        {/* سال */}
        <div className="form-input px-4 relative flex items-center w-[30%] lg:w-[118px]">
          <div className="relative w-full">
            <input
              type="text"
              value={bYear}
              onChange={handleYearChange}
              placeholder=" "
              className={`peer w-full bg-inherit text-sm rounded-[33px] text-[12px] outline-none text-gray-400 focus:text-black pr-3 pl-10 ${errors.birthDate ? 'border-b border-red-500' : ''}`}
            />
            <div className="floating-placeholder pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 text-xs transition-opacity">
              <span className="font-semibold">سال تولد</span>
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange flex items-center justify-center w-[25px] h-[25px] rounded-full">
              <CalendarDays className="w-[15px] h-[15px] text-white" />
            </div>
            {/* نمایش ارور تاریخ تولد */}
            {errors.birthDate && <span className="text-red-500 text-[10px] absolute -bottom-5 right-2">{errors.birthDate}</span>}
          </div>
        </div>

        {/* جنسیت */}
        <div className="w-full lg:w-auto">
          {/* دسکتاپ */}
          <div className="hidden lg:block relative form-input lg:mr-7 pr-1 w-full lg:w-[100px]">
            <div className="relative h-full">
              <select
                value={data.gender === 0 ? "" : (data.gender === 1 ? "male" : "female")}
                onChange={(e) => handleGenderChange(e.target.value === "male" ? 1 : 2)}
                required
                className={`peer w-full h-full bg-[#F8F9FB] text-[12px] text-gray-700 rounded-[33px] outline-none border transition-all pr-4 pl-12 appearance-none cursor-pointer invalid:text-gray-400 focus:bg-white focus:ring-blue-100 ${errors.gender ? 'border-red-500' : 'border-transparent focus:border-blue-200'}`}
              >
                <option value="" disabled hidden>جنسیت</option>
                <option value="male" className="text-gray-800">مرد</option>
                <option value="female" className="text-gray-800">زن</option>
              </select>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FF9F1C] text-white rounded-full flex items-center justify-center shadow-md pointer-events-none">
                <ArrowDownfill className="blue600" />
              </div>
            </div>
          </div>
          
          {/* موبایل */}
          <div className="lg:hidden flex gap-3 w-full mt-2">
            {/* دکمه آقا */}
            <div
              onClick={() => handleUpdate("gender", 1)}
              className={`
                flex-1 h-[52px] rounded-[15px] border flex items-center justify-start gap-4 px-4 cursor-pointer transition-all
                ${data.gender === 1 ? "bg-[#DDEAFB] text-black" : "bg-white border-[#EFEFEF] text-[#212E45]"}
              `}
            >
              <div className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center ${data.gender === 1 ? "bg-[#85A5E8]" : "border-[1.5px] border-opacity-50 border-[#ACACAC]"}`}>
                {data.gender === 1 && <Check size={24} className="text-[#335FD6]" />}
              </div>
              <span className={`font-medium text-[15px] ${data.gender === 1 ? "text-black" : "text-[#7A7A7A]"}`}>مرد</span>
            </div>

            {/* دکمه خانم */}
            <div
              onClick={() => handleUpdate("gender", 2)}
              className={`
                flex-1 h-[52px] rounded-[15px] border flex items-center justify-start gap-4 px-4 cursor-pointer transition-all
                ${data.gender === 2 ? "bg-[#DDEAFB] text-black" : "bg-white border-[#EFEFEF] text-[#212E45]"}
              `}
            >
              <div className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center ${data.gender === 2 ? "bg-[#85A5E8]" : "border-[1.5px] border-opacity-50 border-[#ACACAC]"}`}>
                {data.gender === 2 && <Check size={24} className="text-[#335FD6]" />}
              </div>
              <span className={`font-medium text-[15px] ${data.gender === 2 ? "text-black" : "text-[#7A7A7A]"}`}>خانم</span>
            </div>
          </div>
          {/* نمایش ارور جنسیت در صورت خالی بودن */}
          {errors.gender && <span className="text-red-500 text-[10px] absolute -bottom-5 right-2 lg:right-7">{errors.gender}</span>}
        </div>
      </div>
    </div>
  );
};

export default PassengerRow;




