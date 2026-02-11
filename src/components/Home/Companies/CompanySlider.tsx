"use client"; // چون اسلایدر نیاز به دسترسی به window دارد

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // اگر خواستید خودکار حرکت کند

// استایل‌های ضروری سواپیر
import "swiper/css";

import { busCompanies } from "@/lib/data/companies";

const CompanySlider = () => {
  return (
    <section className="w-full py-[52px] md:py-[73px] md:px-20 lg:px-24">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-7 md:mb-5">
          <h2 className="text-title text-base md:text-2xl font-semibold">
            شرکت های اتوبوس رانی
          </h2>
        </div>

        {/* Slider */}
        <div>
          <Swiper
            modules={[Autoplay]} // ماژول اتوپلی (اختیاری)
            spaceBetween={20}
            slidesPerView={3} // پیش‌فرض موبایل
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              // وقتی صفحه بزرگتر از 640px شد (Tablet)
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              // وقتی صفحه بزرگتر از 1024px شد (Desktop)
              1024: {
                slidesPerView: 7,
                spaceBetween: 40,
              },
            }}
            className="w-full !pb-4" // !pb-4 برای جلوگیری از بریده شدن سایه احتمالی
          >
            {busCompanies.map((company) => (
              <SwiperSlide key={company.id} className="!h-auto">
                <Link
                  href={company.link}
                  className="flex flex-col items-center justify-center gap-2 group cursor-pointer"
                  title={`بلیط اتوبوس ${company.name}`}
                >
                  {/* Image Container */}
                  <div className="relative w-[84px] h-[60px] md:w-[90px] md:h-[68px] transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={company.img}
                      alt={company.name}
                      fill
                      sizes="(max-width: 768px) 90px, 120px"
                      className="object-contain filter  opacity-80 group-hover:grayscale group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Company Name */}
                  <span className="blue600 text-sm font-semibold text-center mt-2">
                    {company.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CompanySlider;