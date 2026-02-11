"use client";

import React from "react";
import Image from "next/image";
import CommentCard from "./CommentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// استایل‌های Swiper
import "swiper/css";
import "swiper/css/pagination";

interface IComment {
  id: number;
  name: string;
  experience: string;
  text: string;
}

const comments: IComment[] = [
  {
    id: 1,
    name: "محمد رضا احمدی",
    experience: "۳۲ تجربه سفر با پایاسفر",
    text: "تهیه بلیط از پایاسفر به شدت رضایت بخشه ... عالیه 👌",
  },
  {
    id: 2,
    name: "روشنک میرزایی",
    experience: "۱۴ تجربه سفر با پایاسفر",
    text: "همیشه بلیط اتوبوس هامو از پایا سفر رزرو میکنم",
  },
  {
    id: 3,
    name: "محسن مرادی",
    experience: "۶ تجربه سفر با پایاسفر",
    text: "بهترین وبسایت برای خرید آنی بلیط با پشتیبانی عالی",
  },
  {
    id: 4,
    name: "محسن مرادی",
    experience: "۶ تجربه سفر با پایاسفر",
    text: "بهترین وبسایت برای خرید آنی بلیط با پشتیبانی عالی",
  },
  {
    id: 5,
    name: "محسن مرادی",
    experience: "۶ تجربه سفر با پایاسفر",
    text: "بهترین وبسایت برای خرید آنی بلیط با پشتیبانی عالی",
  },
];

export default function CommentSection() {
  return (
    <section className="mt-7 mb-[61px] md:my-[55px] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-x-[26px] gap-y-[23px]">
        {/* بخش تصویر و عنوان (سمت راست در دسکتاپ) */}
        <div className="w-full lg:w-1/4 flex flex-col items-center text-center">
          <div className="relative w-56 h-[122px] md:w-[292px] md:h-[168px]">
            <Image
              src="/images/images/comments.webp" // مسیر تصویر شما
              alt="تجربه و نظرات کاربران"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-[#335FD6] text-xl md:text-base leading-7 font-bold">
            تجربه و نظرات شما
          </h2>
        </div>

        {/* بخش اسلایدر (سمت چپ در دسکتاپ) */}
        <div className="w-full lg:w-3/4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={17}
            slidesPerView={1} 
            loop={comments.length > 3} // فقط اگر تعداد نظرات زیاد بود لوپ شود
            dir="rtl"
            centeredSlides={false}
            // اضافه کردن این دو مورد برای حل مشکل تراز در RTL
            initialSlide={0}
            resistanceRatio={0}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                slidesOffsetBefore: 0,
                pagination: false,
              },
              1024: {
                slidesPerView: 2.2,
                slidesOffsetBefore: 0, // اطمینان از چسبیدن به ابتدای سمت راست
              },
            }}
            style={{
              // @ts-ignore
              "--swiper-pagination-color": "#335FD6", // رنگ دایره فعال
              "--swiper-pagination-bullet-inactive-color": "#AAAAAA", // رنگ دایره غیرفعال
              "--swiper-pagination-bullet-horizontal-gap": "1px",
            }}
            // پدینگ‌ها برای جلوگیری از برش سایه کارت‌ها (Box Shadow Clipping)
            className="!pb-8  
             
           [&_.swiper-pagination]:!mx-auto
           [&_.swiper-pagination]:!w-full
           [&_.swiper-pagination-bullet]:!w-1.5 
             [&_.swiper-pagination-bullet]:!h-1.5 
             [&_.swiper-pagination-bullet]:!rounded-full
             [&_.swiper-pagination-bullet]:!mx-[2px]
             [&_.swiper-pagination-bullet]:!opacity-100 /* کنترل دستی شفافیت */
             /* استایل اختصاصی برای دایره غیرفعال */
             [&_.swiper-pagination-bullet:not(.swiper-pagination-bullet-active)]:!bg-[#AAAAAA]
            
             /* استایل اختصاصی برای دایره فعال */
             [&_.swiper-pagination-bullet-active]:!bg-[#335FD6]
             [&_.swiper-pagination-bullet-active]:!w-1.5
           [&_.swiper-pagination]:z-50
           md:[&_.swiper-pagination]:!hidden"
          >
            {comments.map((comment) => (
              <SwiperSlide key={comment.id} className="py-2">
                <CommentCard comment={comment} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
