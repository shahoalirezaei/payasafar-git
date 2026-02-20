// src/components/Bus/Search/SortBar.tsx
import React, { useState } from 'react';


function SortBar() {
  // لیست گزینه‌های مرتب‌سازی
  const sortOptions = [
    { id: 'time', label: 'زودترین زمان حرکت' },
    { id: 'price', label: 'کمترین قیمت' },
    { id: 'capacity', label: 'بیشترین ظرفیت' },
    { id: 'IntercityStop', label: 'توقف بین شهری ' },
    { id: 'Quality', label: 'کیفیت اتوبوس' },
  ];

  const [activeSort, setActiveSort] = useState('time');

  return (
    // منطق Breakout برای بیرون زدن از کانتینر والد (دقیقاً مشابه هدر تاریخ)
    <div className="w-full mt-2 mb-4 overflow-hidden">
      
      <div 
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* لیبل "مرتب‌سازی:" */}
        <span className="text-[15px] text-black font-normal whitespace-nowrap ml-[21px] md:ml-[17px]">
          مرتب‌سازی:
        </span>

        {/* دکمه‌ها */}
        <div className="flex gap-[8px]">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveSort(option.id)}
              className={`
                snap-center
                h-[34px] w-[167px]  rounded-full border text-[15px] whitespace-nowrap transition-all duration-200 flex items-center justify-center
                ${activeSort === option.id 
                  ? 'bg-white text-[#FF7B0D] border-[#FFD1B2]' // استایل حالت فعال
                  : 'bg-white text-[#737373] border-[#EDEDED]' // استایل حالت غیرفعال
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* فضای خالی انتهایی برای اینکه آخرین دکمه به لبه نچسبد */}
        <div className="min-w-[20px] h-1"></div>
      </div>
    </div>
  );
}

export default SortBar;