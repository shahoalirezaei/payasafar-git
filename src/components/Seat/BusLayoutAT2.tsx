"use client";

import React, { useMemo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import { ServiceDetail, Seat } from "@/types/trip.types";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BusLayoutProps {
  serviceDetail: ServiceDetail;
  isLoading?: boolean;
}

const BusLayoutAT2: React.FC<BusLayoutProps> = ({
  serviceDetail,
  isLoading = false,
}) => {
  const { selectedSeats, toggleSeat } = useBookingStore();

  const chairLayout = serviceDetail?.chairLayout;
  const seatList = serviceDetail?.bussEntity?.seates || [];

  // 🛑 تابع ضدضربه و بدون any برای تفسیر وضعیت صندلی
  const getSeatStatus = (rawStatus: string | undefined | null): string => {
    const s = String(rawStatus || "").trim().toLowerCase();
    
    if (s === "bookedformale" || s === "2") return "BookedForMale";
    if (s === "bookedforfemale" || s === "1") return "BookedForFemale";
    // تشخیص دقیق Blocked و سایر وضعیت‌های غیرقابل فروش
    if (["sold", "reserved", "soldout", "blocked", "3"].includes(s)) return "SoldOut";
    
    return "Available"; 
  };

  const handleSeatClick = (normalizedStatus: string, seatNumber: number) => {
    const disabledStatuses = [
      "BookedForMale",
      "BookedForFemale",
      "SoldOut" // بقیه موارد مثل Blocked رو بالا به SoldOut تبدیل کردیم
    ];

    if (disabledStatuses.includes(normalizedStatus)) return;
    
    toggleSeat(seatNumber);
  };

  // 🚀 استایل گرید برای کنترل پهنای راهرو (کاملاً مشابه AT1)
  const gridStyle = useMemo(() => {
    if (!chairLayout) return { display: "grid", gap: "0.5rem" };

    const cols = chairLayout.columns;
    
    // ۱. پیدا کردن ستون‌های خالی (راهروها)
    const emptyCols = new Set<number>();
    for (let c = 1; c <= cols; c++) {
      // اگر هیچ صندلی‌ای در کل اتوبوس این شماره ستون رو نداشت، پس راهروئه
      const hasSeat = seatList.some((s) => s.column === c);
      if (!hasSeat) emptyCols.add(c);
    }

    // ۲. تعیین عرض راهرو
    const aisleWidth = cols >= 4 ? "0.6fr" : "1.15fr";
    let template = "";

    // ۳. ساخت Template ستون‌ها
    // ⚠️ چون حلقه renderGrid ما از cols به 1 میره، اینجا هم باید از همون سمت الگو رو بسازیم
    for (let c = cols; c >= 1; c--) {
      if (emptyCols.has(c)) {
        template += `${aisleWidth} `; // ستون خالی = عرض راهرو
      } else {
        template += "1fr "; // ستون صندلی دار = عرض نرمال
      }
    }

    return {
      display: "grid",
      gridTemplateColumns: template.trim(),
      gap: "0.5rem",
    };
  }, [chairLayout, seatList]);

  const renderGrid = () => {
    if (!chairLayout) return null;

    const totalRows = chairLayout.rows;
    const totalCols = chairLayout.columns;

    const gridItems = [];

    // حلقه روی سطرها
    for (let r = 1; r <= totalRows; r++) {
      
      // حلقه معکوس روی ستون‌ها (برای قرارگیری صحیح راننده در چپ)
      for (let c = totalCols; c >= 1; c--) {
        
        const seat = seatList.find((s) => s.row === r && s.column === c);

        if (seat) {
          // 🔥 وضعیت تمیز و نرمال‌شده رو می‌گیریم
          const status = getSeatStatus(seat.status);

          gridItems.push(
            <button
              key={`seat-${r}-${c}`}
              disabled={status !== "Available"}
              onClick={() => handleSeatClick(status, seat.number)}
              className={cn(
                // کلاس‌های پایه (کپی شده از AT1)
                "h-full w-full rounded-[6px] flex items-center justify-center text-[14px] transition-all duration-200 font-semibold ",
                
                // استایل‌ها بر اساس وضعیت استاندارد
                status === "Available" &&
                  "bg-[#F3F3F3] text-[#7A7A7A] hover:bg-orange-200",
                
                status === "BookedForMale" &&
                  "bg-[#A5C7F4] text-black cursor-not-allowed",
                
                status === "BookedForFemale" &&
                   "bg-[#B1EBFF] text-black cursor-not-allowed",
                
                status === "SoldOut" &&
                   "bg-[#DF9292] text-black cursor-not-allowed",
                
                selectedSeats.includes(seat.number) &&
                   "bg-[#FFB37F] text-[#AA4D00]"
              )}
            >
              {status === "BookedForMale" ? "آقا" : 
               status === "BookedForFemale" ? "خانم" : 
               seat.number}
            </button>
          );
        } else {
          // فضای خالی (کپی شده از AT1)
          gridItems.push(
            <div key={`empty-${r}-${c}`} className="w-full min-h-[46px]" />
          );
        }
      }
    }
    return gridItems;
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="animate-pulse text-gray-400">در حال بارگذاری چیدمان...</div>
        </div>
    );
  }

  if (!chairLayout || !serviceDetail.bussEntity) {
      return (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <span className="text-gray-400 mb-2">دیتای صندلی موجود نیست</span>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative bg-white border-l order-1 lg:order-2 border-[#E7E7E7] rounded-[20px] pl-[29px] py-[14px] pr-6 md:pl-[21px] md:py-[17px] md:pr-5 shadow-box w-[363px] md:w-[276px]">
        
        {/* هدر: فرمان و متن */}
        <div className="flex justify-between text-black items-center mb-3 md:mb-[22px] pb-3 border-b border-b-[#E7E7E7]">
          <div className="text-[16px] font-medium">جلوی اتوبوس</div>
          <div className="bg-transparent flex items-center justify-center p-2 w-[50px] h-[49px] px-1 py-1 rounded-full text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="none" fillRule="evenodd">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2M4.205 13.81a8.01 8.01 0 0 0 6.254 6.042c-.193-2.625-1.056-4.2-2.146-5.071c-1.044-.835-2.46-1.158-4.108-.972Zm11.482.97c-1.09.873-1.953 2.447-2.146 5.072a8.01 8.01 0 0 0 6.254-6.043c-1.648-.186-3.064.137-4.108.972ZM12 4a8 8 0 0 0-7.862 6.513l-.043.248l2.21-.442c.582-.116 1.135-.423 1.753-.84l.477-.332C9.332 8.581 10.513 8 12 8c1.388 0 2.509.506 3.3 1.034l.642.445c.54.365 1.032.645 1.536.788l.217.052l2.21.442A8 8 0 0 0 12 4"></path>
              </g>
            </svg>
          </div>
        </div>

        {/* گرید صندلی‌ها با استایل محاسبه شده */}
        <div style={gridStyle}>
            {renderGrid()}
        </div>

      </div>

      {/* راهنمای رنگ‌ها */}
      <div className="
        mt-[21px] mb-6 
        flex flex-row flex-wrap justify-between items-center gap-2
        w-full max-w-[363px] mx-auto
        lg:grid lg:grid-cols-2 lg:w-[203px] lg:gap-y-3 lg:gap-x-2
        text-[10px] font-medium 
        order-2 lg:order-1
      ">
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-[#FFB37F] rounded-[5px]" />
          <span>انتخاب شما</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-white border border-[#C7C7C7] rounded-[5px]" />
          <span>قابل انتخاب</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-[linear-gradient(101.4deg,_#A5C7F4_50%,_#B1ECFF_50%)] rounded-[5px]" />
          <span>رزرو شده</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-[#DF9292] rounded-[5px]" />
          <span>غیرقابل انتخاب</span>
        </div>
      </div>
    </div>
  );
};

export default BusLayoutAT2;