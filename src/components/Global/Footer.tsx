"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, ClockIcon } from "@heroicons/react/24/outline";

// --- Data Structure ---
// ترتیب دیتا را طوری چیدیم که در گرید موبایل (چپ و راست) درست در بیاید
const FOOTER_SECTIONS = [
  {
    id: "support",
    title: "خدمات پشتیبانی",
    links: [
      { title: "مرکز پشتیبانی", href: "/#" },
      { title: "پیشنهادات و شکایات", href: "/#" },
      { title: " راهنمای خرید بلیط", href: "#" },
      { title: "راهنمای استرداد و لغو بلیط", href: "/#" },
    ],
  },
  {
    id: "info",
    title: "اطلاعات تکمیلی",
    links: [
      { title: "پنل آژانس", href: "/agency" },
      { title: " شماره شرکت‌های مسافربری ", href: "/companies" },
      { title: "فاصله‌ی بین شهر ها", href: "/distance" },
      { title: "شماره تماس انبار ها", href: "/distance" },
    ],
  },
  {
    id: "pages",
    title: "صفحات پایاسفر",
    links: [
      { title: "تماس با ما", href: "/contact" },
      { title: "درباره ما", href: "/about" },
      { title: "قوانین و مقررات", href: "/about" },
      { title: "حریم خصوصی کاربران", href: "/about" },
      { title: "مجله‌ی سفر", href: "/blog" },
    ],
  },
  {
    id: "coops",
    title: "تعاونی‌ها",
    links: [
      { title: "ترابری بی تا", href: "/coop/hamsafar" },
      { title: "همسفر", href: "/coop/hamsafar" },
      { title: "آریا سفر", href: "/coop/hamsafar" },
      { title: "ایران پیما", href: "/coop/iranpeyma" },
      { title: "رویال سفر", href: "/coop/royal" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full  pt-8 mb-8 px-4 md:px-0 mt-10" dir="rtl">
      <div className="mx-auto">
        {/* Main Card Container */}
        <div className="bg-white shadow-box py-[29px] md:py-[32px] rounded-[20px] flex flex-col md:flex-row md:flex-wrap">
          {/* =========================================================================
              SECTION 1: نمادها (Enamad)
              Mobile: Order 1 (Top)
              Desktop: Order 2 (Top Left)
             ========================================================================= */}
          <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center md:justify-end md:mb-0 pb-[18px] md:pb-0 md:pl-7 ">
            <div className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
              {/* <div className="w-[80px] h-[80px] relative bg-gray-50 rounded-xl border border-gray-100 p-2"> */}
              <Image
                src="/images/images/Namad.png"
                width={239}
                height={97}
                alt="Enamad"
                className="object-contain"
              />
              {/* </div> */}
              {/* اگر نماد دوم دارید */}
              {/* <div className="w-[80px] h-[80px] relative bg-gray-50 rounded-xl border border-gray-100 p-2">
                 <Image src="/img/samandehi.png" alt="Samandehi" fill className="object-contain" />
               </div> */}
            </div>
          </div>

          {/* =========================================================================
              SECTION 4 -> 1: برند و توضیحات (Brand)
              Mobile: Order 4 (Bottom - Last Item)
              Desktop: Order 1 (Top Right)
             ========================================================================= */}
          <div className="order-4 md:order-1 w-full md:w-1/2 flex flex-col md:flex-row pb-[21px] justify-center items-center text-center md:text-right  gap-y-[33px] gap-x-[25px] md:pr-[37px]">
            <Link href="#">
              <div className="relative w-[185px] h-[61px]">
                <Image
                  src="/images/logo/logo.png"
                  alt="PayaSafar"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="flex flex-col gap-y-[9px]">
              <h2 className="font-bold text-[#212E45] text-[16px] leading-7">
                پایاسفر؛ سفر از تمام پایانه‌ها
              </h2>
              <p className="text-[12px] font-medium text-[#4F6996] leading-7 max-w-[343px]">
                ما برند خود را از پایانه‌ها به پایاسفر تغییر داده‌ایم. با تکیه
                بر اعتماد و همراهی شما، ما به ارائه ی بهتر خدمات و تجربه های بی
                نظیر خود ادامه خواهیم داد.
              </p>
            </div>
          </div>

          {/* =========================================================================
              SECTION 2: نوار تماس و سوشال (Contact + Socials)
              Mobile: Order 2 (Below Enamad)
              Desktop: Order 3 (Full Width Middle)
             ========================================================================= */}
          <div className="order-2 md:order-3 w-full pt-[15px] pb-[22px] border-y border-[#ECECEC]">
            <div className=" flex flex-col lg:flex-row items-start justify-between pr-[26px] md:pr-8 lg:pr-14 ">
              {/* آدرس و تلفن */}
              <div className="flex flex-grow-0 flex-col md:flex-row md:items-center md:h-[50px] gap-y-5 items-start w-full lg:w-9/12">
                <div className="flex flex-1 items-center gap-1.5">
                  <MapPinIcon className="w-[17px] h-[17px] text-[#212E45]" />
                  <span className="text-[14px] font-semibold text-[#212E45] ml-2.5">
                    آدرس:
                  </span>
                  <span className=" text-[#4F6996] text-[12px] leading-7">
                    سنندج، پارک علم و فناوری، طبقه دوم
                  </span>
                </div>

                <div className="flex flex-1 items-center gap-1.5 cursor-pointer">
                  <PhoneIcon className="w-[17px] h-[17px] text-[#212E45]" />
                  <span className="text-[14px] font-semibold text-[#212E45] ml-2.5">
                    تلفن:
                  </span>
                  <Link
                    href="tel:09901091355"
                    className="text-[#4F6996] text-[12px] leading-7 hover:text-blue-600 hover:border-b hover:border-blue-600 transition-all"
                  >
                    09901091355
                  </Link>
                </div>
                {/* ساعت کاری (فقط یک متن ساده زیر باکس تماس) */}
                <div className="flex flex-2 items-center gap-1.5">
                  <ClockIcon className="w-[17px] h-[17px] text-[#212E45]" />
                  <span className="text-[14px] font-semibold text-[#212E45] ml-2.5">
                    ساعات کاری:
                  </span>
                  <span className=" text-[#4F6996] text-[12px] leading-7">
                    {" "}
                    از ۸ صبح تا ۱۰ شب | ایام تعطیل از ۹ صبح تا ۱۶
                  </span>
                </div>
              </div>

              <div className="flex flex-grow items-center gap-3 mt-8 lg:mt-0 w-full lg:w-auto justify-center lg:justify-end lg:ml-11">
                <SocialIcon href="https://wa.me/09901091355" type="whatsapp" />
                <SocialIcon href="https://t.me/09901091355" type="telegram" />
                {/* <SocialIcon href="https://instagram.com" type="instagram" /> */}
              </div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 3: شبکه لینک‌ها (Links Grid)
              Mobile: Order 3 (2 Columns: Support|Info then Pages|Coops)
              Desktop: Order 4 (4 Columns)
             ========================================================================= */}
          <div className="order-3 md:order-4 w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 mb-6 md:mb-0 px-6 pt-9 pb-[32px]">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.id} className="flex flex-col items-start">
                <h3 className="text-[16px] font-bold text-[#212E45] mb-[21px] relative inline-block">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-4 text-right w-full">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-[13px] md:text-[14px] text-[#4F6996] hover:text-blue-600 hover:font-medium transition-colors block"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-3 md:mt-[23px] text-center text-black text-[14px]">
          <p>
            کلیه حقوق این سرویس (وب‌سایت و وب اپلیکیشن‌های موبایل) محفوظ و متعلق
            به شرکت پایاسفر می‌باشد. نسخه 3.107.3
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const SocialIcon = ({
  href,
  type,
}: {
  href: string;
  type: "telegram" | "whatsapp" | "instagram";
}) => {
  const icons = {
    telegram: (
      <svg
        className="md:w-5 md:h-5 w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    whatsapp: (
      <svg
        className="md:w-5 md:h-5 w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.155.931 2.593.747 3.037.702.523-.053 1.758-.718 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
    instagram: (
      <svg
        className="md:w-5 md:h-5 w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  };

  return (
    <div className="w-[50px] h-[50px] md:w-[37px] md:h-[37px] bg-[#EBEFFB] rounded-full flex justify-center items-center">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[#335FD6] p-2 rounded-full transition-all duration-300 ${
          type === "telegram"
            ? "hover:text-blue-500 hover:bg-blue-50"
            : type === "whatsapp"
              ? "hover:text-green-500 hover:bg-green-50"
              : "hover:text-pink-600 hover:bg-pink-50"
        }`}
      >
        {icons[type]}
      </Link>
    </div>
  );
};

export default Footer;
