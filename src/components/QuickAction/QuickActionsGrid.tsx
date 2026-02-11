import React from 'react';
import QuickActionCard from './QuickActionCard';
import QuickActionLittleCard from './QuickActionLittleCard';

const QuickActionsGrid = () => {
  return (
    <section className="w-full md:p-0 flex flex-col h-full">
      {/* استفاده از کلاسی که در کانفیگ تعریف کردید */}
      <div className='grid grid-cols-2 gap-y-2.5 gap-x-3 md:gap-[21px] items-stretch h-full'>
        
        <QuickActionCard 
          image="/images/images/Highway-Sign.webp" 
          title="زمان و فواصل بین شهری" 
          buttonTitle="محاسبه کنید" 
          width={139} 
          height={88} 
        />

        <QuickActionCard 
          image="/images/images/seat.webp" 
          title="صندلی خالی اتوبوس ها" 
          buttonTitle="جستجو کنید" 
          width={93} 
          height={87} 
        />

        {/* ستون ترکیبی Little Actions */}
        <div className='flex flex-col justify-between w-full gap-y-2.5 md:gap-y-5 h-full items-stretch'>
          <QuickActionLittleCard 
            image="/images/images/book.webp" 
            title="شرکت های مسافربری" 
            linkText="مشاهده کنید" 
          />
          <QuickActionLittleCard 
            image="/images/images/bus.webp" 
            title="اجاره دربستی اتوبوس" 
            linkText="مشاهده کنید" 
          />
        </div>

        <QuickActionCard 
          className="order-last" 
          image="/images/images/boxes.webp" 
          title="استعلام بارنامه رانندگان" 
          buttonTitle="جستجو کنید" 
          width={148} 
          height={110} 
        />
        
      </div>
    </section>
  );
};

export default QuickActionsGrid;