"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Icon from "../ui/Icon";
import RouteVisualizer from "../utils/RouteVisualizer";
import { Info } from "lucide-react";
import moment from "jalali-moment";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";
import { useBookingStore } from "@/store/zustand/useBookingStore";

// --- Types ---
export interface BusService {
  id: string | number;
  company: string;
  companyLogo?: string;
  type: string;
  time: string;
  boardingPoint: {
    city: string;
    terminal?: string;
  };
  destCity: string;
  fullPrice: number;
  availableSeats: number;
  stops?: string; // 👈 اضافه شد
}

interface SeatTicketCardProps {
  service: BusService;
  onSelect: (service: BusService) => void;
}

// تابع کمکی برای جدا کردن سه رقم قیمت
const formatPrice = (price: number) => {
  if (!price) return "---,---";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SeatTicketCard: React.FC<SeatTicketCardProps> = ({
  service,
  onSelect,
}) => {
  const { selectedSeats } = useBookingStore();
  const displayTotalPrice = formatPrice((service.fullPrice / 10) * selectedSeats.length);
  const { selectedDate } = useCalendarStore();

  const { dateText, dayOfWeek } = useMemo(() => {
    if (!selectedDate) return { dateText: "تاریخ نامشخص", dayOfWeek: "" };

    try {
      moment.locale("fa");
      const m = moment(selectedDate);
      return {
        dateText: m.format("jDD jMMMM jYYYY"),
        dayOfWeek: m.format("dddd"),
      };
    } catch (e) {
      return { dateText: "تاریخ نامعتبر", dayOfWeek: "" };
    }
  }, [selectedDate]);

  const displayPrice = formatPrice(service.fullPrice);

  // 👈 تابع کوتاه کردن متن (مشابه TicketCard)
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      {/* ========================================
        MOBILE VIEW (Visible on small screens)
        ========================================
      */}
      <div className="block md:hidden w-full bg-white rounded-[10px] shadow-box md:mx-[18px]">
        <div className="pt-4 pb-[10px]">
          {/* Header: Company Info & Price */}
          <div className="flex justify-between pr-[19px] pl-[17px]">
            <div className="flex items-center justify-start gap-2">
              {/* Logo */}
              <div className="relative w-[26px] h-[17px] shrink-0">
                <Image
                  src={service.companyLogo || "/images/companies/c_5.webp"}
                  alt={service.company}
                  fill
                  className="object-contain"
                />
              </div>
              {/* Info */}
              <div>
                <span className="font-bold text-[10px] text-[#445C9D] leading-7">
                  {service.company}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="flex text-[12px] font-semibold gap-1">
              <p className="text-[#335FD6]">{dateText}</p>
              <span className="font-light text-[#6C93E5]">{dayOfWeek}</span>
            </div>
          </div>

          {/* Route Section */}
          <div className="flex items-center justify-between mt-2 gap-2.5  pr-[26px] pl-[17px]">
            {/* Origin Time */}
            <div className="text-right">
              <span className="text-[10px] text-[#335FD6] font-semibold block truncate">
                {service.boardingPoint.terminal || service.boardingPoint.city}
              </span>
              <span className="block font-bold text-[#4085FF] text-[10px] leading-7 text-center">
                {service.time}
              </span>
            </div>

            {/* Visualizer (Center) */}
            <div className="w-4/5 px-2 flex justify-center">
              <RouteVisualizer
                imgSrc="/images/images/blue-bus1.webp"
                leftClassName="text-[#FF9A0D]"
                rightClassName="text-[#FF9A0D]"
              />
            </div>

            {/* Destination Time */}
            <div className="text-left ">
              <span className="text-[10px] text-[#335FD6] font-semibold block truncate">
                {service.destCity}
              </span>
              <span className="block font-bold text-[#4085FF] text-[10px] leading-7 text-center">
                --:--
              </span>
            </div>
          </div>
        </div>

        {/* more info */}
        <div className="mt-2 flex justify-between items-center border-t h-[45px] border-t-[#F5F5F5] text-[#7B7B7B]">
          <div className="flex items-center justify-start gap-x-2 pr-[13px] overflow-hidden">
            <Icon
              name="solar--bus-linear"
              size={14}
              className="text-[#7B7B7B] shrink-0"
            />
            <span
              className="block font-normal text-[8px] leading-7 truncate max-w-[120px]"
              title={service.type}
            >
              {truncateText(service.type, 35)}
            </span>
          </div>
          <div className="flex items-center justify-end gap-x-2 pl-[17px] shrink-0">
            <Info className="w-[14px] h-[14px]" />
            {/* 👈 داینامیک شدن مقاصد توقف با منطق TicketCard */}
            <span className="block font-normal text-[8px] leading-7 truncate max-w-[150px]">
              {service.stops ? `توقف در: ${service.stops}` : "بدون توقف"}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================
        DESKTOP VIEW (Visible on medium+ screens)
        ========================================
      */}
      <div className="hidden md:flex w-full bg-white rounded-[10px] shadow-box pt-[24px] pr-[24px] pb-[10px] pl-[15px] relative overflow-hidden group hover:shadow-md transition-all">
        {/* RIGHT COLUMN: Ticket Info (75%) */}
        <div className="w-2/3 p-0 relative flex flex-col gap-[6.5px]">
          {/* Header */}
          <div className="flex text-[20px] font-semibold gap-1.5">
            <p className="text-[#335FD6]">{dateText}</p>
            <span className="font-light text-[#6C93E5]">{dayOfWeek}</span>
          </div>

          {/* Body: Route Info */}
          <div className="pt-[21px]">
            <div className="flex items-center gap-x-4">
              {/* Origin */}
              <div className="text-center w-[100px]">
                <span className="text-[16px] font-semibold leading-7 text-[#335FD6] block truncate">
                  {service.boardingPoint.terminal || service.boardingPoint.city}
                </span>
                <span className="block text-[16px] font-bold text-[#4085FF] mb-1">
                  {service.time}
                </span>
              </div>

              {/* Route Visualizer */}
              <div className="flex-1 max-w-[298px]">
                <RouteVisualizer
                  imgSrc="/images/images/blue-bus1.webp"
                  rightClassName="text-[#FF9A0D]"
                  leftClassName="text-[#FF9A0D]"
                />
              </div>

              {/* Destination */}
              <div className="text-center w-[100px]">
                <span className="text-[16px] font-semibold leading-7 text-[#335FD6] block truncate">
                  {service.destCity}
                </span>
                <span className="block text-[16px] font-bold text-[#4085FF] mb-1 text-center">
                  --:--
                </span>
              </div>
            </div>
          </div>
          {/* more info */}
          <div className="flex items-end justify-between gap-x-9 pb-[14px]  ml-[31px] text-[#7B7B7B]">
            <div className="flex-1">
              <div className="flex items-center justify-start gap-2 mb-1">
                {/* Logo */}
                <div className="relative w-[26px] h-[17px] shrink-0">
                  <Image
                    src={service.companyLogo || "/images/companies/c_5.webp"}
                    alt={service.company}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Info */}
                <div>
                  <span className="font-bold text-[10px] text-[#445C9D] leading-7">
                    {service.company}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-start h-full gap-x-2">
                <Icon
                  name="solar--bus-linear"
                  size={17}
                  className="text-[#7B7B7B] shrink-0"
                />
                <span
                  className="block font-normal text-[13px] leading-7 truncate max-w-[250px]"
                  title={service.type}
                >
                  {truncateText(service.type, 35)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-2 shrink-0">
              <Info className="w-[15px] h-[15px]" />
              {/* 👈 داینامیک شدن مقاصد توقف */}
              <span className="block font-normal text-[13px] leading-7 truncate max-w-[300px]">
                {service.stops
                  ? `توقف در: ${service.stops}`
                  : "سفر مستقیم (بدون توقف)"}
              </span>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: Price & Action (25%) */}
        <div className="w-1/3 bg-transparent flex flex-col pr-[14px]">
          <div className="flex h-[40%] flex-col justify-start items-start">
            <div className="pb-1  w-full flex justify-between items-start">
              {selectedSeats.length <= 0 ? (
                <span className="font-medium text-[#4F6996] text-[14px]">
                  قیمت هر صندلی:
                </span>
              ) : (
                <span className="font-medium text-[#4F6996] text-[14px]">
                  هر صندلی ({selectedSeats.length}): 
                </span>
              )}
              <span className="text-[16px] font-medium text-black flex gap-1 items-baseline">
                {displayPrice}{" "}
                <span className="text-[10px] text-[#4F6996]">تومان</span>
              </span>
            </div>
            {selectedSeats.length > 0 && (
              <div className="pb-1  w-full flex justify-between items-start">
                <span className="font-medium text-[#4F6996] text-[14px]">
                  مجموع:
                </span>
                <span className="text-[16px] font-medium text-[#000000] flex gap-1 items-baseline">
                  {displayTotalPrice}{" "}
                  <span className="text-[10px] text-[#4F6996]">تومان</span>
                </span>
              </div>
            )}
          </div>

          <div className="h-[40%] w-full flex flex-col justify-start items-start text-[#4F6996] mt-4">
            <span className="text-[12px] font-semibold mb-1">
              آموزش انتخاب صندلی:
            </span>
            <p className="font-medium text-[10px] leading-relaxed">
              صندلی‌های موردنظر خود را انتخاب نمایید.
            </p>
            <p className="font-medium text-[10px] leading-relaxed mt-1">
              صندلی‌ها با اولین کلیک انتخاب و با کلیک بعدی از انتخاب خارج
              می‌شوند.
            </p>
          </div>
        </div>

        {/* Borders */}
        <div className="absolute w-[1px] h-full bg-[#EDEDED] left-1/3 top-0"></div>
        <div className="absolute w-1/3 h-[1px] bg-[#EDEDED] left-0 top-[40%]"></div>
      </div>
    </>
  );
};

export default SeatTicketCard;


