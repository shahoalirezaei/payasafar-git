"use client";

import { FlagIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

export default function BusSearch() {
  // #d9d9d9
  return (
    <>
      <div className="h-[21px] mt-[57px] mb-5 flex w-[298px] items-center justify-between">
        <div className="flex items-center text-[#D9D9D9] justify-between gap-[6.5px]">
          {" "}
          {/*if input has value text-orange */}
          <span>
            <MapPinIcon className="w-4 h-4 p-0" />
          </span>
          <div className="flex flex-row-reverse items-center">
            <div
              className="w-[89px] h-px border-t border-current"
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderImage:
                  "repeating-linear-gradient(to left, currentColor 0 5px, transparent 5px 10px) 1",
              }}
            ></div>
            <div
              className="ml-0.5 w-0 h-0 
              border-t-[4px] border-b-[4px] border-r-[6px]
              border-t-transparent border-b-transparent
              border-r-current"
            ></div>
          </div>
        </div>
        <div>
              <Image 
              src="/images/images/bus-icon.webp"
            width={60}
            height={21}
            alt="bus icon"
              />
            </div>
        <div className="flex items-center text-[#D9D9D9] justify-between gap-[6.5px]">
          {" "}
          {/*if input has value text-orange */}
          <div className="flex items-center gap-0">
            <div
              className="w-[89px] h-px border-t border-current"
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderImage:
                  "repeating-linear-gradient(to right, currentColor 0 5px, transparent 5px 10px) 1",
              }}
            ></div>
            
            <div
              className="mr-0.5 w-0 h-0 
              border-t-[4px] border-b-[4px] border-l-[6px]
              border-t-transparent border-b-transparent
              border-l-current"
            ></div>
          </div>
          <span className="">
            <FlagIcon className="w-4 h-4" />
          </span>
        </div>
      </div>
      <div className=" relative input-base mb-[46px] flex justify-between">
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
        {/* مبدا */}
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder=" "
            className="
            peer
            w-full px-3
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
            absolute right-3 top-1/2 -translate-y-1/2
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
            pl-3 mr-2.5 pr-5
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
      <div className="absolute left-1/2 -bottom-[20px] -translate-x-1/2">
        <button className="btn-blue">جستجو بلیط</button>
      </div>
    </>
  );
}
