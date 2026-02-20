"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Check, ChevronLeft } from "lucide-react";
import Icon from "@/components/ui/Icon";

// --- Components ---

const WeatherWidget = () => (
  <div className="p-5 border-b border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Image src="/images/sun-icon.png" width={32} height={32} alt="sun" />
        <span className="text-[22px] font-bold text-[#1D2939]">۲۲°</span>
      </div>
      <span className="text-sm font-medium text-[#475467]">تهران</span>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src="/images/snow-icon.png" width={32} height={32} alt="snow" />
        <span className="text-[22px] font-bold text-[#1D2939]">۲°</span>
      </div>
      <span className="text-sm font-medium text-[#475467]">رشت</span>
    </div>
  </div>
);

const CheckboxItem = ({ label, iconSrc, iconName, isChecked, onChange, id }: any) => (
  <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group py-1">
    {/* چک‌باکس در سمت راست */}
    <div className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-all duration-200 shrink-0
        ${isChecked ? 'bg-[#335FD6] border-[#335FD6]' : 'border-[#D0D5DD] bg-white group-hover:border-[#335FD6]'}`}>
        {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
    </div>

    {/* آیکون یا لوگو (اختیاری) */}
    {iconSrc && <Image src={iconSrc} width={24} height={24} className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt={label} />}
    {iconName && <Icon name={iconName} size={18} className="text-[#98A2B3] group-hover:text-[#335FD6]" />}

    {/* متن فیلتر */}
    <span className={`text-[13px] transition-colors ${isChecked ? 'text-[#335FD6] font-semibold' : 'text-[#667085] group-hover:text-[#335FD6]'}`}>
      {label}
    </span>
    
    <input id={id} type="checkbox" className="hidden" checked={isChecked} onChange={onChange} />
  </label>
);

const FilterSection = ({ title, children }: any) => (
  <div className="p-5 border-b border-gray-100 last:border-0">
    <h3 className="text-[14px] font-bold text-[#1D2939] mb-4 text-right">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

// --- Main Sidebar ---

export default function FilterSidebar() {
  const [filters, setFilters] = useState({
    trabori: false,
    hamsafar: true,
    ariasafar: true,
    gitipayma: false,
    sirosafar: false,
    singleSeat: true,
    emptyDouble: false,
    besideMan: false,
    besideWoman: false,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-[16px] shadow-[0px_0px_32px_0px_rgba(108,120,255,0.07)] border border-gray-50 w-full sticky top-4 overflow-hidden">
      
      {/* ۱. بخش هواشناسی */}
      <WeatherWidget />

      {/* ۲. دکمه نمایش جزئیات مسیر */}
      <div className="p-4 border-b border-gray-100">
        <button className="flex items-center justify-between w-full text-[#475467] hover:text-[#335FD6] transition-colors">
          <ChevronLeft size={18} />
          <span className="text-[13px] font-bold">نمایش جزئیات مسیر</span>
        </button>
      </div>

      {/* ۳. فیلتر شرکت‌ها */}
      <FilterSection title="شرکت‌های اتوبوسرانی">
        <CheckboxItem id="c1" label="ترابری بی تا" iconSrc="/images/co-logo-1.png" isChecked={filters.trabori} onChange={() => toggleFilter('trabori')} />
        <CheckboxItem id="c2" label="همسفر" iconSrc="/images/co-logo-2.png" isChecked={filters.hamsafar} onChange={() => toggleFilter('hamsafar')} />
        <CheckboxItem id="c3" label="آریا سفر" iconSrc="/images/co-logo-3.png" isChecked={filters.ariasafar} onChange={() => toggleFilter('ariasafar')} />
        <CheckboxItem id="c4" label="گیتی پیما" iconSrc="/images/co-logo-4.png" isChecked={filters.gitipayma} onChange={() => toggleFilter('gitipayma')} />
        <CheckboxItem id="c5" label="سیرو سفر" iconSrc="/images/co-logo-5.png" isChecked={filters.sirosafar} onChange={() => toggleFilter('sirosafar')} />
      </FilterSection>

      {/* ۴. وضعیت صندلی‌ها */}
      <FilterSection title="وضعیت صندلی ها">
        <CheckboxItem id="s1" label="تک صندلی" iconName="mingcute--seat-fill" isChecked={filters.singleSeat} onChange={() => toggleFilter('singleSeat')} />
        <CheckboxItem id="s2" label="ردیف دو صندلی خالی" iconName="solar--bus-linear" isChecked={filters.emptyDouble} onChange={() => toggleFilter('emptyDouble')} />
        <CheckboxItem id="s3" label="کنار دست آقا" iconName="solar--user-bold" isChecked={filters.besideMan} onChange={() => toggleFilter('besideMan')} />
        <CheckboxItem id="s4" label="کنار دست خانم" iconName="solar--user-bold" isChecked={filters.besideWoman} onChange={() => toggleFilter('besideWoman')} />
      </FilterSection>
      
    </div>
  );
}