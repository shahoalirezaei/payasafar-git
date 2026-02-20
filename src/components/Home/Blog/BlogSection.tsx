"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BlogCard, { type IBlogPost } from "./BlogCard"; // ایمپورت تایپ

// استایل‌های سواایپر
import "swiper/css";
import "swiper/css/pagination";

// 1. تعریف داده‌ها با تایپ صریح (Strict Typing)
const blogPosts: IBlogPost[] = [
  {
    id: 1,
    image: "/images/blogs/blog1.webp",
    title: "اینترنت همراه در مسافرت های زمینی",
    description:
      "در بسیاری از مواقع ممکن است سفر شما کنسل شده و بخواهید بلیط خود را باز گردانید. یکی از خدمات برجسته پایاسفر این است که امکان کنسل کردن و استرداد بلیط اتوبوس را به صورت آنی فراهم کرده است.",
    date: "2 روز پیش",
    link: "#",
  },
  {
    id: 2,
    image: "/images/blogs/blog2.webp",
    title: "تور زمینی آنتالیا و گرجستان ۱۴۰۴",
    description:
      "در بسیاری از مواقع ممکن است سفر شما کنسل شده و بخواهید بلیط خود را باز گردانید. یکی از خدمات برجسته پایاسفر این است که امکان کنسل کردن و استرداد بلیط اتوبوس را به صورت آنی فراهم کرده است.",
    date: "5 روز پیش",
    link: "#",
  },
  {
    id: 3,
    image: "/images/blogs/blog3.webp",
    title: "مسافرت زمینی به جزیره های جنوب",
    description:
      "در بسیاری از مواقع ممکن است سفر شما کنسل شده و بخواهید بلیط خود را باز گردانید. یکی از خدمات برجسته پایاسفر این است که امکان کنسل کردن و استرداد بلیط اتوبوس را به صورت آنی فراهم کرده است.",
    date: "1 هفته پیش",
    link: "#",
  },
  {
    id: 4,
    image: "/images/blogs/blog1.webp",
    title: "نکات مهم قبل از سفر",
    description:
      "در بسیاری از مواقع ممکن است سفر شما کنسل شده و بخواهید بلیط خود را باز گردانید. یکی از خدمات برجسته پایاسفر این است که امکان کنسل کردن و استرداد بلیط اتوبوس را به صورت آنی فراهم کرده است.",
    date: "10 روز پیش",
    link: "#",
  },
  {
    id: 5,
    image: "/images/blogs/blog2.webp",
    title: "معرفی بهترین ترمینال‌های ایران",
    description:
      "در بسیاری از مواقع ممکن است سفر شما کنسل شده و بخواهید بلیط خود را باز گردانید. یکی از خدمات برجسته پایاسفر این است که امکان کنسل کردن و استرداد بلیط اتوبوس را به صورت آنی فراهم کرده است.",
    date: "2 هفته پیش",
    link: "#",
  },
  {
    id: 6,
    image: "/images/blogs/blog3.webp",
    title: "سفر ارزان با اتوبوس",
    description:
      "در بسیاری از مواقع ممکن است سفر شما کنسل شده و بخواهید بلیط خود را باز گردانید. یکی از خدمات برجسته پایاسفر این است که امکان کنسل کردن و استرداد بلیط اتوبوس را به صورت آنی فراهم کرده است.",
    date: "3 هفته پیش",
    link: "#",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 md:py-[59px] relative">
      <div className="mx-auto">
        {/* هدر سکشن */}
        <div className="flex flex-col items-center justify-between gap-1">
            <h2 className="text-title font-semibold text-2xl leading-7">
              مقالات اخیر
            </h2>

          <Link
            href="https://blog.payasafar.com"
            className="blue600 font-semibold text-sm hover:text-[15px] transition-colors"
          >
            مشاهده همه مقالات
            
          </Link>
        </div>

        {/* اسلایدر */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={"auto"}
            centeredSlides={true}
            loop={true}
            dir="rtl" // اضافه کردن دایرکشن راست‌چین برای اسلایدرپ
            centerInsufficientSlides={true}
            pagination={{
              clickable: true,
              dynamicBullets: false, // این حالت باعث می‌شود دایره‌ها با حرکت، سایز متفاوتی بگیرند (بسیار مدرن)
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 34,
              },
            }}
            style={{
              // @ts-ignore
              "--swiper-pagination-color": "#335FD6", // رنگ دایره فعال
              "--swiper-pagination-bullet-inactive-color": "#AAAAAA", // رنگ دایره غیرفعال
              "--swiper-pagination-bullet-horizontal-gap": "1px",
            }}
            // پدینگ‌ها برای جلوگیری از برش سایه کارت‌ها (Box Shadow Clipping)
            className="!pt-6 md:!pt-8 !pb-16 !px-4 
             
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
            {blogPosts.map((blog: IBlogPost) => (
              <SwiperSlide
                key={blog.id}
                className="!h-auto !w-auto py-2 !flex justify-center"
              >
                <BlogCard
                  image={blog.image}
                  title={blog.title}
                  description={blog.description}
                  date={blog.date}
                  link={blog.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
