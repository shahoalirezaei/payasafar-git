import React from 'react';
import TerminalCard from './TerminalCard';

const terminalsData = [
  { id: 1, title: 'ترمینال تهران', subtitle: 'اطلاعات انبار، شماره تلفن، شرکت ها و ...', imageUrl: '/images/images/tehran.webp', ctaText: 'مشاهده کنید', variant: 'hero' },
  { id: 2, title: 'ترمینال تبریز', imageUrl: '/images/images/tabriz.webp', ctaText: 'مشاهده کنید', variant: 'vertical' },
  { id: 3, title: 'ترمینال شیراز', imageUrl: '/images/images/shiraz.webp', ctaText: 'مشاهده کنید', variant: 'compact' },
  { id: 4, title: 'ترمینال مشهد', imageUrl: '/images/images/mashhad.webp', ctaText: 'مشاهده کنید', variant: 'compact' },
] as const;

const TerminalsGrid = () => {
  const tehran = terminalsData[0];
  const tabriz = terminalsData[1];
  const rightColumn = [terminalsData[2], terminalsData[3]];

  return (
    <section className="w-full flex flex-col h-full">
      <div className="grid grid-cols-2 items-stretch justify-stretch gap-x-[10px] gap-y-[14px] md:gap-y-[21px] md:gap-x-[15px] border border-[#FFFFFF26]">
        
        {/* بنر تهران - تمام عرض */}
        <div className="col-span-2">
          <TerminalCard data={tehran} />
        </div>

        {/* ستون راست (شیراز و مشهد) - در موبایل و دسکتاپ سمت راست می‌ماند */}
        <div className="flex flex-col gap-[13.1px] md:gap-[20px] items-stretch justify-stretch">
          {rightColumn.map((item) => (
            <TerminalCard key={item.id} data={item} />
          ))}
        </div>

        {/* ستون چپ (تبریز) - عمودی */}
        <div>
          <TerminalCard data={tabriz} />
        </div>

      </div>
    </section>
  );
};

export default TerminalsGrid;