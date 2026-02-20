"use client";

import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

// تعریف تایپ برای وضعیت فیلترها
export interface FilterState {
  trabori: boolean;
  hamsafar: boolean;
  ariasafar: boolean;
  gitipayma: boolean;
  sirosafar: boolean;
}

interface FilterContentProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterContent: React.FC<FilterContentProps> = ({
  filters,
  setFilters,
}) => {
  const handleToggle = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const companies = [
    { id: "trabori", label: "ترابری بی تا" , logo: '/images/companies/c_6.webp'},
    { id: "hamsafar", label: "همسفر", logo: '/images/companies/c_4.webp' },
    { id: "ariasafar", label: "آریا سفر", logo: '/images/companies/c_7.webp' },
    { id: "gitipayma", label: "گیتی پیما", logo: '/images/companies/c_5.webp' },
    { id: "sirosafar", label: "سیرو سفر", logo: '/images/companies/c_3.webp' },
  ];

  return (
    <>
    <div className="w-full py-[18px] pr-[13px] pl-[18px] bg-white shadow-box  rounded-[10px]">
      <h3 className="text-[14px] font-bold text-[#1D2939] mb-4 text-right">
        شرکت‌های اتوبوسرانی
      </h3>

      <div className="flex flex-col gap-3">
        {companies.map((co) => (
          <label
            key={co.id}
            className="flex items-center  gap-2 cursor-pointer group py-1"
          >
            
              {/* چک‌باکس سفارشی مطابق تصویر Co-Filter.png */}
              <div
                className={`w-[22px] h-[21px] rounded-[5px] border flex items-center justify-center transition-all duration-200 order-1
              ${
                filters[co.id as keyof FilterState]
                  ? "bg-[##335FD6] border-[#335FD6] bg-[#335FD6]"
                  : "border-[#A5C7F4] bg-white group-hover:border-[#335FD6]"
              }`}
              >
                {filters[co.id as keyof FilterState] && (
                  <Check className="text-white" />
                )}
              </div>

              <input
                type="checkbox"
                className="hidden order-1"
                checked={filters[co.id as keyof FilterState]}
                onChange={() => handleToggle(co.id as keyof FilterState)}
              />
              {/* متن شرکت */}
              <span
                className={`text-[14px] order-3 md:order-2  transition-colors ${
                  filters[co.id as keyof FilterState]
                    ? "text-[#335FD6] font-semibold"
                    : "text-[#4F6996]"
                }`}
              >
                {co.label}
              </span>
            
            {/* Logo */}
            <div className="relative md:ms-auto w-[32px] h-[25px] order-2 md:order-3">
              <Image
                src={co.logo || "/images/companies/c_5.webp"}
                alt={co.logo}
                fill
                className="object-contain"
              />
            </div>
          </label>
        ))}
      </div>
    </div>
    
    </>
  );
};

export default FilterContent;
