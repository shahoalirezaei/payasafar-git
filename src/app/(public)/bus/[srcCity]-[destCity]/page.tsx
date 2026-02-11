'use client'

import React, { useState } from 'react';
import TicketCard, { BusService } from "@/components/Bus/TicketCard";
import { ArrowRightLeft, Calendar } from "lucide-react";

// ایمپورت کامپوننت‌های جدید
import DesktopSidebar from '@/components/Bus/Filters/DesktopSidebar';
// import MobileFilterDrawer from '@/components/Bus/Filters/MobileFilterContent';
import MobileBaseDrawer from '@/components/Bus/Filters/MobileBaseDrawer';
import { FilterState } from '@/components/Bus/Filters/FilterContent';
import MobileHeader from '@/components/Global/MobileHeader';
import BusMobileHeader from '@/components/Bus/Header/BusMobileHeader';
import SortBar from '@/components/Bus/Search/SortBar';
import MobileBottomBar from '@/components/Bus/MobileBottomBar';
import SearchInfoBar from '@/components/Bus/Search/SearchInfoBar';

// دیتای ساختگی
const mockServices: BusService[] = [
  {
    id: '1',
    company: 'رویال سفر ایرانیان',
    companyLogo: '/images/companies/c_5.webp', 
    type: 'VIP درسا تخت شو ۲۵ نفره',
    fullPrice: 448000,
    availableSeats: 9,
    time: '22:30',
    boardingPoint: { city: 'تهران', terminal: 'پایانه شمال' },
    destCity: 'رشت',
  },
  {
    id: '2',
    company: 'ایران پیما (تعاونی ۲۰)',
    companyLogo: '/images/companies/c_6.webp',
    type: 'اسکانیا VIP',
    fullPrice: 448000,
    availableSeats: 20,
    time: '18:30',
    boardingPoint: { city: 'تهران', terminal: 'پایانه غرب' },
    destCity: 'رشت',
  },
];

export default function SearchResultsPage() {
  // ۱. تعریف استیت فیلترها برای مدیریت در هر دو سایدبار دسکتاپ و موبایل
  const [filters, setFilters] = useState<FilterState>({
    trabori: false,
    hamsafar: false,
    ariasafar: false,
    gitipayma: false,
    sirosafar: false,
  });

  return (
    <div className="mx-auto">
      
      {/* کامپوننت فیلتر موبایل (فقط در موبایل نمایش داده می‌شود و دکمه شناور دارد) */}
      
      <MobileBottomBar />
      <MobileBaseDrawer filters={filters} 
        setFilters={setFilters} />

      {/* هدر جستجو (بدون تغییر) */}
      <div className="bg-white lg:bg-transparent pr-8 lg:pr-0 md:pt-8 shadow-box lg:shadow-none mb-8 flex flex-col lg:flex-row items-center justify-between">
          <SearchInfoBar />

          <div className="w-full md:w-auto">
             <BusMobileHeader />
          </div>
          
      <div className='w-full lg:hidden '>
            <SortBar />
          </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* سایدبار دسکتاپ جدید - جایگزین سایدبار قبلی */}
        <DesktopSidebar filters={filters} setFilters={setFilters} />

        {/* بخش اصلی لیست کارت‌ها */}
        <main className="flex-1 px-4 md:px-0 min-w-0">
          
            <div className='hidden w-full lg:block'>
              <SortBar />
            </div>
          
          {/* لیست بلیط‌ها */}
          <div className=" w-full flex flex-col gap-4">
            {mockServices.map((service) => (
              <TicketCard 
                key={service.id} 
                service={service} 
                onSelect={(s) => console.log("Selected:", s.id)} 
              />
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}