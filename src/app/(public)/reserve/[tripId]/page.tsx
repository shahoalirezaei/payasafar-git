"use client";
import React from "react";
import BusLayout from "@/components/Seat/BusLayout";
import SeatTicketCard from "@/components/Seat/SeatTicketCard";
import { BusService } from "@/types/bus";
import ProgressStepper from "@/components/Seat/ProgressStepper";
import { useBookingStore } from "@/store/zustand/useBookingStore";
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
    <div className="mt-6">
      <ProgressStepper currentStep={currentStep} />
      <SeatTicketCard
        
        service={service}
        onSelect={(s) => console.log("Selected:", s.id)}
      />
      <BusLayout />
    </div>
  );
}

export default ReserveResultPage;
