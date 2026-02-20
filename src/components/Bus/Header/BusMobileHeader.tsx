// src/components/Bus/Header/BusMobileHeader.tsx
"use client";

import React, { useMemo } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import moment from 'jalali-moment';
import { useCalendarStore } from '@/store/zustand/useCalendarStore';

function BusMobileHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams(); // برای گرفتن اسلاگ فعلی (مثلا tehran-esfahan)
  const { setSelectedDate } = useCalendarStore();

  // گرفتن تاریخ فعلی از URL (برای تشخیص تب فعال)
  const currentDepartingDate = searchParams.get('departing'); // فرمت: 1403-11-28

  // تولید لیست تاریخ‌ها (مثلاً برای ۱۴ روز آینده)
  const days = useMemo(() => {
    const list = [];
    const today = moment();

    for (let i = 0; i < 14; i++) {
      const dateObj = moment().add(i, 'days');
      
      list.push({
        id: i,
        // تاریخ برای نمایش (فرمت: 1403/11/28)
        displayDate: dateObj.format('jYYYY/jMM/jDD'), 
        // تاریخ برای URL (فرمت: 1403-11-28)
        urlDate: dateObj.format('jYYYY-jMM-jDD'), 
        // لیبل (امروز یا نام روز هفته)
        label: i === 0 ? 'امروز' : dateObj.format('dddd'),
        nativeDate: dateObj.toDate()
      });
    }
    return list;
  }, []);

  // هندلر کلیک روی تاریخ
  const handleDateClick = (day: typeof days[0]) => {
    // 1. آپدیت استور تقویم
    setSelectedDate(day.nativeDate);

    // 2. ساخت URL جدید (حفظ مسیر فعلی + تغییر تاریخ)
    // اگر در صفحه اصلی جستجو نیستیم (اسلاگ نداریم)، نباید کاری کنیم یا باید هندل شود
    if (params.slug) {
        const newUrl = `/bus/${params.slug}?departing=${day.urlDate}`;
        router.push(newUrl);
    }
  };

  return (
    /* توضیح فنی اصلاحیه:
       1. والد شما p-4 دارد (16px).
       2. پس ما -mx-4 می‌دهیم تا دقیقاً آن را خنثی کند.
       3. w-[calc(100%+2rem)]: عرض را دقیقاً به اندازه 100% + 32px باز می‌کنیم.
    */
    <div className="lg:hidden -mx-4 w-[calc(100%+2rem)]">
      
      <div 
        className="flex gap-2.5 overflow-x-auto py-3 items-center no-scrollbar 
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {days.map((day) => {
          // بررسی اینکه آیا این روز، روز انتخاب شده است؟
          // اگر تاریخی در URL نبود، پیش‌فرض روز اول (امروز) را انتخاب کن
          const isActive = currentDepartingDate 
            ? currentDepartingDate === day.urlDate 
            : day.id === 0;

          return (
            <button
              key={day.id}
              onClick={() => handleDateClick(day)}
              className={`flex items-center justify-center gap-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap border ${
                isActive
                  ? ' btn-orange'
                  : ' text[#5B5B5B] border-transparent h-[35px] w-[130px] shadow-input-inset bg-[#F9F9F9]' 
              }`}
            >
              <span className="text-[12px] font-semibold">{day.displayDate}</span>
              <span className="text-[12px] font-normal opacity-90">{day.label}</span>
            </button>
          );
        })}
        
        {/* فضای خالی برای انتهای اسکرول */}
        <div className="min-w-[10px] h-1"></div>
      </div>
    </div>
  );
}

export default BusMobileHeader;