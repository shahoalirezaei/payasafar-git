"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface QuickActionLittleCardProps {
  image: string;
  title: string;
  linkText: string;
  href?: string;
}

const QuickActionLittleCard: React.FC<QuickActionLittleCardProps> = ({ 
  image, title, linkText, href = "#" 
}) => {
  return (
    <div className='
      flex flex-1 items-center gap-x-2.5 
      bg-white rounded-[20px] shadow-box 
      px-2 md:px-4
      /* اعمال نسبت ابعاد متفاوت برای موبایل و دسکتاپ */
      aspect-[183/92] md:aspect-[282/126]
      w-full group transition-colors hover:bg-gray-50
    '>
      {/* بخش تصویر: اندازه متغیر بر اساس موبایل/دسکتاپ */}
      <div className="relative w-[38px] h-[41px] md:w-[54px] md:h-[60px] flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 40px, 60px"
        />
      </div>
      
      {/* بخش محتوا */}
      <div className='flex flex-col justify-center gap-y-0.5 md:gap-y-1 font-pedya overflow-hidden'>
        <h3 className='font-bold text-[12px] md:text-base text-text-primary leading-tight line-clamp-1'>
          {title}
        </h3>
        <Link href={href} className='
          blue600 font-semibold text-[10px] md:text-xs 
          cursor-pointer transition-all group-hover:text-blue-800
        '>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default QuickActionLittleCard;