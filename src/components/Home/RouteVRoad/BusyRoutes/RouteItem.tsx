// src/components/RouteVRoad/BusyRoutes/RouteItem.tsx
import Link from "next/link";
import React from "react";
import RouteVisualizer from "@/components/utils/RouteVisualizer";
import { RouteType } from "@/lib/data/mockRoutes";

interface RouteItemProps {
  route: RouteType;
}

const RouteItem: React.FC<RouteItemProps> = ({ route }) => {
  const { from, to, link } = route;
  const linkTitle = `بلیط اتوبوس ${from} ${to}`;

  return (
    <div
      className="group relative flex items-center transition-colors hover:bg-gray-50/50 px-3 w-full h-[68px]
                    after:content-[''] after:absolute after:bottom-0 after:left-7 after:right-8 
                    after:h-[1px] after:bg-[#ECECEC] last:after:hidden"
    >
      {/* --- Desktop Layout (Hidden on Mobile) --- */}
      <div className="lg:flex hidden items-center justify-between w-full">
        {/* بخش مسیر گرافیکی با عرض‌های کنترل شده */}
        <div className="flex items-center gap-4">
          {/* اختصاص عرض ثابت (مثلاً w-24) و تراز کردن متن به سمت ویژوالایزر 
               text-left در RTL یعنی متن به سمت چپِ باکس خودش (چسبیده به ویژوالایزر) می‌رود
            */}
          <span className="text-[#606060] text-xs font-medium w-10 text-left leading-none">
            {from}
          </span>

          <div className="w-[298px]">
            <RouteVisualizer imgSrc="/images/images/bus-icon.webp" />
          </div>

          {/* تراز کردن متن مقصد به سمت راست (چسبیده به ویژوالایزر) */}
          <span className="text-[#606060] text-sm font-medium w-10 text-right leading-none">
            {to}
          </span>
        </div>

        {/* بخش سمت چپ: عنوان لینک */}
        <Link
          href={link}
          title={linkTitle}
          className="blue600 hover:text-blue-700 font-medium text-xs transition-colors cursor-pointer"
        >
          {linkTitle}
        </Link>
      </div>

      {/* --- Mobile Layout --- */}
      <Link
        href={link}
        title={linkTitle}
        className="flex lg:hidden flex-col items-center justify-center gap-3 w-full"
      >
        <div className="flex items-center justify-center w-full gap-3">
          {/* در موبایل هم برای نظم بهتر عرض ثابت کوچکتری می‌دهیم */}
          <span className="text-gray-600 text-sm font-bold w-20 text-left">
            {from}
          </span>
          <RouteVisualizer imgSrc="/images/images/bus-icon.webp" />
          <span className="text-gray-600 text-sm font-bold w-20 text-right">
            {to}
          </span>
        </div>
        <span className=" text-xs font-medium blue600 cursor-pointer">
          مشاهده و خرید بلیط
        </span>
      </Link>
    </div>
  );
};

export default RouteItem;
