import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

function CoopSearch() {
  return (
    <>
      <div className="input-base mt-[43px] relative flex items-center">
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
            <span className="font-semibold">نام تعاونی</span>
            <span className="font-light">(شماره تعاونی)</span>
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
            <Image
              src="/icons/building.svg"
              alt="building"
              width={15}
              height={15}
              priority
              className=" text-white"
            />
          </div>
        </div>
      </div>
      <div className="input-base my-[30px] relative flex items-center">
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
            <span className="font-semibold">شهر ویا پایانه</span>
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
            <MapPin className="w-[15px] h-[15px] text-white" />
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
      <div className="absolute flex items-center justify-center gap-x-[18px] left-1/2 -bottom-[20px] -translate-x-1/2">
        <button className="btn-blue">لیست اتوبوس ها</button>
        <button className="btn-blue">اطلاعات تعاونی</button>
      </div>
    </>
  );
}

export default CoopSearch;
