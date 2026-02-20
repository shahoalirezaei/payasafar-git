// src/components/Bus/Filters/DesktopSidebar.tsx
"use client";

import React from 'react';
import WeatherWidget from './WeatherWidget';
import FilterContent, { FilterState } from './FilterContent';
import { ChevronLeft } from 'lucide-react';
import Icon from '@/components/ui/Icon';

interface DesktopSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function DesktopSidebar({ filters, setFilters }: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:block w-full max-w-[300px] shrink-0">
      <div className="flex flex-col gap-3">
        {/* هواشناسی */}
        <WeatherWidget />

        {/* دکمه جزئیات مسیر */}
        <div className="flex justify-between items-center h-[61px] w-full px-[18px]  shadow-box rounded-[10px] bg-white">
             <span className="text-[14px] font-semibold ">نمایش جزئیات مسیر</span>
             <span className='text-black w-[26px] h-[26px]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m4 12l6-6m-6 6l6 6m-6-6h10.5m5.5 0h-2.5"></path></svg>
             </span>
        </div>

        {/* محتوای فیلترها */}
        <div className="">
          <FilterContent filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </aside>
  );
}