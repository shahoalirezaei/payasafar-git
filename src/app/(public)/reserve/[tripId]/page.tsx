// src/app/(public)/reserve/[tripId]/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { tripService } from "@/services/tripService";
import { ServiceDetail } from "@/types/trip.types";
import { buyService, SaleTicketRequest } from "@/services/buyService";
import jalaliMoment from "jalali-moment";

// کامپوننت‌های چیدمان
import BusLayoutAT1 from "@/components/Seat/BusLayoutAT1";
import BusLayoutAT2 from "@/components/Seat/BusLayoutAT2";

import SeatTicketCard from "@/components/Seat/SeatTicketCard";
import ProgressStepper from "@/components/Seat/ProgressStepper";
import PassengerForm from "@/components/Seat/PassengerForm";
import MobileActionFooter from "@/components/Seat/MobileActionFooter";
import { useBookingStore } from "@/store/zustand/useBookingStore";
import { useSearchStore } from "@/store/zustand/search.store";
import { BusService } from "@/types/bus";

interface PersistedSearchStorage {
  state?: {
    bus?: {
      origin?: { code?: string | null };
      destination?: { code?: string | null };
    };
  };
}

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

const normalizeNumeric = (value: string) => toEnglishDigits(value).replace(/\D/g, "");

const readSearchCodesFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return { srcCode: "", destCode: "" };
  }

  const raw = localStorage.getItem("search-storage");
  if (!raw) {
    return { srcCode: "", destCode: "" };
  }

  try {
    const parsed = JSON.parse(raw) as PersistedSearchStorage;
    const srcCode = parsed.state?.bus?.origin?.code;
    const destCode = parsed.state?.bus?.destination?.code;

    return {
      srcCode: typeof srcCode === "string" ? srcCode : "",
      destCode: typeof destCode === "string" ? destCode : "",
    };
  } catch {
    return { srcCode: "", destCode: "" };
  }
};

const toNullableNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const resolveSaleTicketKeys = ({
  realId,
  apiType,
  token,
  fallbackBusId,
}: {
  realId: string;
  apiType: number;
  token: string;
  fallbackBusId: string;
}) => {
  const keys = {
    busId: "",
    serviceId: "",
    tripId: "",
    tokenCompany: "",
    sellerId: null as number | null,
  };

  switch (apiType) {
    case 1:
    case 4:
      keys.tripId = realId;
      keys.sellerId = toNullableNumber(token);
      break;
    case 2:
      keys.busId = realId || fallbackBusId || "";
      break;
    case 3:
    case 5:
      keys.serviceId = realId;
      keys.tokenCompany = token;
      break;
    default:
      keys.busId = realId || fallbackBusId || "";
      keys.serviceId = realId;
      break;
  }

  return keys;
};

const toGregorianBirthDate = (jalaliBirthDate: string) => {
  const normalized = toEnglishDigits(jalaliBirthDate.trim());
  if (!normalized) return "";

  try {
    jalaliMoment.locale("en");
    const converted = jalaliMoment.from(normalized, "fa", "jYYYY/jMM/jDD");
    return converted.isValid() ? converted.format("DD/MM/YYYY") : normalized;
  } catch {
    return normalized;
  }
};

// دیتای موک برای نمایش اولیه (اسکلت/لودینگ)
const serviceMock: BusService = {
  id: "1",
  company: "در حال دریافت اطلاعات...",
  companyLogo: "/images/companies/c_5.webp",
  type: "...",
  fullPrice: 0,
  availableSeats: 0,
  time: "--:--",
  boardingPoint: { city: "-", terminal: "-" },
  destCity: "-",
};

export default function ReserveResultPage() {
  const {
    currentStep,
    isMobileFormOpen,
    selectedSeats,
    passengers,
    buyerMobile,
  } = useBookingStore();
  const busSearchState = useSearchStore((state) => state.bus);
  const formRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const searchParams = useSearchParams();

  // پارامترهای URL
  const rawTripId = params.tripId as string;
  const srcCode = searchParams.get("src");
  const destCode = searchParams.get("dest");

  const parsedTripInfo = useMemo(() => {
    const parts = rawTripId?.split("__") ?? [];
    const realId = parts[0] || "";

    const parsedApiType = Number.parseInt(parts[1] || "", 10);
    const apiType = Number.isFinite(parsedApiType) ? parsedApiType : 0;

    const tokenPart = parts[2];
    const token = tokenPart && tokenPart !== "na" ? decodeURIComponent(tokenPart) : "";

    return { realId, apiType, token };
  }, [rawTripId]);

  // استیت‌ها
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentApiType, setCurrentApiType] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (parsedTripInfo.realId && parsedTripInfo.apiType && srcCode && destCode) {
      setCurrentApiType(parsedTripInfo.apiType);

      tripService
        .getServiceDetail({
          id: parsedTripInfo.realId,
          apiType: parsedTripInfo.apiType,
          token: parsedTripInfo.token,
          srcCode: srcCode,
          destCode: destCode,
        })
        .then((data) => setServiceDetail(data))
        .catch((err) => console.error("❌ API FAILURE:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [destCode, parsedTripInfo, srcCode]);

  // اسکرول اتوماتیک
  useEffect(() => {
    if (isMobileFormOpen && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [isMobileFormOpen]);

  // 🚀 تبدیل دیتای بک‌اند به فرمت قابل فهم برای SeatTicketCard
  const activeService: BusService = useMemo(() => {
    // اگر هنوز دیتا نیومده، همون دیتای موک رو نشون بده
    if (!serviceDetail || !serviceDetail.bussEntity) return serviceMock;

    const entity = serviceDetail.bussEntity;

    // استخراج ساعت از departureDate (مثلاً از "2026-02-18T15:00:00" فقط "15:00" رو برمیداره)
    let time = "--:--";
    if (entity.departureDate && entity.departureDate.includes("T")) {
      time = entity.departureDate.split("T")[1].substring(0, 5);
    }

    return {
      id: entity.id,
      company: entity.company,
      companyLogo: "/images/companies/c_5.webp",
      type: entity.type,
      fullPrice: entity.fullPrice > 0 ? entity.fullPrice : entity.price,
      availableSeats: entity.availableSeats,
      time: time,
      boardingPoint: entity.boardingPoint,
      destCity: entity.droppingPoints?.[0]?.city || destCode || "نامشخص",
    };
  }, [destCode, serviceDetail]);

  const handleContinueProcess = async () => {
    if (isSubmitting) return;

    setSubmitError("");

    if (!parsedTripInfo.realId) {
      setSubmitError("شناسه سفر معتبر نیست.");
      return;
    }

    if (!selectedSeats.length) {
      setSubmitError("حداقل یک صندلی انتخاب کنید.");
      return;
    }

    const normalizedMobile = normalizeNumeric(buyerMobile);
    if (normalizedMobile && !/^09\d{9}$/.test(normalizedMobile)) {
      setSubmitError("شماره موبایل معتبر نیست.");
      return;
    }

    const persistedCodes = readSearchCodesFromLocalStorage();
    const storeSrcCode = busSearchState.origin.code || "";
    const storeDestCode = busSearchState.destination.code || "";
    const finalSrcCode = srcCode || storeSrcCode || persistedCodes.srcCode;
    const finalDestCode = destCode || storeDestCode || persistedCodes.destCode;

    if (!finalSrcCode || !finalDestCode) {
      setSubmitError("کد مبدا یا مقصد یافت نشد.");
      return;
    }

    const saleTicketKeys = resolveSaleTicketKeys({
      realId: parsedTripInfo.realId,
      apiType: parsedTripInfo.apiType,
      token: parsedTripInfo.token,
      fallbackBusId: serviceDetail?.bussEntity?.id || "",
    });

    const legacySelectChaires = selectedSeats
      .map((seatNumber) => {
        const gender = passengers[seatNumber]?.gender;
        const genderPrefix = gender === 2 ? "f" : "m";
        return `${genderPrefix}${seatNumber};`;
      })
      .join("");

    const listPerson: SaleTicketRequest["listPerson"] = selectedSeats.map(
      (seatNumber, index) => {
        const passenger = passengers[seatNumber];
        const firstName = passenger?.firstName?.trim() || "";
        const lastName = passenger?.LastName?.trim() || "";
        const nationalCode = normalizeNumeric(passenger?.nationalCode || "");
        const birthDate = passenger?.birthDate?.trim() || "";
        const gregorianBirthDate = toGregorianBirthDate(birthDate);
        const gender = passenger?.gender === 1 || passenger?.gender === 2 ? passenger.gender : undefined;

        return {
          name: firstName,
          firstName,
          Name: firstName,
          lastName,
          LastName: lastName,
          nationalCode,
          NationalCode: nationalCode,
          gender,
          Genders: gender ? String(gender) : "",
          genders: gender ? String(gender) : "",
          birthDate,
          BirthDay: gregorianBirthDate || birthDate,
          brithDay: gregorianBirthDate || birthDate,
          Foreign: "1",
          foreign: "1",
          Address: "",
          address: "",
          IsParent: index === 0,
          isParent: index === 0,
        };
      },
    );

    const selectedChairs = selectedSeats.join(",");
    const payload: SaleTicketRequest = {
      selectChaires: legacySelectChaires || selectedChairs,
      selectChairs: selectedChairs,
      busId: saleTicketKeys.busId,
      serviceId: saleTicketKeys.serviceId,
      tokenCompany: saleTicketKeys.tokenCompany,
      sellerId: saleTicketKeys.sellerId,
      tripId: saleTicketKeys.tripId,
      sellerTicketId: 0,
      userId: 0,
      srcCode: finalSrcCode,
      destCode: finalDestCode,
      useCreditOnSafar724: parsedTripInfo.apiType === 2,
      useCreditInSafar724: parsedTripInfo.apiType === 2,
      mobileNumber: normalizedMobile,
      listPerson,
    };

    try {
      setIsSubmitting(true);
      const response = await buyService.saleTicketsNew(payload);
      console.log("✅ SaleTicketsNew response:", response);
    } catch (error) {
      const backendError = (error as { response?: { data?: { message?: string } } }).response?.data;
      console.error("❌ SaleTicketsNew error:", backendError || error);
      setSubmitError(backendError?.message || "ارسال اطلاعات رزرو با خطا مواجه شد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pb-32 lg:pb-0 px-4 lg:px-0">
      <div className="mt-6 gap-[20px] flex flex-col lg:flex-row justify-center items-start">
        {/* ستون راست */}
        <div className="flex flex-col w-full gap-4 md:flex-1 md:max-w-[853px] min-w-0 md:mx-auto order-1">
          <ProgressStepper currentStep={currentStep} />

          {/* 👇 ارسال اطلاعات واقعی و پویا به کارت */}
          <SeatTicketCard onSelect={() => {}} service={activeService} />

          <div ref={formRef} className={`${isMobileFormOpen ? "block" : "hidden lg:block"}`}>
            <PassengerForm />
          </div>
          <div className="hidden lg:flex flex-col mt-8">
            <div className="flex justify-normal gap-10 h-[43px]">
              <button
                onClick={handleContinueProcess}
                disabled={isSubmitting}
                className="big-btn-blue text-white shadow-box h-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "در حال ارسال..." : "ادامه فرایند"}
              </button>
              <button className="bg-back-gradient ">بازگشت</button>
            </div>
            {submitError && <span className="text-red-500 text-sm mt-2">{submitError}</span>}
          </div>
        </div>

        {/* ستون چپ: اتوبوس */}
        <div className="w-full lg:w-fit shrink-0 flex justify-center mb-4 lg:mb-0 order-2">
          <div className="w-full flex justify-center">
            {loading && (
              <div className="p-10 text-gray-400 bg-white rounded-2xl border">در حال دریافت چیدمان...</div>
            )}

            {!loading && serviceDetail && (
              <>
                {(currentApiType === 1 || currentApiType === 5) && serviceDetail.chairLayout && (
                  <BusLayoutAT1 chairLayout={serviceDetail.chairLayout} isLoading={false} />
                )}

                {currentApiType === 2 && (
                  <BusLayoutAT2 serviceDetail={serviceDetail} isLoading={false} />
                )}

                {!([1, 2, 5].includes(currentApiType || 0)) && (
                  <div className="text-red-500 bg-white p-4 rounded border">
                    چیدمان تایپ {currentApiType} پشتیبانی نمی‌شود.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 👇 ارسال قیمت واقعی بلیت به فوتر موبایل برای ضرب شدن در تعداد صندلی */}
      <MobileActionFooter
        pricePerSeat={activeService.fullPrice}
        onContinueProcess={handleContinueProcess}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
}
