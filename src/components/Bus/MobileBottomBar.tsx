// src/components/Bus/MobileBottomBar.tsx
"use client"
import React from "react";
import Icon from "../ui/Icon";
import Image from "next/image";
import { Ellipsis, Funnel } from "lucide-react";
import { useDrawerStore } from "@/store/zustand/useDrawerStore";

function MobileBottomBar() {
    const openDrawer = useDrawerStore((state) => state.openDrawer);
  return (
    <div className="lg:hidden w-full">
      <div className=" fixed w-full grid grid-cols-3 bottom-0 z-20 right-0  bg-white border-t border-t-[#EDEDED] opacity-100">
        <button onClick={() => openDrawer('CHANGE_DIRECTION', false)} className="cursor-pointer justify-center items-center flex gap-[5px] border-l pt-7 pb-10 px-[26px] border-l-[#EDEDED]">
          <div className="bg-orange p-0.5 w-[25px] h-[25px] flex items-center justify-center">
            <Image
              src="/images/icons/icon-switch.svg"
              width={17}
              height={17}
              alt="icon-switch"
            ></Image>
          </div>
          <span className="font-normal text-[14px] text-black">تغییر مسیر</span>
        </button>
        <button onClick={() => openDrawer('TRIP_DETAILS', true)} className="cursor-pointer justify-center items-center flex gap-[5px] border-l py-8 px-[26px] border-l-[#EDEDED]">
          <div className="bg-orange p-0.5 w-[25px] h-[25px] flex items-center justify-center text-white">
            <Ellipsis size={17} />
          </div>
          <span className="font-normal text-[14px] text-black">جزئیات مسیر</span>
        </button>
        <button onClick={() => openDrawer('FILTER', true)} className="cursor-pointer justify-center items-center flex gap-[5px] border-l py-8 px-[26px] border-l-[#EDEDED]">
          <div className="bg-orange p-0.5 w-[25px] h-[25px] flex items-center justify-center">
       
            <Funnel size={10} strokeWidth={2} absoluteStrokeWidth />
          </div>
          <span className="font-normal text-[14px] text-black">اعمال فیلتر</span>
        </button>
      </div>
    </div>
  );
}

export default MobileBottomBar;
