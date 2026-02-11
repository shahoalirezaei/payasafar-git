// components/Bus/Filters/MobileBaseDrawer.tsx
"use client";

import React from 'react';
import { useDrawerStore } from '@/store/zustand/useDrawerStore';
import { ArrowLeft, ClosedCaption, X } from 'lucide-react';
import FilterContent, { FilterState } from './FilterContent';
import ChangeDirectionContent from './ChangeDirectionContent';
// import TripDetailsContent from '../Bus/TripDetails/TripDetailsContent';
interface MobileFilterContentProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function MobileBaseDrawer({ filters, setFilters }: MobileFilterContentProps) {
  const { isOpen, view, fullHeight, closeDrawer } = useDrawerStore();

  if (!isOpen) return null;

  // استایل‌های مشترک کانتینر برای حالت فول‌اسکرین و دراور
  const containerClasses = fullHeight
    ? "fixed flex flex-col inset-0 bg-[#FCFDFF]  z-[60] px-4 sm:px-10 overflow-y-auto animate-in slide-in-from-bottom duration-300"
    : "relative w-full bg-white rounded-t-[30px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh]";

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col ${!fullHeight ? 'justify-end' : ''}`}>
      
      {/* Overlay - فقط در حالت دراور نمایش داده می‌شود */}
      {!fullHeight && (
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          onClick={closeDrawer} 
        />
      )}

      <div className={containerClasses}>
        
        {/* هدر داینامیک */}
        <div className={`flex items-center justify-between p-6 `}>
          {fullHeight ? (
            <>
              <div className="w-6" /> {/* برای بالانس شدن عنوان در وسط */}
              <h2 className="text-[20px] font-semibold text-[#1A1C1E]">
                {view === 'FILTER' ? 'اعمال فیلتر' : 'جزئیات سفر'}
              </h2>
              <button onClick={closeDrawer} className="text-gray-700">
                <ArrowLeft size={24} />
              </button>
            </>
          ) : (
            /* هندل‌بار برای حالت دراور کوتاه */
            <div className="  flex items-center justify-between p-6 w-full bg-transparent  rounded-full mx-auto" >
              <div className="w-6" /> {/* برای بالانس شدن عنوان در وسط */}
              <h2 className="text-lg font-semibold text-[20px]">
                تغییر مسیر سفر
              </h2>
              <button onClick={closeDrawer} >
                <X  size={24} />
              </button>
              </div>
          )}
        </div>

        {/* محتوای متغیر */}
        <div className={`flex-1 ${fullHeight ? 'px-6 py-4' : ''}`}>
          {view === 'FILTER' && <FilterContent  filters={filters} setFilters={setFilters}/>}
          {/* {view === 'TRIP_DETAILS' && <TripDetailsContent />} */}
          {view === 'CHANGE_DIRECTION' && <ChangeDirectionContent />}
        </div>

        {/* فوتر اختصاصی برای فیلتر (دقیقا طبق استایل شما) */}
        {view === 'FILTER' && (
          <div className="p-6 mt-auto w-full border-t border-t-[#EDEDED] shadow-box bg-white px-8 pt-6 pb-10">
            <button 
              onClick={closeDrawer}
              className="w-full py-4 bg-btn-blue text-white rounded-[16px] font-bold shadow-md active:scale-[0.98] transition-transform"
            >
               اعمال فیلتر (۳)
            </button>
          </div>
        )}
        {view === 'CHANGE_DIRECTION' && (
          <div className="p-6 mt-auto w-full px-3 pt-6 pb-10 max-w-[400px] mx-auto">
            <button 
              onClick={closeDrawer}
              className="w-full py-4 big-btn-blue text-white rounded-[16px] font-bold shadow-md active:scale-[0.98] transition-transform"
            >
              اعمال تغییرات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}