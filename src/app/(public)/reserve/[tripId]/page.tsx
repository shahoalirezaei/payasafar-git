"use client";



import React, { useEffect, useRef, useState, useMemo } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { tripService } from "@/services/tripService";

import { ServiceDetail } from "@/types/trip.types";



// کامپوننت‌های چیدمان

import BusLayoutAT1 from "@/components/Seat/BusLayoutAT1";

import BusLayoutAT2 from "@/components/Seat/BusLayoutAT2";



import SeatTicketCard from "@/components/Seat/SeatTicketCard";

import ProgressStepper from "@/components/Seat/ProgressStepper";

import PassengerForm from "@/components/Seat/PassengerForm";

import MobileActionFooter from "@/components/Seat/MobileActionFooter";

import { useBookingStore } from "@/store/zustand/useBookingStore";

import { BusService } from "@/types/bus";



// دیتای موک برای نمایش اولیه (اسکلت/لودینگ)

const serviceMock: BusService = {

  id: "1",

  company: "در حال دریافت اطلاعات...",

  companyLogo: "/images/companies/c_5.webp", // یک عکس پیش‌فرض قرار دهید

  type: "...",

  fullPrice: 0,

  availableSeats: 0,

  time: "--:--",

  boardingPoint: { city: "-", terminal: "-" },

  destCity: "-",

};



export default function ReserveResultPage() {

  const { currentStep, isMobileFormOpen } = useBookingStore();

  const formRef = useRef<HTMLDivElement>(null);



  const params = useParams();

  const searchParams = useSearchParams();

 

  // پارامترهای URL

  const rawTripId = params.tripId as string;

  const srcCode = searchParams.get('src');

  const destCode = searchParams.get('dest');



  // استیت‌ها

  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(null);

  const [loading, setLoading] = useState(true);

  const [currentApiType, setCurrentApiType] = useState<number | null>(null);



  useEffect(() => {

    if (rawTripId && srcCode && destCode) {

      const parts = rawTripId.split('__');

      if (parts.length < 2) {

        setLoading(false);

        return;

      }



      const realId = parts[0];

      const apiType = parseInt(parts[1], 10);

      let token = parts[2];

      if (token === 'na' || !token) token = '';



      setCurrentApiType(apiType);



      tripService.getServiceDetail({

        id: realId,

        apiType: apiType,

        token: token,

        srcCode: srcCode,

        destCode: destCode

      })

      .then((data) => setServiceDetail(data))

      .catch((err) => console.error("❌ API FAILURE:", err))

      .finally(() => setLoading(false));



    } else {

      setLoading(false);

    }

  }, [rawTripId, srcCode, destCode]);





  // اسکرول اتوماتیک

  useEffect(() => {

    if (isMobileFormOpen && formRef.current) {

      setTimeout(() => {

        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      }, 100);

    }

  }, [isMobileFormOpen]);





  // 🚀 تبدیل دیتای بک‌اند به فرمت قابل فهم برای SeatTicketCard

  const activeService: BusService = useMemo(() => {

    // اگر هنوز دیتا نیومده، همون دیتای موک رو نشون بده

    if (!serviceDetail || !serviceDetail.bussEntity) return serviceMock;



    const entity = serviceDetail.bussEntity;



    // استخراج ساعت از departureDate (مثلاً از "2026-02-18T15:00:00" فقط "15:00" رو برمیداره)

    let time = "--:--";

    if (entity.departureDate && entity.departureDate.includes("T")) {

      time = entity.departureDate.split("T")[1].substring(0, 5);

    }



    return {

      id: entity.id,

      company: entity.company,

      // برای لوگو می‌تونید بعداً تابعی بنویسید که بر اساس companyCode عکس مناسب رو لود کنه

      companyLogo: "/images/companies/c_5.webp",

      type: entity.type,

      // اگر fullPrice صفر بود (مثل دیتای AT2)، از price استفاده کن

      fullPrice: entity.fullPrice > 0 ? entity.fullPrice : entity.price,

      availableSeats: entity.availableSeats,

      time: time,

      boardingPoint: entity.boardingPoint,

      // شهر مقصد رو از آرایه droppingPoints برمیداریم

      destCity: entity.droppingPoints?.[0]?.city || destCode || "نامشخص",

    };

  }, [serviceDetail, destCode]);





  return (

    <div className="relative pb-32 lg:pb-0 px-4 lg:px-0">

      <div className="mt-6 gap-[20px] flex flex-col lg:flex-row justify-center items-start">

       

        {/* ستون راست */}

        <div className="flex flex-col w-full gap-4 md:flex-1 md:max-w-[853px] min-w-0 md:mx-auto order-1">

          <ProgressStepper currentStep={currentStep} />

         

          {/* 👇 ارسال اطلاعات واقعی و پویا به کارت */}

          <SeatTicketCard

            onSelect={() => {}}

            service={activeService}

          />

         

          <div ref={formRef} className={`${isMobileFormOpen ? 'block' : 'hidden lg:block'}`}>

            <PassengerForm />

          </div>

          <div className="hidden lg:flex justify-normal gap-10 mt-8 h-[43px]" >

          <button className="big-btn-blue text-white shadow-box h-full">

            ادامه فرایند

          </button>

          <button className="bg-back-gradient ">

            بازگشت

          </button>



          </div>

        </div>



        {/* ستون چپ: اتوبوس */}

        <div className="w-full lg:w-fit shrink-0 flex justify-center mb-4 lg:mb-0 order-2">

          <div className="w-full flex justify-center">

           

            {loading && (

                <div className="p-10 text-gray-400 bg-white rounded-2xl border">

                    در حال دریافت چیدمان...

                </div>

            )}



            {!loading && serviceDetail && (

                <>

                    {(currentApiType === 1 || currentApiType === 5) && serviceDetail.chairLayout && (

                         <BusLayoutAT1

                            chairLayout={serviceDetail.chairLayout}

                            isLoading={false}

                         />

                    )}



                    {currentApiType === 2 && (

                         <BusLayoutAT2

                            serviceDetail={serviceDetail}

                            isLoading={false}

                         />

                    )}



                    {!([1, 2, 5].includes(currentApiType || 0)) && (

                        <div className="text-red-500 bg-white p-4 rounded border">

                            چیدمان تایپ {currentApiType} پشتیبانی نمی‌شود.

                        </div>

                    )}

                </>

            )}



          </div>

        </div>

       



      </div>

     

      {/* 👇 ارسال قیمت واقعی بلیت به فوتر موبایل برای ضرب شدن در تعداد صندلی */}

      <MobileActionFooter pricePerSeat={activeService.fullPrice} />

    </div>

  );

}