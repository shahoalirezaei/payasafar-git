import React from 'react';
import StatCard from './StatCard';
import HeroStatCard from './HeroStatCard';

const ProofSection = () => {
  return (
    <section className="container py-12 md:py-20 font-pedya">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          پایاسفر، همسفری پایا به گواه آمار
        </h2>
        <p className="text-sm md:text-base font-medium text-gray-600 max-w-2xl mx-auto">
          نگاه به مسیری مشترک؛ مسیری که با اعتماد شما و به روایت اعداد، باعث افتخار ماست.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
        
        {/* کارت بزرگ - در موبایل اول (order-first) و در دسکتاپ سمت چپ (یا راست بسته به RTL) */}
        <div className="order-first lg:col-span-6 h-full">
          <HeroStatCard 
            mainValue= {3000}
            mainLabel="مسافر روزانه در پایاسفر"
            subValue= {98}
            subLabel="نرخ بازگشت دوباره"
            imageSrc="/images/images/bag.webp"
          />
        </div>

        {/* چهار کارت کوچک */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6">
          <StatCard value={100} prefix="+" label="مسافر خارجی در ماه" />
          <StatCard value={98} prefix="%" label="رضایت از پشتیبانی" />
          <StatCard value={240} prefix="+" label="مسیرهای فعال" />
          <StatCard value={80} prefix="+" label="شرکت حمل و نقل همکار" />
        </div>

      </div>
    </section>
  );
};

export default ProofSection;