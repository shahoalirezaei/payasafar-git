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

interface SeatTicketCardProps {
  service: BusService;
  onSelect: (service: BusService) => void;
}

const SeatTicketCard: React.FC<SeatTicketCardProps> = ({
  service,
  onSelect,
}) => {
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
            <div className="flex text-[12px] font-semibold">
              <p className="text-[#335FD6]">۱۲ اردیبهشت ۱۴۰۴</p>
              <span className="font-light text-[#6C93E5]">یکشنبه</span>
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
      <div className="hidden md:flex w-full bg-white rounded-[10px] shadow-box pt-[24px] pr-[24px] pb-[10px] pl-[15px] relative overflow-hidden group hover:shadow-md transition-all">
        {/* RIGHT COLUMN: Ticket Info (75%) */}
        <div className="w-2/3 p-0 relative flex flex-col gap-[6.5px]">
          {/* Header */}
          <div className="flex text-[20px] font-semibold">
            <p className="text-[#335FD6]">۱۲ اردیبهشت ۱۴۰۴</p>
            <span className="font-light text-[#6C93E5]">یکشنبه</span>
          </div>

          {/* Body: Route Info */}
          <div className="pt-[21px]">
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
                <RouteVisualizer imgSrc="/images/images/blue-bus1.webp" rightClassName="text-[#FF9A0D]" leftClassName="text-[#FF9A0D]" />
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
          <div className="flex items-end justify-between gap-x-9 pb-[14px]  ml-[31px] text-[#7B7B7B]">
            <div className="">
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
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <Info className="w-[15px] h-[15px]" />
              <span className="block font-normal text-[13px] leading-7">
                توقف در هشتگرد، رودبار، رستم آباد
              </span>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: Price & Action (25%) */}
        <div className="w-1/3 bg-transparent flex flex-col pr-[14px]">
          <div className="pb-1 h-[40%] w-full flex justify-between items-start">
            <span className="font-medium text-[#4F6996] text-[14px]">قیمت هر صندلی:</span>
            {/* <span className="font-medium text-[#4F6996] text-[14px]">:(2) هر صندلی</span> */}
            <span className="text-[16px] font-medium text-black flex gap-2">۴۴۸,۰۰۰ <span className="text-[10px] text-[#4F6996]">تومان</span></span>

          </div>
          <div className="h-[40%] w-full flex flex-col justify-start items-start text-[#4F6996]">
            <span className="text-[12px] font-semibold">آموزش انتخاب صندلی:</span>
            <p className="font-medium text-[10px]">صندلی‌های موردنظر خود را انتخاب نمایید.</p>
            <p className="font-medium text-[10px]">صندلی‌ها با اولین کلیک انتخاب و با کلیک بعدی از انتخاب خارج می‌شوند.</p>
          </div>
        </div>
        <div className="absolute w-[1px] h-full bg-[#EDEDED] left-1/3 top-0"></div>
        <div className="absolute w-1/3 h-[1px] bg-[#EDEDED] left-0 top-[40%]"></div>
      </div>
    </>
  );
};

export default SeatTicketCard;
