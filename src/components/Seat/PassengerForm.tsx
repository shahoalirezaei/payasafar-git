"use client";

import React, { useEffect } from "react";
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
import { SeatIcon, ArrowDownfill } from "../ui/StepperIcons";

interface PassengerFormProps {
  passenger: Passenger;
  index: number;
  onRemove: () => void;
}

const PassengerForm = () => {
  const { selectedSeats } = useBookingStore();
  return (
    <div className="bg-white rounded-[20px] shadow-box py-[22px] px-[38px] w-full mt-5">
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
      {!selectedSeats.length && (
        <span className="text-[#A5A5A5] text-[20px] font-medium">
          هنوز صندلی انتخاب نشده!
        </span>
      )}

      {/* <div>
      <SeatIcon className="blue600 w-5 h-5" />
      <span className="blue600 text-[12px] font-semibold">صندلی {selectedSeats[0]}</span>
    </div> */}
      <div className="w-full relative pt-4 pb-6">
        {selectedSeats.length > 0 ? (
          <div className="mb-4">
            <SeatIcon className="blue600 w-5 h-5" />
            <span className="blue600 text-[12px] font-semibold">
              صندلی {selectedSeats[0]}
            </span>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex justify-start items-center gap-x-8 mb-[22px]">
          <div className="form-input px-4 flex items-center p-1 w-[126px]">
            <input
              type="text"
              className="w-full  bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]"
              placeholder="نام"
            />
          </div>
          <div className="form-input px-4 flex items-center p-1 w-[161px] ">
            <input
              type="text"
              className="w-full  bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]
            text-[12px]"
              placeholder="نام خانوادگی"
            />
          </div>
          <div className="form-input px-4 relative flex items-center mr-[14px] w-[195px]">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder=" "
                className="
            peer
            w-full
            bg-inherit
            text-sm
            rounded-[33px]
            text-[12px]
            outline-none
            text-gray-400
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
                <span className="font-semibold">کد ملی</span>
                <span className="font-light">(اتباع خارجه)</span>
              </div>
            </div>
          </div>
          <div className="form-input px-4 relative flex items-center mr-[26px] w-[239px]">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder=" "
                className="
            peer
            w-full
            bg-inherit
            text-sm
            rounded-[33px]
            text-[12px]
            outline-none
            text-gray-400
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
        </div>
        <div className="flex justify-start items-center gap-[7px]">
          <div className="form-input px-4 flex items-center p-1 w-[69px]">
            <input
              type="text"
              className="w-full bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]
            text-[12px]"
              placeholder="روز"
            />
          </div>
          <div className="form-input px-4 flex items-center p-1 w-[93px]">
            <input
              type="text"
              className="w-full  bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]
            text-[12px]"
              placeholder="ماه"
            />
          </div>
          <div className="form-input px-4 relative flex items-center w-[118px]">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder=" "
                className="
            peer
            w-full
            bg-inherit
            text-sm
            rounded-[33px]
            text-[12px]
            outline-none
            text-gray-400
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
                <span className="font-semibold">سال تولد</span>
              </div>

              {/* Calendar icon */}
              <div
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
          <div className="relative form-input mr-7 pr-1 w-[100px]">
            <div className="relative h-full">
              <select
                defaultValue=""
                required
                className="
            peer
            w-full
            h-full
            bg-[#F8F9FB]
            text-[12px]
            text-gray-700
            rounded-[33px]
            outline-none
            border border-transparent
            focus:bg-white
            
            focus:ring-blue-100
            focus:border-blue-200
            transition-all
            pr-4 
            pl-12
            appearance-none
            cursor-pointer
            invalid:text-gray-400
          "
              >
                <option value="" disabled hidden>
                  جنسیت
                </option>
                <option value="male" className="text-gray-800">
                  مرد
                </option>
                <option value="female" className="text-gray-800">
                  زن
                </option>
              </select>

              {/* دایره نارنجی و آیکون فلش (سمت چپ) */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FF9F1C] text-white rounded-full flex items-center justify-center shadow-md pointer-events-none">
                <ArrowDownfill className="blue600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* more traveler */}
      {selectedSeats.length > 1 ? (selectedSeats.slice(1).map((number, index) => (

      
        <div key={number} className="w-full border-t border-t-[#EDEDED] relative py-4">
          <div className="mb-4">
            <SeatIcon className="blue600 w-5 h-5" />
            <span className="blue600 text-[12px] font-semibold">
              صندلی {selectedSeats[index + 1]}
            </span>
          </div>
          <div className="flex justify-start items-center gap-x-8 mb-[22px]">
            <div className="form-input px-4 flex items-center p-1 w-[126px]">
              <input
                type="text"
                className="w-full  bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]"
                placeholder="نام"
              />
            </div>
            <div className="form-input px-4 flex items-center p-1 w-[161px] ">
              <input
                type="text"
                className="w-full  bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]
            text-[12px]"
                placeholder="نام خانوادگی"
              />
            </div>
            <div className="form-input px-4 relative flex items-center mr-[14px] w-[195px]">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder=" "
                  className="
            peer
            w-full
            bg-inherit
            text-sm
            rounded-[33px]
            text-[12px]
            outline-none
            text-gray-400
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
                  <span className="font-semibold">کد ملی</span>
                  <span className="font-light">(اتباع خارجه)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-[7px]">
            <div className="form-input px-4 flex items-center p-1 w-[69px]">
              <input
                type="text"
                className="w-full bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]
            text-[12px]"
                placeholder="روز"
              />
            </div>
            <div className="form-input px-4 flex items-center p-1 w-[93px]">
              <input
                type="text"
                className="w-full  bg-inherit outline-none
            text-gray-400
            focus:text-black
            pr-2 rounded-[33px]
            text-[12px]"
                placeholder="ماه"
              />
            </div>
            <div className="form-input px-4 relative flex items-center w-[118px]">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder=" "
                  className="
            peer
            w-full
            bg-inherit
            text-sm
            rounded-[33px]
            text-[12px]
            outline-none
            text-gray-400
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
                  <span className="font-semibold">سال تولد</span>
                </div>

                {/* Calendar icon */}
                <div
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
            <div className="relative form-input mr-7 pr-1 w-[100px]">
              <div className="relative h-full">
                <select
                  defaultValue=""
                  required
                  className="
            peer
            w-full
            h-full
            bg-[#F8F9FB]
            text-[12px]
            text-gray-700
            rounded-[33px]
            outline-none
            border border-transparent
            focus:bg-white
            
            focus:ring-blue-100
            focus:border-blue-200
            transition-all
            pr-4 
            pl-12
            appearance-none
            cursor-pointer
            invalid:text-gray-400
          "
                >
                  <option value="" disabled hidden>
                    جنسیت
                  </option>
                  <option value="male" className="text-gray-800">
                    مرد
                  </option>
                  <option value="female" className="text-gray-800">
                    زن
                  </option>
                </select>

                {/* دایره نارنجی و آیکون فلش (سمت چپ) */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FF9F1C] text-white rounded-full flex items-center justify-center shadow-md pointer-events-none">
                  <ArrowDownfill className="blue600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))) : (
        <div></div>
      )}
    </div>
  );
};

export default PassengerForm;
