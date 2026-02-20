import React from 'react';
import ServiceCard from './ServiceCard'; // مسیر ایمپورت را چک کنید

function ServicesGrid() {
  return (
    <div className="mt-36 md:mt-[135px] grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-[14px] md:mb-[22px]">
      {/* آیتم اول: گپ متفاوت (2.5) */}
      <ServiceCard
        title="بلیط اتوبوس"
        iconSrc="/images/icons/location.webp"
        textColorClass="text-blue"
        className="gap-x-2.5"
      >
        به تمام نقاط ایران
      </ServiceCard>

      {/* آیتم دوم */}
      <ServiceCard
        title="خرید بلیط"
        iconSrc="/images/icons/Calendar.webp"
        textColorClass="text-orange"
      >
        برای هر تاریخ و زمان{' '}
        <span className="hidden md:inline-block">دلخواه</span>
      </ServiceCard>

      {/* آیتم سوم: تغییر ترتیب در موبایل (order-last) */}
      <ServiceCard
        title="استرداد بلیط"
        iconSrc="/images/icons/Wallet.webp"
        textColorClass="text-blue"
        className="gap-x-2 order-last md:order-0"
      >
        بازگشت وجه پرداختی
      </ServiceCard>

      {/* آیتم چهارم */}
      <ServiceCard
        title="تخفیف بلیط"
        iconSrc="/images/icons/Discount.webp"
        textColorClass="text-orange"
      >
        تهیه <span className="hidden md:inline-block">‌ی بلیط</span> با بهترین قیمت
      </ServiceCard>
    </div>
  );
}

export default ServicesGrid;