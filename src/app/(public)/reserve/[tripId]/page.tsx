"use client";
import React from "react";
import BusLayout from "@/components/Seat/BusLayout";
import SeatTicketCard from "@/components/Seat/SeatTicketCard";
import { BusService } from "@/types/bus";
import ProgressStepper from "@/components/Seat/ProgressStepper";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import PassengerForm from "@/components/Seat/PassengerForm";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
// دیتای ساختگی
const service: BusService ={
    id: "1",
    company: "رویال سفر ایرانیان",
    companyLogo: "/images/companies/c_5.webp",
    type: "VIP درسا تخت شو ۲۵ نفره",
    fullPrice: 448000,
    availableSeats: 9,
    time: "22:30",
    boardingPoint: { city: "تهران", terminal: "پایانه شمال" },
    destCity: "رشت",
  }


function ReserveResultPage() {
  const { currentStep, setStep } = useBookingStore();
  return (
    <div className="mt-6 gap-[20px] flex flex-col lg:flex-row justify-center items-start">
      <div className="flex flex-col w-full gap-4 md:flex-1 md:max-w-[853px] min-w-0 md:mx-auto">

      <ProgressStepper currentStep={currentStep} />
      <SeatTicketCard
        
        service={service}
        onSelect={(s) => console.log("Selected:", s.id)}
      />
      <PassengerForm />
      <div className="flex gap-5 mt-[10px]">
        <div>
          <Link href="#" className="py-4 h-[43px] w-[224px] big-btn-blue shadow-box text-white rounded-[10px] font-semibold flex justify-center items-center gap-1.5  active:scale-[0.98] transition-transform" >
          <Icon name="solar--arrow-left-broken" className="rotate-180" />
          ادامه فرایند
          </Link>
        </div>
        <div>
          <Link href="#" className="py-4 bg-back-gradient shadow-box h-[43px] w-[140px] text-white rounded-[10px] font-semibold flex justify-center items-center gap-1.5  active:scale-[0.98] transition-transform" >
          بازگشت 
          <Icon name="solar--arrow-left-broken" className="" />
          </Link>
        </div>
      </div>
      </div >
      <div className="w-full lg:w-fit shrink-0 flex justify-center">
        <BusLayout />
      </div>
    </div>
  );
}

export default ReserveResultPage;
