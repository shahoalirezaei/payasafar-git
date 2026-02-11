"use client";

import Image from 'next/image';
import React from 'react';

interface QuickActionCardProps {
  image: string;
  title: string;
  buttonTitle: string;
  width: number;
  height: number;
  className?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  image, title, buttonTitle, width, height, className = "" 
}) => {
  return (
    <div className={`
      bg-page shadow-box rounded-[20px] 
      flex flex-col justify-between items-center 
      p-4 md:p-6 w-full 
      aspect-[282/272]  /* حفظ نسبت طلایی فیگما */
      font-pedya border border-transparent
      transition-all duration-300 hover:shadow-lg
      ${className}
    `}>
      {/* بخش تصویر: به جای ارتفاع ثابت، از flex-1 استفاده میکنیم تا فضا را هوشمندانه پر کند */}
      <div className='flex-1 flex items-center justify-center w-full min-h-0'>
        <div className="relative w-[70%] h-[70%] md:w-[80%] md:h-[80%]">
          <Image
            src={image}
            alt={title}
            fill // استفاده از fill به همراه object-contain بهترین روش برای حفظ نسبت تصویر است
            className='object-contain transition-transform duration-500 group-hover:scale-110'
            sizes="(max-width: 768px) 30vw, 20vw"
          />
        </div>
      </div>
      
      {/* بخش متنی و دکمه */}
      <div className="flex flex-col items-center gap-2 md:gap-3 w-full">
        <h5 className="font-bold text-sm md:text-base text-text-primary text-center leading-tight line-clamp-2">
          {title}
        </h5>
        
        <button className='
          text-[10px] md:text-xs cursor-pointer px-4 py-2 
          text-white btn-blue rounded-full 
           active:scale-95 
          whitespace-nowrap
        '>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default QuickActionCard;