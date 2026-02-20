import apiBase from "@/lib/axios";
import { ResultBase } from "@/types/trip.types";

// ۱. اینترفیس اطلاعات هر مسافر
export interface PersonInfo {
  firstName: string;
  LastName: string; // دقت کنید در داکیومنت L بزرگ است
  nationalCode: string;
  gender: number; // 1 برای مرد، 2 برای زن
  birthDate: string; // فرمت ISO یا رشته‌ای که سرور قبول می‌کند
}

// ۲. اینترفیس درخواست ثبت بلیت
export interface SaleTicketRequest {
  selectChaires: string; // صندلی‌ها با کاما: "1,2"
  busId: string;
  serviceId: string;
  tokenCompany: string;
  sellerId?: number;
  tripId: string;
  srcCode: string;
  destCode: string;
  useCreditOnSafar724: boolean;
  mobileNumber: string;
  listPerson: PersonInfo[];
}

// ۳. اینترفیس خروجی پرداخت
export interface PaymentResponsePayload {
  token: string;
  url: string;
  method: string; // معمولا "POST"
  formName: string;
}

export const buyService = {
  /**
   * مرحله ۱: ثبت رزرو موقت و دریافت اطلاعات تاییدیه
   * POST /api/Buy/SaleTicketsNew
   */
  saleTicketsNew: async (data: SaleTicketRequest) => {
    const response = await apiBase.post<ResultBase<any>>(
      "/Buy/SaleTicketsNew",
      data
    );
    return response.data;
  },

  /**
   * مرحله ۲: درخواست ارسال به درگاه پرداخت
   * POST /api/Payment/SendRequestPayment
   */
  sendRequestPayment: async (price: number) => {
    const response = await apiBase.post<ResultBase<PaymentResponsePayload>>(
      "/Payment/SendRequestPayment",
      { price }
    );
    return response.data;
  },
};