"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const SeoContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto border-b border-b-[#ECECEC] pb-7 md:pb-8">
        <div className="max-w-[1040px] mx-auto transition-all duration-500">
          
          {/* عنوان اصلی - سئو */}
          <h2 className="text-2xl font-bold text-title mb-8 text-right px-2">
            بلیط اتوبوس پایاسفر
          </h2>

          {/* بخش متن طبق مشخصات فیگما */}
          <div
            className={`relative transition-all duration-700 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[5000px]" : "max-h-[166px] md:max-h-[245px]"
            }`}
          >
            <article 
              className="text-[#4F6996] text-right font-semibold text-[16px] leading-[28px] space-y-4 px-2"
            >
              <p>
                در عصری که بیشتر کارها با اینترنت و چند کلیک ساده انجام می‌شود، پایاسفر رزرو آنلاین بلیط اتوبوس را برای مسافران ساده و بدون دردسر کرده است. تمامی مسافرانی که می‌خواهند به شهرهای مختلف ایران سفر کنند، دیگر نیازی نیست چالش‌های خرید بلیط را تحمل کنند، این افراد با چند کلیک ساده می‌توانند بلیط موردنظر خود را برای تاریخ و زمان مشخص رزرو کنند.
              </p>
              <p>
                پایاسفر با شعار سفر از تمام 
                <span className="underline decoration-solid underline-offset-4"> پایانه ها</span>
                ، در کنار رزرو آنی بلیط، خدمات و مزایای مختلفی را برای مسافران در نظر گرفته تا خیال آنها را بابت رزرو بلیط راحت کرده و بدون هیچ مشکلی سفر خود را به‌آسانی انجام دهند.
              </p>

              {/* محتوای اضافی که در حالت expanded ظاهر می‌شود */}
              {isExpanded && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-700">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                      <ServiceCard 
                        image="/images/images/bus-ticket01.webp" 
                        title="انواع خدمات پایاسفر"
                        desc="خرید اینترنتی از پایاسفر به دلیل ارائه خدمات و مزایای بسیار عالی بسیار آسان شده است."
                      />
                      <ServiceCard 
                        image="/images/images/bus-ticket02.webp" 
                        title="عدم پرداخت هزینه اضافی"
                        desc="تمام قیمت بلیط‌ها در سایت پایاسفر توسط شرکت‌های مسافربری تعیین شده و هزینه اضافی پرداخت نخواهید کرد."
                      />
                      <ServiceCard 
                        image="/images/images/bus-ticket03.webp" 
                        title="تخفیفات و بلیط های ارزان"
                        desc="در بسیاری از مواقع تخفیفات خاصی روی برخی از بلیط‌ها اعمال می‌شود که در کمترین زمان به آنها دسترسی دارید."
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#1e293b] mt-10">تغییر برند از پایانه ها به پایاسفر</h3>
                    <p className="mt-4">
                      با افتخار اعلام می کنیم که سایت ما در حوزه خرید اینترنتی بلیط اتوبوس از پایانه ها به پایاسفر تغییر برند داده است. این تغییر نه تنها نشان از رشد و توسعه ما در ارائه خدمات بهتر است، بلکه ما با تمرکز بر جزئیات و نیازهای شما، تجربه ای منحصر به فرد را فراهم خواهیم ساخت.
                    </p>
                </div>
              )}
            </article>

            {/* لایه گرادینت برای محوشدگی (مطابق عکس SEO-Txt) */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
            )}
          </div>

          {/* دکمه مشاهده بیشتر / کمتر */}
          <div className="flex justify-center  relative z-20 cursor-pointer">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2.5 blue600 font-semibold text-4 group transition-all"
            >
              <span className=" group-hover:border-[#335FD6]">
                {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
              </span>
              <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ image, title, desc }: { image: string, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center group bg-slate-50 p-4 rounded-[24px]">
    <div className="relative w-full h-[180px] rounded-[17px] overflow-hidden mb-4 shadow-sm">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
    </div>
    <h3 className="text-[17px] font-bold text-[#0f172a] mb-2">{title}</h3>
    <p className="text-[13px] text-[#8c9dbb] leading-6 line-clamp-3">{desc}</p>
  </div>
);

export default SeoContent;