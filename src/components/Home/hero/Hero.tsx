import React from 'react'
import Image from 'next/image'
import SearchBox from '@/components/search/SearchBox'

function Hero() {
  return (
    /* h-fit: در موبایل ارتفاع بر اساس SearchBox تنظیم می‌شود
       md:h-[378px]: در دسکتاپ ارتفاع ثابت می‌ماند
       bg-[#f3f4ff] md:bg-transparent: فقط در موبایل رنگ دارد
       p-0: پدینگ را در موبایل صفر کردیم تا بک‌گراند دقیقاً چسبیده به باکس باشد
    */
    <div className="relative -mt-3 w-full h-fit md:h-[378px] md:p-7 rounded-2xl flex justify-center bg-gradient-to-t from-[#fcfdff] via-[#f3f4ff] to-[#fcfdff] md:bg-transparent">

      {/* تصویر فقط در دسکتاپ نمایش داده می‌شود */}
      <div className="hidden md:block">
        <Image
          src="/images/hero/bg.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover rounded-2xl" // object-contain به object-cover تغییر یافت برای پر کردن فضا
        />
      </div>

      {/* در حالت موبایل overflow-visible کمک می‌کند اگر اجزای سرچ باکس بیرون زدند بریده نشوند
      */}
      <div className="relative z-10 w-full flex justify-center items-start">
        <SearchBox />
      </div>

    </div>
  )
}

export default Hero