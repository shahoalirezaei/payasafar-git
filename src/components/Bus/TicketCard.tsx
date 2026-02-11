"use client";

import React, { useState } from "react";
import Image from "next/image";
import Icon from "../ui/Icon";
import RouteVisualizer from "../utils/RouteVisualizer";
import { Info, ChevronDown } from "lucide-react";

// --- Types ---
// Define or import this from your types definition file
export interface BusService {
  id: string | number;
  company: string;
  companyLogo?: string; // Optional, fallback handled in component
  type: string;
  time: string;
  boardingPoint: {
    city: string;
    terminal?: string;
  };
  destCity: string;
  fullPrice: number;
  availableSeats: number;
}

interface TicketCardProps {
  service: BusService;
  onSelect: (service: BusService) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ service, onSelect }) => {
  const [selectBoxSeatIsOpen, setSelectBoxSeatIsOpen] = useState(false);
  return (
    <>
      {/* ========================================
        MOBILE VIEW (Visible on small screens)
        ========================================
      */}
      <div className="block md:hidden  bg-white rounded-[10px] shadow-box mx-[18px]">
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

            {/* Price (Top Left) */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-black text-[12px] leading-7">
                  {service.fullPrice}
                </span>
                <span className="text-[5px] text-[#737373] font-semibold">
                  تومان
                </span>
              </div>
              <span
                className={`${service.availableSeats > 9 ? "text-[#335FD6]" : "text-[#FF0000]"} font-semibold text-[8px] -mt-4`}
              >
                {service.availableSeats} صندلی باقی مانده
              </span>
            </div>
          </div>

          {/* Route Section */}
          <div className="flex items-center justify-between mt-2 gap-2.5  pr-[26px] pl-[17px]">
            {/* Origin Time */}
            <div className="text-right">
              <span className="text-[10px] text-[#335FD6] font-semibold block truncate">
                {service.boardingPoint.terminal}
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
                {service.time}
              </span>
            </div>
          </div>
        </div>

        {/* more info */}
        <div className="mt-2 flex justify-between items-center border-t h-[45px] border-t-[#F5F5F5] text-[#7B7B7B]">
          <div className="flex items-center justify-start gap-x-2 pr-[13px]">
            <Icon
              name="solar--bus-linear"
              size={14}
              className="text-[#7B7B7B]"
            />
            <span className="block font-normal text-[8px] leading-7">
              {service.type}
            </span>
          </div>
          <div className="flex items-center justify-end gap-x-2 pl-[17px]">
            <Info className="w-[14px] h-[14px]" />
            <span className="block font-normal text-[8px] leading-7">
              توقف در هشتگرد، رودبار، رستم آباد
            </span>
          </div>
        </div>
      </div>

      {/* ========================================
        DESKTOP VIEW (Visible on medium+ screens)
        ========================================
      */}
      <div className="hidden md:flex w-full bg-white rounded-[10px] shadow-box pt-[29px] pr-[25px] pb-[22px] pl-10 relative overflow-hidden group hover:shadow-md transition-all">
        {/* RIGHT COLUMN: Ticket Info (75%) */}
        <div
          className="w-3/4 p-0 relative border-l border-dashed border-[#CDCDCD] flex flex-col gap-[19px]"
          style={{
            borderLeft: "1px dashed #CDCDCD",
            backgroundImage:
              "linear-gradient(to bottom, #CDCDCD 50%, rgba(255,255,255,0) 0%)",
            backgroundPosition: "left",
            backgroundSize: "1px 12px",
            backgroundRepeat: "repeat-y",
            border: "none",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative w-[52px] h-[39px]">
                <Image
                  src={service.companyLogo || "/images/companies/c_5.webp"}
                  alt={service.company}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-bold text-[#445C9D] text-[20px] leading-7">
                  {service.company}
                </span>
              </div>
            </div>
          </div>

          {/* Body: Route Info */}
          <div className="py-5">
            <div className="flex items-center gap-x-4">
              {/* Origin */}
              <div className="text-center">
                <span className="text-[16px] font-semibold leading-7 text-[#335FD6]">
                  {service.boardingPoint.terminal}
                </span>
                <span className="block text-[16px] font-bold text-[#4085FF] mb-1">
                  {service.time}
                </span>
              </div>

              {/* Route Visualizer */}
              <div className="w-[298px]">
                <RouteVisualizer imgSrc="/images/images/blue-bus1.webp" />
              </div>

              {/* Destination */}
              <div className="text-center">
                <span className="text-[16px] font-semibold leading-7 text-[#335FD6]">
                  {service.destCity}
                </span>
                <span className="block text-[16px] font-bold text-[#4085FF] mb-1 text-center">
                  {service.time}
                </span>
              </div>
            </div>

            
          </div>
          {/* more info */}
            <div className="flex items-center gap-x-9 mt-[2px] h-[28px]  text-[#7B7B7B]">
              <div className="flex items-center justify-start h-full gap-x-2">
                <Icon
                  name="solar--bus-linear"
                  size={17}
                  className="text-[#7B7B7B]"
                />
                <span className="block font-normal text-[13px] leading-7">
                  {service.type}
                </span>
              </div>
              <div className="flex items-center justify-end gap-x-2 pl-[17px]">
                <Info className="w-[15px] h-[15px]" />
                <span className="block font-normal text-[13px] leading-7">
                  توقف در هشتگرد، رودبار، رستم آباد
                </span>
              </div>
              <div className="relative inline-block text-right">
                {/* Trigger Button */}
                <button
                  onClick={() => setSelectBoxSeatIsOpen(!selectBoxSeatIsOpen)}
                  className="flex items-center gap-x-2 px-1  text-[#7B7B7B] hover:text-gray-900 transition-colors duration-200"
                >
                  {/* متن وضعیت صندلی */}
                  <span className="block font-normal text-[13px] leading-7">
                    وضعیت صندلی
                  </span>

                  {/* آیکون فلش با انیمیشن چرخش */}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${selectBoxSeatIsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu (موقتاً برای نمایش استایل) */}
                {selectBoxSeatIsOpen && (
                  <div className="absolute right-0 bottom-full mb-1 w-52 bg-white border shadow-soft-blue border-gray-200 rounded-lg  z-[100] overflow-hidden">
                    <ul className="py-1">
                      <li className="px-4 py-2 text-[12px] text-gray-700 hover:bg-blue-50 cursor-pointer text-right">
                        انتخاب شده
                      </li>
                      <li className="px-4 py-2 text-[12px] text-gray-700 hover:bg-blue-50 cursor-pointer text-right">
                        خالی
                      </li>
                      <li className="px-4 py-2 text-[12px] text-gray-700 hover:bg-blue-50 cursor-pointer text-right">
                        رزرو شده
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

          {/* Punch Holes (Absolute positioning relative to this column) */}
          {/* Top Hole */}
          <div className="absolute w-[80px] h-[60px] z-20 -left-[40px] -top-[60px] bg-[#f9faff] rounded-full"></div>
          {/* Bottom Hole */}
          <div className="absolute w-[80px] h-[60px] z-20 -left-[40px] -bottom-[60px] bg-[#f9faff] rounded-full"></div>
        </div>

        {/* LEFT COLUMN: Price & Action (25%) */}
        <div className="w-1/4 bg-transparent flex flex-col items-center justify-center text-center gap-[10px]">
          <div className="flex items-center justify-center gap-[5px]">
            <span className="block text-[24px] font-bold text-black">
              {service.fullPrice}
            </span>
            <span className="text-[10px] font-semibold text-[#737373]">تومان</span>
          </div>

          <button
            onClick={() => onSelect(service)}
            className="btn-blue text-[14px] !w-[134px] px-2.5 flex items-center"
          >
            <Icon name="mingcute--seat-fill" size={20} fill-current  />
            انتخاب صندلی
          </button>

          <span
                className={`${service.availableSeats > 9 ? "text-[#335FD6]" : "text-[#FF0000]"} font-semibold text-[12px] mt-1`}
              >
                {service.availableSeats} صندلی باقی مانده
              </span>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
