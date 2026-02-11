"use client";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { FlagIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

function SearchInfoBar() {
  return (
    <div className="lg:flex items-center px-[18px] bg-white w-[858px] h-[78px] rounded-[20px] shadow-box mx-auto hidden">
      <div className=" relative input-base w-[323px]  flex justify-between ml-9">
        {/* Divider */}
        <span
          className="
                    absolute left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2
                    h-[41px] w-px
                    bg-gray-400
                  "
        />
        {/* Icon Switch */}
        <div
          className="absolute left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2 bg-orange p-0.5 w-[25px] h-[25px]"
        >
          <Image
            src="/images/icons/icon-switch.svg"
            width={17}
            height={17}
            alt="icon-switch"
          ></Image>
        </div>
        <div className="absolute top-1/2 right-[12px] -translate-y-1/2 text-[#D9D9D9]">
          <MapPinIcon  className="w-4 h-4 p-0"/>
        </div>
        <div className="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#D9D9D9]">
          <FlagIcon  className="w-4 h-4 p-0"/>
        </div>
        {/* مبدا */}
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder=" "
            className="
                    peer
                    w-full pl-3 pr-14
                    text-sm
                    rounded-xl
                    outline-none
                    border-none
                    bg-inherit
                    text-black
                    placeholder-transparent
                  "
          />

          <div
            className="
                    floating-placeholder
                    pointer-events-none
                    absolute right-10 top-1/2 -translate-y-1/2
                    flex gap-1
                    text-gray-400 text-xs
                    transition-opacity
                  "
          >
            <span className="font-semibold">مبدا</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>
        </div>

        {/* مقصد */}
        <div className="relative w-full flex items-center">
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
                    border-none
                    text-gray-400
                    focus:text-black
                    pl-3 mr-2.5 pr-10
                  "
          />

          <div
            className="
                    floating-placeholder
                    pointer-events-none
                    absolute right-3 top-1/2 -translate-y-1/2
                    flex gap-1 pr-5
                    text-gray-400 text-xs
                    transition-opacity
                  "
          >
            <span className="font-semibold">مقصد</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>
        </div>
      </div>
      {/* Cal */}
      <div className="input-base w-[186px] h-[41px] relative flex items-center ml-2.5">
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
            <span className="font-semibold">1403/11/28</span>
            <span className="font-light">(یکشنبه، امروز)</span>
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
      <button className="btn-orange font-semibold text-[10px] flex gap-1 h-[25px]">
        روز بعد
        <ArrowLeft size={16} />
      </button>
      <button className="btn-orange px-7 h-[40px] text-[16px] font-semibold mr-auto">
        جستجو بلیط
      </button>
    </div>
  );
}

export default SearchInfoBar;
