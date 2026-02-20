"use client";
import React from "react";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import Icon from "@/components/ui/Icon";
import { SeatIcon } from "../ui/StepperIcons";

interface MobileActionFooterProps {
  pricePerSeat: number;
  onContinueProcess?: () => void | Promise<void>;
  isSubmitting?: boolean;
  submitError?: string;
}

const MobileActionFooter = ({
  pricePerSeat,
  onContinueProcess,
  isSubmitting = false,
  submitError = "",
}: MobileActionFooterProps) => {
  const { selectedSeats, currentStep, setStep , isMobileFormOpen, setMobileFormOpen } =
    useBookingStore();

  const totalPrice = selectedSeats.length * pricePerSeat;

  if (selectedSeats.length === 0) return null;

  const handlePassergerFormOpen = () => {
    setMobileFormOpen(true);
    setStep(currentStep + 1); // رفتن به مرحله بعد (مشخصات)
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-50 rounded-t-[24px] p-5 pb-8 border-t border-gray-50">
      {!isMobileFormOpen ? (
        /* ================================================= */
        /* حالت اول: نمایش صندلی و قیمت (قبل از زدن دکمه) */
        /* ================================================= */
        <div className="flex flex-col gap-5">
          {/* ردیف اطلاعات: چون RTL هستی، اولین بچه میره راست، دومی میره چپ */}
          <div className="flex justify-between items-start px-9">
            {/* آیتم اول: لیست صندلی‌ها (سمت راست قرار می‌گیرد) */}
            <div className="flex flex-col gap-1.5 items-start">
              {selectedSeats.map((seat) => (
                <div
                  key={seat}
                  className="flex items-center gap-1.5 text-[#335FD6]"
                >
                  {/* آیکون و متن */}
                  <SeatIcon className="w-5 h-5 fill-current" />
                  <span className="text-[13px] font-bold">صندلی {seat}</span>
                </div>
              ))}
            </div>

            {/* آیتم دوم: قیمت‌ها (سمت چپ قرار می‌گیرد) */}
            <div className="flex flex-col gap-2 items-between w-1/2">
              {/* قیمت واحد */}
              <div className="flex items-center justify-between gap-1 text-[10px] opacity-80">
                <span className="text-gray-950 font-semibold">
                  هر صندلی ({selectedSeats.length}):
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[12px] text-gray-950">
                    {pricePerSeat.toLocaleString()}
                  </span>
                  <span className="text-[5px] text-[#737373] font-semibold">تومان</span>
                </div>
              </div>

              {/* قیمت کل */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[12px] text-gray-800 font-semibold">
                  مجموع:
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-semibold text-gray-800">
                    {totalPrice.toLocaleString()}
                  </span>
                  <span className="text-[5px] text-[#737373] font-semibold">تومان</span>
                </div>
              </div>
            </div>
          </div>

          {/* دکمه پایین */}
          <button
            onClick={handlePassergerFormOpen}
            className="w-full big-btn-blue h-[58px] rounded-[10px] text-white font-semibold text-[20px] flex items-center justify-center gap-2 shadow-box  active:scale-[0.98] transition-transform"
          >
            <Icon
              name="solar--arrow-left-broken"
              className="rotate-180 w-6 h-6"
            />
            وارد کردن مشخصات مسافرین
          </button>
        </div>
      ) : (
        /* ================================================= */
        /* حالت دوم: فقط دکمه ادامه (بعد از زدن دکمه) */
        /* ================================================= */
        <div className="w-full flex flex-col">
          <button
            type="button"
            onClick={onContinueProcess}
            disabled={isSubmitting}
            className="w-full big-btn-blue h-[58px] rounded-[10px] text-white font-semibold text-[20px] flex items-center justify-center gap-2 shadow-box active:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
          >
                <Icon
                name="solar--arrow-left-broken"
                className="rotate-180 w-6 h-6"
                size={26}
                />
            {isSubmitting ? "در حال ارسال..." : "ادامه فرآیند"}
          </button>
          {submitError && (
            <span className="text-red-500 text-xs mt-2 px-1">{submitError}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileActionFooter;
