"use client";

import React, { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper برای مدیریت کلاس‌های Tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// تایپ‌های مربوط به صندلی
type SeatStatus =
  | "Available"
  | "BookedForMale"
  | "BookedForFemale"
  | "Selected"
  | "Empty"
  | "SoldOut";

interface Seat {
  id: number;
  number: number;
  status: SeatStatus;
}

const BusLayout = () => {
  // دیتای نمونه بر اساس تصویر (ترکیب صندلی‌های تک و جفت)
  const [seats, setSeats] = useState<Seat[][]>([
    // ردیف اول
    [
      { id: 1, number: 1, status: "Available" },
      { id: 2, number: 2, status: "BookedForMale" },
      { id: 3, number: 0, status: "Empty" },
      { id: 4, number: 3, status: "BookedForMale" },
    ],
    // ردیف دوم
    [
      { id: 5, number: 4, status: "BookedForMale" },
      { id: 6, number: 5, status: "Available" },
      { id: 7, number: 0, status: "Empty" },
      { id: 8, number: 6, status: "Available" },
    ],
    // ردیف سوم
    [
      { id: 9, number: 7, status: "Available" },
      { id: 10, number: 8, status: "Available" },
      { id: 11, number: 0, status: "Empty" },
      { id: 12, number: 9, status: "Available" },
    ],
    // ردیف چهارم
    [
      { id: 13, number: 10, status: "BookedForFemale" },
      { id: 14, number: 11, status: "Available" },
      { id: 15, number: 0, status: "Empty" },
      { id: 16, number: 12, status: "Available" },
    ],
    // فضای خالی میانی (پله یا راهرو)
    [
      { id: 0, number: 0, status: "Empty" },
      { id: 0, number: 0, status: "Empty" },
      { id: 0, number: 0, status: "Empty" },
      { id: 17, number: 13, status: "SoldOut" },
    ],
    // ردیف بعد از پله
    [
      { id: 18, number: 14, status: "Available" },
      { id: 19, number: 15, status: "BookedForMale" },
      { id: 20, number: 0, status: "Empty" },
      { id: 21, number: 16, status: "BookedForFemale" },
    ],
    [
      { id: 22, number: 17, status: "Available" },
      { id: 23, number: 18, status: "BookedForFemale" },
      { id: 24, number: 0, status: "Empty" },
      { id: 25, number: 19, status: "BookedForFemale" },
    ],
    [
      { id: 26, number: 20, status: "Available" },
      { id: 27, number: 21, status: "BookedForFemale" },
      { id: 28, number: 0, status: "Empty" },
      { id: 29, number: 22, status: "Available" },
    ],
    [
      { id: 30, number: 23, status: "SoldOut" },
      { id: 31, number: 24, status: "Available" },
      { id: 32, number: 0, status: "Empty" },
      { id: 33, number: 25, status: "Available" },
    ],
  ]);

  const handleSeatClick = (seat: Seat) => {
    if (
      seat.status === "BookedForMale" ||
      seat.status === "BookedForFemale" ||
      seat.status === "Empty"
    )
      return;

    // منطق انتخاب صندلی
    console.log(`صندلی شماره ${seat.number} انتخاب شد`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen  p-4"
    >
      {/* Container اصلی اتوبوس */}
      <div className="relative bg-white  order-2 md:order-1 border-l border-[#E7E7E7] rounded-[20px] pl-[29px] py-[14px] pr-6 md:pl-[21px] md:py-[17px] md:pr-5 shadow-box w-[363px] md:w-[246px]">
        
        

        {/* هدر: فرمان و متن "جلوی اتوبوس" */}
        <div className="flex justify-between text-black items-center mb-3 md:mb-[22px] pb-3 border-b border-b-[#E7E7E7]">
          <div className="text-[16px] font-medium">جلوی اتوبوس</div>
          <div className="bg-transparent flex items-center justify-center p-2 w-[50px] h-[49px]  px-1 py-1 rounded-full text-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                <path
                  fill="currentColor"
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2M4.205 13.81a8.01 8.01 0 0 0 6.254 6.042c-.193-2.625-1.056-4.2-2.146-5.071c-1.044-.835-2.46-1.158-4.108-.972Zm11.482.97c-1.09.873-1.953 2.447-2.146 5.072a8.01 8.01 0 0 0 6.254-6.043c-1.648-.186-3.064.137-4.108.972ZM12 4a8 8 0 0 0-7.862 6.513l-.043.248l2.21-.442c.582-.116 1.135-.423 1.753-.84l.477-.332C9.332 8.581 10.513 8 12 8c1.388 0 2.509.506 3.3 1.034l.642.445c.54.365 1.032.645 1.536.788l.217.052l2.21.442A8 8 0 0 0 12 4"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        {/* بدنه صندلی‌ها */}
        <div className="grid grid-cols-[69px_70px_1fr_69px] md:grid-cols-[46px_46px_1fr_46px] gap-y-2 gap-x-2.5 md:gap-1.5">
          {seats.flat().map((seat, index) => {
            // اگر صندلی خالی (راهرو) بود
            if (seat.status === "Empty") {
              return <div key={`empty-${index}`} className="w-full h-[65px] md:h-[46px]" />;
            }

            return (
              <button
                key={seat.id}
                disabled={seat.status.includes("Booked")}
                onClick={() => handleSeatClick(seat)}
                className={cn(
                  "h-full w-full rounded-[6px] flex items-center justify-center text-[14px] transition-all duration-200 font-semibold ",
                  // استایل صندلی بر اساس وضعیت
                  seat.status === "Available" &&
                    "bg-[#F3F3F3] text-[#7A7A7A] hover:bg-gray-100",
                  seat.status === "BookedForMale" &&
                    "bg-[#A5C7F4] text-black cursor-not-allowed",
                  seat.status === "BookedForFemale" &&
                    "bg-[#B1EBFF] text-black cursor-not-allowed",
                  seat.status === "SoldOut" &&
                    "bg-[#DF9292] text-black cursor-not-allowed",
                  seat.status === "Selected" &&
                    "bg-[#FFB37F] text-black",
                )}
              >
                {seat.status === "BookedForMale"
                  ? "آقا"
                  : seat.status === "BookedForFemale"
                    ? "خانم"
                    : seat.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* راهنمای وضعیت‌ها */}
      <div className="mt-[21px] mb-6 md:mt-3 md:grid md:grid-cols-2 flex flex-row  gap-2 text-[10px] font-medium w-[363px] md:w-[203px] mx-auto justify-between order-1 md:order-2">
        <div className="flex items-center gap-[5px] lg:order-3">
          <span className="w-[18px] h-[18px] bg-[#FFB37F] rounded-[5px]" />
          <span>انتخاب شما</span>
        </div>
        <div className="flex items-center gap-[5px] lg:order-2">
          <span className="w-[18px] h-[18px] bg-[#F3F3F3] rounded-[5px]" />
          <span>قابل انتخاب</span>
        </div>
        <div className="flex items-center gap-[5px] lg:order-1">
          <span className="w-[18px] h-[18px] bg-[linear-gradient(101.4deg,_#A5C7F4_50%,_#B1ECFF_50%)] rounded-[5px]" />
          <span>رزرو شده </span>
        </div>
        <div className="flex items-center gap-[5px] lg:order-4">
          <span className="w-[18px] h-[18px] bg-[#DF9292] rounded-[5px]" />
          <span>غیرقابل انتخاب</span>
        </div>
      </div>
    </div>
  );
};

export default BusLayout;
