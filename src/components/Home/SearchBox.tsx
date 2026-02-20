"use client";
import { BusFront, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

export default function SearchBox() {
  return (
    <div className="relative w-[378px] md:w-[471px] h-[398px] overflow-y-visible">
      <div className="relative z-10 flex flex-col items-center mt-9 shadow-soft-blue w-full h-full bg-white p-[27px] rounded-2xl">
        <div className="input-base flex justify-between">
          <button className="input-text font-medium text-xs px-4 py-1 bg-orange cursor-pointer">
            <span className="flex gap-2.5 items-center justify-center">
              <BusFront className="w-[17px] h-[17px]" />
              بلیط اتوبوس
            </span>
          </button>
          <button className="input-text font-medium text-xs px-4 py-1 cursor-pointer">
            تعاونی ها
          </button>
          <button className="input-text font-medium text-xs px-4 py-1 cursor-pointer">
            سفر با جابه‌جا
          </button>
        </div>
        <div className="my-4">
          <span className="text-orange">
            <MapPin className="" />
          </span>
        </div>
        <div className=" relative input-base flex justify-between">
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
          <div className="relative w-full">
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
          <div className="relative w-full">
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
        <div className="input-base relative">
          <div className="relative w-full">
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
      absolute left-3 top-1/2 -translate-y-1/2
      bg-orange
      flex items-center justify-center
      w-[25px] h-[25px]
      rounded-md
    "
            >
              <CalendarDays className="w-[15px] h-[15px] text-white" />
            </div>
          </div>
        </div>
        <button className="btn-blue absolute left-1/2 -bottom-[20px] -translate-x-1/2 ">
          جستجو بلیط
        </button>
      </div>
      <div className="absolute -bottom-4 -left-[205px] hidden md:block ">
        <Image
          src="/images/services/bus-02.webp"
          alt="Bus-02"
          width={250}
          height={160}
        ></Image>
      </div>
      <div className="absolute -bottom-10 -right-[185px] hidden md:block ">
        <Image
          src="/images/services/bus-01.webp"
          alt="Bus-02"
          width={250}
          height={160}
        ></Image>
      </div>
    </div>
  );
}
