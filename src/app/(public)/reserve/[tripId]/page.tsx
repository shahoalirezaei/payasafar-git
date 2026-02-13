"use client";
import React from "react";
import BusLayout from "@/components/Seat/BusLayout";
import SeatTicketCard from "@/components/Seat/SeatTicketCard";
import { BusService } from "@/types/bus";
import ProgressStepper from "@/components/Seat/ProgressStepper";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import PassengerForm from "@/components/Seat/PassengerForm";
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
    <div className="mt-6 flex gap-[20px] justify-center items-start">
      <div className="flex flex-col gap-4 flex-1 max-w-[853px]">

      <ProgressStepper currentStep={currentStep} />
      <SeatTicketCard
        
        service={service}
        onSelect={(s) => console.log("Selected:", s.id)}
      />
      <PassengerForm />
      </div >
      <div className="w-full lg:w-fit shrink-0 flex justify-center">
        <BusLayout />
      </div>
    </div>
  );
}

export default ReserveResultPage;
