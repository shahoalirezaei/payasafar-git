import React from 'react';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  iconSrc: string;
  // کلاس رنگ متن (مثل text-blue یا text-orange)
  textColorClass: string;
  // محتوای متن دوم که می‌تواند شامل تگ‌های HTML باشد
  children: React.ReactNode;
  // کلاس‌های اضافی برای مدیریت تفاوت‌های جزئی (مثل gap یا order)
  className?: string;
}

const ServiceCard = ({
  title,
  iconSrc,
  textColorClass,
  children,
  className = 'gap-x-2', // مقدار پیش‌فرض gap
}: ServiceCardProps) => {
  return (
    <div
      className={`service flex items-center gap-x-[9px]  md-max:gap-x-3 lg:gap-x-5 bg-white rounded-2xl shadow-box px-5 h-[81px] cursor-pointer transition-all hover:-translate-y-0.5 ${className}`}
    >
      <Image
        src={iconSrc}
        alt={title}
        width={39}
        height={37}
        className="md:w-[49px] md:h-[47px]"
      />
      <div className="h-[53px] flex flex-col justify-around my-[14px]">
        <h3 className="font-semibold md:text-sm text-xs text-black leading-8">{title}</h3>
        <span className={`${textColorClass} font-semibold md:text-sm text-xs leading-8`}>
          {children}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;