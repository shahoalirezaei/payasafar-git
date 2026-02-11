import React, { useState } from 'react';

function BusMobileHeader() {
  const days = [
    { id: 1, date: '1403/11/28', label: 'امروز' },
    { id: 2, date: '1403/11/29', label: 'دوشنبه' },
    { id: 3, date: '1403/11/30', label: 'سه‌شنبه' },
    { id: 4, date: '1403/12/01', label: 'چهارشنبه' },
    { id: 5, date: '1403/12/02', label: 'پنج‌شنبه' },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    /* توضیح فنی اصلاحیه:
       1. والد شما p-4 دارد (16px).
       2. پس ما -mx-4 می‌دهیم تا دقیقاً آن را خنثی کند. (قبلاً -mx-5 بود که 4 پیکسل اضافه می‌آورد و اسکرول می‌ساخت)
       3. w-[calc(100%+2rem)]: عرض را دقیقاً به اندازه 100% + 32px (دو تا 16px) باز می‌کنیم.
    */
    <div className="lg:hidden -mx-4 w-[calc(100%+2rem)]">
      
      <div 
        className="flex gap-2.5 overflow-x-auto py-3 items-center no-scrollbar 
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveTab(day.id)}
            className={`flex items-center justify-center  gap-2 px-6 rounded-full transition-all duration-300 whitespace-nowrap border ${
              activeTab === day.id
                ? ' btn-orange'
                : ' text[#5B5B5B] border-transparent h-[35px] w-[130px] shadow-input-inset bg-[#F9F9F9]' 
            }`}
          >
            <span className="text-[12px] font-semibold">{day.date}</span>
            <span className="text-[12px] font-normal opacity-90">{day.label}</span>
          </button>
        ))}
        
        {/* فضای خالی برای انتهای اسکرول */}
        <div className="min-w-[10px] h-1"></div>
      </div>
    </div>
  );
}

export default BusMobileHeader;