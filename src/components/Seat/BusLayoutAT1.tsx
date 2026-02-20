"use client";

import React, { useMemo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useBookingStore } from "@/store/zustand/useBookingStore";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Interfaces ---
// 👇 تغییر مهم: اینجا باید دقیقاً مثل trip.types.ts باشد
interface ChairLayoutData {
  columns: number;
  rows: number;
  columnSpace?: number; // ✅ علامت سوال اضافه شد (Optional)
  layoutChairs?: string; // ✅ علامت سوال اضافه شد (چون در trip.types هم optional بود)
}

interface BusLayoutProps {
  chairLayout: ChairLayoutData;
  isLoading?: boolean;
}

type InternalSeatStatus =
  | "Available"
  | "BookedForMale"
  | "BookedForFemale"
  | "SoldOut"
  | "Empty";

interface ParsedSeat {
  uid: string;
  number: number;
  status: InternalSeatStatus;
}

const BusLayoutAT1
: React.FC<BusLayoutProps> = ({
  chairLayout,
  isLoading = false,
}) => {
    // در ابتدای کامپوننت اضافه کنید
console.log("تعداد ستون‌ها:", chairLayout.columns);
console.log("ایندکس راهرو:", chairLayout.columnSpace);
  const { selectedSeats, toggleSeat } = useBookingStore();
  


  // 1️⃣ پارس کردن رشته‌ی layoutChairs
  const seats = useMemo(() => {
    // 👇 شرط ایمنی: اگر layoutChairs نبود، آرایه خالی برگردان
    if (!chairLayout?.layoutChairs) return [];

    const items = chairLayout.layoutChairs.split(",");

    return items.map((item) => {
      const [uid, seatNumStr, statusStr] = item.split("/");
      const number = parseInt(seatNumStr);
      const statusCode = parseInt(statusStr);

      let status: InternalSeatStatus = "Available";
      if (number === 0) {
        status = "Empty";
      } else {
        switch (statusCode) {
          case 0:
            status = "Available";
            break;
          case 1:
            status = "BookedForFemale";
            break;
          case 2:
            status = "BookedForMale";
            break;
          case 3:
            status = "SoldOut";
            break;
          default:
            status = "SoldOut";
        }
      }

      return { uid, number, status } as ParsedSeat;
    });
  }, [chairLayout]);

  const handleSeatClick = (seat: ParsedSeat) => {
    if (
      ["BookedForMale", "BookedForFemale", "SoldOut", "Empty"].includes(
        seat.status,
      )
    )
      return;
    toggleSeat(seat.number);
  };

  // 2️⃣ محاسبه داینامیک ستون‌های گرید
  const gridStyle = useMemo(() => {
    const cols = chairLayout.columns;
    // 👇 تغییر مهم: استفاده از Nullish Coalescing (??)
    // اگر columnSpace آندیفایند بود، مقدار -1 را در نظر بگیر (یعنی راهرو نداریم)
    const spaceIndex = chairLayout.columnSpace ?? -1;
   
const aisleWidth = cols >= 4 ? "0.6fr" : "1.15fr";

    let template = "";

    for (let i = 0; i < cols; i++) {
      if (i === spaceIndex) {
        template += `${aisleWidth} `;
      }
      template += "1fr ";
    }

    return {
      display: "grid",
      gridTemplateColumns: template.trim(),
      gap: "0.5rem",
    };
  }, [chairLayout]);

  // 3️⃣ رندر صندلی‌ها
  const renderSeats = () => {
    const totalRows = chairLayout.rows;
    const totalCols = chairLayout.columns;
    // 👇 اینجا هم مقدار پیش‌فرض بدهید
    const spaceIndex = chairLayout.columnSpace ?? -1;

    const gridItems = [];

    for (let r = 0; r < totalRows; r++) {
      for (let c = 0; c < totalCols; c++) {
        // اگر ستون راهرو است
        if (c === spaceIndex) {
          gridItems.push(<div key={`aisle-${r}`} className="w-full h-full" />);
        }

        const dataIndex = r * totalCols + c;
        const seat = seats[dataIndex];

        // اگر دیتا برای این خانه وجود نداشت (مثلا آرایه کوتاه‌تر از گرید بود)
        if (!seat) {
          gridItems.push(
            <div key={`missing-${r}-${c}`} className="w-full min-h-[46px]" />,
          );
          continue;
        }

        if (seat.status === "Empty") {
          gridItems.push(
            <div key={`empty-${seat.uid}`} className="w-full min-h-[46px]" />,
          );
        } else {
          gridItems.push(
            <button
              key={seat.uid}
              disabled={seat.status !== "Available"}
              onClick={() => handleSeatClick(seat)}
              className={cn(
                // کلاس‌های پایه (کپی شده از AT1)
                "h-full w-full rounded-[6px] flex items-center justify-center text-[14px] transition-all duration-200 font-semibold min-h-[46px] ",
                
                // استایل‌ها بر اساس وضعیت استاندارد
                seat.status === "Available" &&
                  "bg-[#F3F3F3] text-[#7A7A7A] hover:bg-orange-200",
                
                seat.status === "BookedForMale" &&
                  "bg-[#A5C7F4] text-black cursor-not-allowed",
                
                seat.status === "BookedForFemale" &&
                   "bg-[#B1EBFF] text-black cursor-not-allowed",
                
                seat.status === "SoldOut" &&
                   "bg-[#DF9292] text-black cursor-not-allowed",
                
                selectedSeats.includes(seat.number) &&
                   "bg-[#FFB37F] text-[#AA4D00]"
              )}
            >
              {seat.status === "BookedForMale"
                ? "آقا"
                : seat.status === "BookedForFemale"
                  ? "خانم"
                  : seat.number}
            </button>,
          );
        }
      }
    }
    return gridItems;
  };

  if (isLoading)
    return <div className="text-center p-10">در حال بارگذاری چیدمان...</div>;

  // شرط ایمنی برای نمایش خطا
  if (!seats.length)
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <span className="text-gray-400 mb-2">دیتای صندلی موجود نیست</span>
        <span className="text-xs text-gray-300 ltr font-mono">
          (Type: {chairLayout.columns}x{chairLayout.rows})
        </span>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative bg-white border-l order-1 lg:order-2 border-[#E7E7E7] rounded-[20px] pl-[29px] py-[14px] pr-6 md:pl-[21px] md:py-[17px] md:pr-5 shadow-box w-[363px] md:w-[276px]">
        {/* هدر: فرمان و متن "جلوی اتوبوس" */}
        <div className="flex justify-between text-black items-center mb-3 md:mb-[22px] pb-3 border-b border-b-[#E7E7E7]">
          <div className="text-[16px] font-medium">جلوی اتوبوس</div>
          <div className="bg-transparent flex items-center justify-center p-2 w-[50px] h-[49px]  px-1 py-1 rounded-full text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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

        <div style={gridStyle}>{renderSeats()}</div>
      </div>

      {/* راهنمای وضعیت‌ها */}
      <div
        className="
    mt-[21px] mb-6 
    
    /* 📱 حالت موبایل: فلکس (کنار هم) */
    flex flex-row flex-wrap justify-between items-center gap-2
    w-full max-w-[363px] mx-auto
    
    /* 🖥️ حالت دسکتاپ (lg): گرید (دو ستونه) */
    lg:grid lg:grid-cols-2 lg:w-[203px] lg:gap-y-3 lg:gap-x-2
    
    text-[10px] font-medium 
    order-2 lg:order-1
"
      >
        {/* آیتم ۱: انتخاب شما */}
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-[#FFB37F] rounded-[5px]" />
          <span>انتخاب شما</span>
        </div>

        {/* آیتم ۲: قابل انتخاب */}
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-white border border-[#C7C7C7] rounded-[5px]" />{" "}
          {/* اصلاح رنگ برای دیده شدن بهتر */}
          <span>قابل انتخاب</span>
        </div>

        {/* آیتم ۳: رزرو شده */}
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-[linear-gradient(101.4deg,_#A5C7F4_50%,_#B1ECFF_50%)] rounded-[5px]" />
          <span>رزرو شده</span>
        </div>

        {/* آیتم ۴: غیرقابل انتخاب */}
        <div className="flex items-center gap-[5px]">
          <span className="w-[18px] h-[18px] bg-[#DF9292] rounded-[5px]" />
          <span>غیرقابل انتخاب</span>
        </div>
      </div>
    </div>
  );
};

export default BusLayoutAT1
;
