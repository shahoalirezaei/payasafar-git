"use client";

import { useSearchStore } from "@/store/zustand/search.store";
import { BusFront } from "lucide-react";
import Image from "next/image";

export default function SearchTabs() {
  const { activeTab, setActiveTab } = useSearchStore();

  return (
    <div className="input-base h-[41px] py-[3px] px-[5px] w-[300px] flex justify-between">
      <button
        onClick={() => setActiveTab("bus")}
        className={`input-text font-medium text-xs flex-grow  cursor-pointer ${
          activeTab === "bus" ? "bg-orange px-4 py-1" : ""
        }`}
      >
        <span className="flex gap-2.5 items-center justify-center">
          {activeTab === "bus" ? (
            <BusFront className="w-[17px] h-[17px]" />
          ) : (
            ""
          )}
          بلیط اتوبوس
        </span>
      </button>

      <button
        onClick={() => setActiveTab("coop")}
        className={`input-text font-medium text-xs flex-grow  cursor-pointer ${
          activeTab === "coop" ? "bg-orange px-4 py-1" : ""
        }`}
      >
        <span className="flex gap-2.5 items-center justify-center">
          {activeTab === "coop" ? (
            <Image
              src="/icons/building.svg"
              alt="building"
              width={15}
              height={15}
              priority
              className=" text-white"
            />
          ) : (
            ""
          )}
          تعاونی ها
        </span>
      </button>

      <button
        onClick={() => setActiveTab("terminal")}
        className={`input-text font-medium text-xs flex-grow  cursor-pointer ${
          activeTab === "terminal" ? "bg-orange px-4 py-1" : ""
        }`}
      >
        <span className="flex gap-2.5 items-center justify-center">
          {activeTab === "terminal" ? (
            <BusFront className="w-[17px] h-[17px]" />
          ) : (
            ""
          )}
          ترمینال‌ها
        </span>
      </button>
    </div>
  );
}
