"use client";

import React, { useState } from "react";
import PassengerRow from "./PassengerRow";
import {
  User,
  ChevronDown,
  Calendar,
  Plus,
  CirclePlus,
  CalendarDays,
} from "lucide-react";
import { Passenger } from "@/types/booking";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import { SeatIcon, ArrowDownfill, PhoneLinear } from "../ui/StepperIcons";

interface PassengerFormProps {
  passenger: Passenger;
  index: number;
  onRemove: () => void;
}

const PassengerForm = () => {
  const { selectedSeats, buyerMobile, setBuyerMobile } = useBookingStore();
  
  const [mobileError, setMobileError] = useState<string>("");

  // تابع اعتبارسنجی موبایل (ضدضربه برای کیبورد فارسی و انگلیسی)
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // ۱. تبدیل اعداد فارسی و عربی به انگلیسی
    value = value
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

    // ۲. حالا با خیال راحت هرچیزی جز عدد انگلیسی رو پاک می‌کنیم
    value = value.replace(/\D/g, "");
    
    // اگر طول بیشتر از 11 شد، اعمال نکن
    if (value.length > 11) return;
    
    setBuyerMobile(value); // ذخیره در استور

    // ولیدیشن در لحظه
    if (value.length > 0 && !value.startsWith("09")) {
      setMobileError("شماره موبایل باید با 09 شروع شود.");
    } else if (value.length === 11 && !/^09\d{9}$/.test(value)) {
      setMobileError("فرمت شماره موبایل معتبر نیست.");
    } else {
      setMobileError(""); // وقتی کاملا خالی شد یا درست شد
    }
  };

  const handleMobileBlur = () => {
    if (buyerMobile && buyerMobile.length < 11) {
      setMobileError("شماره موبایل باید ۱۱ رقم باشد.");
    }
  };

  return (
    <div className="bg-white relative rounded-[20px] shadow-box py-[22px] px-[38px] w-full mt-5">
      <div className="flex justify-between items-center">
        <span className="text-[16px] font-bold text-[#212E45]">
          مشخصات مسافران
        </span>
        <button className="flex items-center justify-start gap-2.5">
          <div className="rounded-full w-7 h-7 flex items-center justify-center bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),radial-gradient(66.67%_103.95%_at_50%_-42.76%,#A5C7F4_0%,#335FD6_100%)] ">
            <Plus size={12} className="text-white" />
          </div>
          <span className="text-[#335FD6] text-[14px] font-medium">
            افزودن همسفر‌های گذشته
          </span>
        </button>
      </div>
      
      {!selectedSeats.length ? (
        <span className="text-[#A5A5A5] text-[20px] font-medium hidden lg:block">
          هنوز صندلی انتخاب نشده!
        </span>
      ) : (
        <div></div>
      )}

      {selectedSeats.length > 0 && (
        <div className="form-input pr-4 pl-2 absolute top-20 z-20 left-0 flex flex-col w-[93%]  lg:w-[239px] mx-[22px] lg:top-[135px] lg:-left-[10px]">
          {/* باکس اصلی اینپوت شما */}
          <div className={`relative w-full h-[45px] rounded-[33px] ${mobileError ? 'border border-red-500' : ''}`}>
            <input
              type="text"
              value={buyerMobile} // متصل به استور
              onChange={handleMobileChange} // اعتبارسنجی لحظه‌ای
              onBlur={handleMobileBlur}     // بررسی وقتی کاربر از فیلد خارج می‌شود
              placeholder=" "
              className="
                peer
                h-full
                w-full
                bg-inherit
                text-sm
                rounded-[33px]
                text-[12px]
                outline-none
                text-gray-700
                focus:text-black
                pr-3 pl-10
              "
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
              <span className="font-semibold">شماره همراه </span>
              <span className="font-light">(جهت احراز هویت)</span>
            </div>
            
            <div
              className="
                absolute left-0 top-1/2 -translate-y-1/2
                bg-orange
                flex items-center justify-center
                w-[25px] h-[25px]
                rounded-full
              "
            >
              <PhoneLinear className="w-[15px] h-[15px] text-white" />
            </div>
          </div>
          
          {/* پیام خطای ولیدیشن (دقیقاً زیر اینپوت) */}
          {mobileError && (
            <span className="text-red-500 text-[10px] mt-1 pr-2">
              {mobileError}
            </span>
          )}
        </div>
      )}

      {/* more traveler */}
      {selectedSeats.length > 0 ? (
        selectedSeats.map((number, index) => (
          <div key={number} className="mt-20 lg:mt-3">
            <PassengerRow seatNumber={number} index={index} />
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PassengerForm;