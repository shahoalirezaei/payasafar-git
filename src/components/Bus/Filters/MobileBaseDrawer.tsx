"use client";

import React, { useState, useEffect } from 'react'; // اضافه شد
import { useRouter } from 'next/navigation'; // اضافه شد
import moment from 'jalali-moment'; // اضافه شد
import { useDrawerStore } from '@/store/zustand/useDrawerStore';
import { useSearchStore, LocationData } from '@/store/zustand/search.store'; // اضافه شد
import { useCalendarStore } from '@/store/zustand/useCalendarStore'; // اضافه شد
import { ArrowLeft, X } from 'lucide-react';
import FilterContent, { FilterState } from './FilterContent';
import ChangeDirectionContent from './ChangeDirectionContent';
// import TripDetailsContent from '../Bus/TripDetails/TripDetailsContent';

interface MobileFilterContentProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function MobileBaseDrawer({ filters, setFilters }: MobileFilterContentProps) {
  const router = useRouter();
  const { isOpen, view, fullHeight, closeDrawer } = useDrawerStore();
  
  // دسترسی به استورها
  const { bus, setBusOrigin, setBusDestination } = useSearchStore();
  const { selectedDate } = useCalendarStore();

  // استیت‌های موقت برای نگهداری تغییرات "تغییر مسیر" قبل از اعمال نهایی
  const [tempOrigin, setTempOrigin] = useState<LocationData>(bus.origin);
  const [tempDest, setTempDest] = useState<LocationData>(bus.destination);

  // سینک کردن استیت موقت با استور اصلی هر بار که دراور باز میشه (ریست کردن تغییرات قبلی اعمال نشده)
  useEffect(() => {
    if (isOpen) {
      setTempOrigin(bus.origin);
      setTempDest(bus.destination);
    }
  }, [isOpen, bus.origin, bus.destination]);


  // هندلر دکمه "اعمال تغییرات" (برای تغییر مسیر)
  const handleApplyChangeDirection = () => {
    // اعتبارسنجی
    if (!tempOrigin.code || !tempDest.code) {
        alert("لطفا مبدا و مقصد را به درستی انتخاب کنید");
        return;
    }

    // 1. آپدیت استور اصلی (Zustand)
    setBusOrigin(tempOrigin);
    setBusDestination(tempDest);

    // 2. آپدیت URL و رفرش شدن لیست بلیط‌ها
    if (selectedDate) {
        const originSlug = tempOrigin.etitle.trim().toLowerCase().replace(/\s+/g, '-');
        const destSlug = tempDest.etitle.trim().toLowerCase().replace(/\s+/g, '-');
        const jalaliDate = moment(selectedDate).format("jYYYY-jMM-jDD");
        
        router.push(`/bus/${originSlug}-${destSlug}?departing=${jalaliDate}`);
    }

    // 3. بستن دراور
    closeDrawer();
  };


  if (!isOpen) return null;

  // استایل‌های مشترک کانتینر
  const containerClasses = fullHeight
    ? "fixed inset-0 z-[60] flex flex-col bg-[#FCFDFF] px-4 sm:px-10 overflow-y-auto animate-in slide-in-from-bottom duration-300"
    : "fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-[30px] shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col";
    // نکته: کلاس containerClasses شما کمی پیچیده بود، برای فول اسکرین و غیر فول اسکرین جدا کردم که تداخل نکنه
    // البته سعی کردم به استایل اصلی شما وفادار بمونم، ولی پوزیشنینگ fixed برای مدال ضروریه.

  // استایل کانتینر داخلی (اگر فول اسکرین نیست)
  const innerContainerClasses = fullHeight 
    ? "flex flex-col h-full" 
    : "w-full h-full flex flex-col relative";


  // رندر شرطی Overlay (فقط وقتی فول اسکرین نیست)
  const renderOverlay = !fullHeight ? (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[59]" 
      onClick={closeDrawer} 
    />
  ) : null;


  return (
    <>
      {renderOverlay}

      <div className={containerClasses}>
        
        {/* هدر داینامیک */}
        <div className={`flex items-center justify-between p-6 shrink-0`}>
          {fullHeight ? (
            <>
              <div className="w-6" /> 
              <h2 className="text-[20px] font-semibold text-[#1A1C1E]">
                {view === 'FILTER' ? 'اعمال فیلتر' : 'جزئیات سفر'}
              </h2>
              <button onClick={closeDrawer} className="text-gray-700">
                <ArrowLeft size={24} />
              </button>
            </>
          ) : (
            /* هندل‌بار برای حالت دراور کوتاه */
            <div className="flex items-center justify-between w-full bg-transparent rounded-full mx-auto" >
              <div className="w-6" /> 
              <h2 className="text-lg font-semibold text-[20px]">
                تغییر مسیر سفر
              </h2>
              <button onClick={closeDrawer} >
                <X  size={24} />
              </button>
            </div>
          )}
        </div>

        {/* محتوای متغیر (Scrollable Area) */}
        <div className={`flex-1 overflow-y-auto ${fullHeight ? 'px-6 py-4' : ''}`}>
          {view === 'FILTER' && <FilterContent  filters={filters} setFilters={setFilters}/>}
          {/* {view === 'TRIP_DETAILS' && <TripDetailsContent />} */}
          
          {/* پاس دادن توابع تغییر دهنده استیت موقت به فرزند */}
          {view === 'CHANGE_DIRECTION' && (
            <ChangeDirectionContent 
                onOriginChange={setTempOrigin} 
                onDestChange={setTempDest} 
            />
          )}
        </div>

        {/* فوتر اختصاصی برای فیلتر */}
        {view === 'FILTER' && (
          <div className="p-6 mt-auto w-full border-t border-t-[#EDEDED] shadow-box bg-white px-8 pt-6 pb-10 shrink-0">
            <button 
              onClick={closeDrawer}
              className="w-full py-4 bg-btn-blue text-white rounded-[16px] font-bold shadow-md active:scale-[0.98] transition-transform"
            >
               اعمال فیلتر (۳)
            </button>
          </div>
        )}

        {/* فوتر اختصاصی برای تغییر مسیر */}
        {view === 'CHANGE_DIRECTION' && (
          <div className="p-6 mt-auto w-full px-3 pt-6 pb-10 max-w-[400px] mx-auto shrink-0">
            <button 
              // اتصال دکمه به تابع هندلر جدید
              onClick={handleApplyChangeDirection}
              className="w-full py-4 big-btn-blue text-white rounded-[16px] font-bold shadow-md active:scale-[0.98] transition-transform"
            >
              اعمال تغییرات
            </button>
          </div>
        )}
      </div>
    </>
  );
}