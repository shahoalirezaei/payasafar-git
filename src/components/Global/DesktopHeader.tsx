"use client";

import Link from "next/link";
import Image from "next/image";

export default function DesktopHeader() {
  return (
    <header className="hidden fixed top-0 left-1/2 transform -translate-x-1/2 z-50  md:flex items-center justify-between gap-x-11  h-[49px]  md-max:gap-x-6 text-sm  font-semibold black-text rounded-[100px] md-max:w-[750px]  w-[858px] bg-white shadow-soft-blue mt-[50px] mx-auto  py-1.5 pl-2 pr-5 ">
      
      {/* logo */}
      <Link href="/">
        <Image
          src="/images/logo/logo.png"
          alt="Payasafar Logo"
          width={84}
          height={28}
          priority
        />
      </Link>

      {/* nav */}
      
        <Link href="/" className="hover:text-text-blue600">خرید بلیط</Link>
        <Link href="/" className="hover:text-text-blue600">رهگیری و استرداد</Link>
        <Link href="/" className="hover:text-text-blue600">مجله‌ی سفر</Link>
        <Link href="/support" className="hover:text-text-blue600">پشتیبانی</Link>
        <Link href="/" className="hover:text-text-blue600">سوالات متداول</Link>
      

      <button className="btn-blue font-medium  flex gap-1 items-center">
        ورود 
        <span className="font-extralightb leading-7">|</span>
         ثبت نام
      </button>
    </header>
  );
}
