import RouteVisualizer from "@/components/utils/RouteVisualizer";
import Image from "next/image";
import React from "react";

function ChangeDirectionContent() {
  return (
    <div className="flex flex-col w-[323px] mt-3 gap-7 mx-auto">
      <RouteVisualizer
        imgSrc="/images/images/blue-bus1.webp"
        leftClassName="text-[#FF9A0D]"
        rightClassName="text-[#FF9A0D]"
      />
      <div className=" relative input-base mb-[46px] flex justify-between">
        {/* Divider */}
        <span
          className="
                    absolute left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2
                    h-[41px] w-px
                    bg-gray-400
                  "
        />
        {/* Icon Switch */}
        <div
          className="absolute left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2 bg-orange p-0.5 w-[25px] h-[25px]"
        >
          <Image
            src="/images/icons/icon-switch.svg"
            width={17}
            height={17}
            alt="icon-switch"
          ></Image>
        </div>
        {/* مبدا */}
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder=" "
            className="
                    peer
                    w-full pl-3 pr-5
                    text-sm
                    rounded-xl
                    outline-none
                    border-none
                    bg-inherit
                    text-black
                    placeholder-transparent
                  "
          />

          <div
            className="
                    floating-placeholder
                    pointer-events-none
                    absolute right-3 top-1/2 -translate-y-1/2
                    flex gap-1
                    text-gray-400 text-xs
                    transition-opacity
                  "
          >
            <span className="font-semibold">مبدا</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>
        </div>

        {/* مقصد */}
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder=" "
            className="
                    peer
                    w-full
                    bg-inherit
                    text-sm
                    rounded-xl
                    outline-none
                    border-none
                    text-gray-400
                    focus:text-black
                    pl-3 mr-2.5 pr-5
                  "
          />

          <div
            className="
                    floating-placeholder
                    pointer-events-none
                    absolute right-3 top-1/2 -translate-y-1/2
                    flex gap-1 pr-5
                    text-gray-400 text-xs
                    transition-opacity
                  "
          >
            <span className="font-semibold">مقصد</span>
            <span className="font-light">(شهر، پایانه)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeDirectionContent;
