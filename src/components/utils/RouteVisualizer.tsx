// src/components/utils/RouteVisualizer.tsx
import React from "react";
import Image from "next/image";
import { FlagIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";

interface RouteVisualizerProps {
  imgSrc?: string;
  leftClassName?: string;  // کلاس برای بخش سمت چپ (مبدأ)
  rightClassName?: string; // کلاس برای بخش سمت راست (مقصد)
  // width را حذف کردیم چون حالا خودش خودکار تنظیم می‌شود
}

const RouteVisualizer = ({ 
  imgSrc = "/images/images/bus-icon.webp", 
  leftClassName = "text-[#D9D9D9]", 
  rightClassName = "text-[#D9D9D9]" 
}: RouteVisualizerProps) => {
  return (
    <div className="flex items-center justify-between w-full">
        
        {/* --- بخش چپ (مبدا) --- */}
        {/* با flex-1 این بخش نیمی از فضای خالی را می‌گیرد */}
        <div className={`flex items-center flex-1 gap-x-1 ${leftClassName}`}>
          <span className="shrink-0">
            <MapPinIcon className="w-4 h-4 p-0" />
          </span>
          
          {/* کانتینر خط که فضا را پر می‌کند */}
          <div className="flex flex-1 items-center gap-0">
            <div
              className="ml-0.5 w-0 h-0 
              border-t-[4px] border-b-[4px] border-r-[6px]
              border-t-transparent border-b-transparent
              border-r-current"
            ></div>
            <div
              className="w-full h-px border-t border-current"
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderImage:
                  "repeating-linear-gradient(to left, currentColor 0 5px, transparent 5px 10px) 1",
              }}
            ></div>
            
          </div>
        </div>

        {/* --- تصویر وسط (ثابت) --- */}
        <div className="w-[60px] h-5 shrink-0 mx-2">
             <Image
                src={imgSrc}
                width={60}
                height={21}
                alt="bus icon"
                className="object-contain"
             />
        </div>

        {/* --- بخش راست (مقصد) --- */}
        {/* با flex-1 این بخش نیم دیگر فضای خالی را می‌گیرد */}
        <div className={`flex items-center flex-1 gap-x-1 ${rightClassName}`}>
          
          {/* کانتینر خط که فضا را پر می‌کند */}
          <div className="flex flex-1 items-center gap-0">
            <div
              className="w-full h-px border-t border-current"
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderImage:
                  "repeating-linear-gradient(to right, currentColor 0 5px, transparent 5px 10px) 1",
              }}
            ></div>
            
            <div
              className="mr-0.5 w-0 h-0 
              border-t-[4px] border-b-[4px] border-r-[6px]
              border-t-transparent border-b-transparent
              border-r-current"
            ></div>
          </div>
          
          <span className="shrink-0">
            <FlagIcon className="w-4 h-4" />
          </span>
        </div>
      </div>
  );
};

export default RouteVisualizer;