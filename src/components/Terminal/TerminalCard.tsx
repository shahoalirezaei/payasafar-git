import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Terminal {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText: string;
  variant: 'hero' | 'vertical' | 'compact';
}

const TerminalCard = ({ data, isPriority = false }: { data: Terminal; isPriority?: boolean }) => {
  const { id, title, subtitle, imageUrl, ctaText, variant } = data;

  // ۱. مدیریت استایل‌های کانتینر و تراز محتوا بر اساس فیگما
  const containerStyles = {
    hero: "aspect-[579/272] bg-[#010103] items-start justify-center px-[22.5px] md:px-[34px] gap-[7px] md:gap-3",
    vertical: "aspect-[282/272] bg-gradient-to-b from-[#64A9C3] via-transparent to-transparent items-center justify-start pt-[21.5px] md:pt-[33px] pb-6",
    compact: "aspect-[282/126] items-start justify-center px-[14.6px] md:px-[22px]"
  };

  // ۲. مدیریت سایز تایتل‌ها (Mapping)
  const titleSizes = {
    hero: "text-xl md:text-[32px] font-bold",
    vertical: "text-base md:text-[24px] font-bold text-text-primary pb-1.5 md:pb-[10px]",
    compact: "text-sm md:text-xl font-bold",
  };

  // ۳. منطق اختصاصی بک‌گراند و ماسک تصویر برای هر کارت
  const themes = {
    1: { bg: "bg-[#010103]", mask: "bg-gradient-to-r from-transparent via-[#010103]/5 to-[#010103]/80" }, // تهران
    2: { bg: "#64A9C3", mask: "" }, // تبریز
    3: { bg: "bg-black", mask: "bg-gradient-to-r from-transparent via-black/60 to-black" }, // شیراز
    4: { bg: "bg-[#171C3A]", mask: "bg-gradient-to-r from-transparent via-[#171C3A]/80 to-[#171C3A]" }, // مشهد
  };

  const currentTheme = themes[id as keyof typeof themes];
  // background: linear-gradient(180deg, #64A9C3 3.86%, rgba(255, 255, 255, 0) 47.79%);
// rgba(100, 169, 195, 1)

  return (
    <Link
      href={`/terminal/${id}`}
      className={`group relative overflow-hidden flex flex-col text-white w-full font-pedya
        ${containerStyles[variant]} ${currentTheme.bg}
        rounded-[9.79px] md:rounded-[15px] 
        border-[0.65px] md:border-[1px] border-[#FFFFFF26]
        transition-all duration-300 hover:border-white/40
      `}
    >
      {/* بخش تصویر (سمت چپ برای افقی، پایین برای عمودی) */}
      <div className={`absolute z-0 pointer-events-none 
        ${variant === 'vertical' ? 'bottom-0 left-0 w-full h-full' : 'left-0 top-0 w-full h-full'}
      `}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority={isPriority} // برای سئو و LCP
          className="object-cover group-hover:scale-105  transition-transform duration-700"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {/* لایه ماسک جهت ترکیب عکس با بک‌گراند (Gradient Overlay) */}
        {/* <div className={`absolute inset-0 z-120 ${currentTheme.mask}`} /> */}
      </div>

      {/* محتوای متنی */}
      <div className="relative z-10">
        <h2 className={`${titleSizes[variant]} leading-tight`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-[10px] md:text-base text-gray-300 mt-1 md:mt-2 opacity-90 font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* دکمه عملیاتی */}
      <div className={`relative z-10 ${variant === 'vertical' ? 'order-last' : 'mt-2'}`}>
        <button className={`
          rounded-full font-medium transition-all active:scale-95 cursor-pointer text-[8px] md:text-xs
          ${variant === 'compact' 
            ? ' flex items-center gap-1 hover:gap-2' 
            : 'btn-blue'}
        `}>
          {ctaText}
          
        </button>
      </div>
    </Link>
  );
};

export default TerminalCard;