import apiBase from "@/lib/axios";

export interface ResultBase<T> {
  status?: string;
  code?: string;
  message?: string;
  data?: T;
  payload?: T;
  listPayload?: T[];
  isSuccess?: boolean;
}

// ۱. اینترفیس اطلاعات هر مسافر
// برای جلوگیری از ناسازگاری بین نسخه‌های مختلف مستند بک‌اند،
// هر دو مدل نام‌گذاری را پوشش می‌دهیم.
export interface PersonInfo {
  name?: string;
  firstName?: string;
  lastName?: string;
  LastName?: string;
  Name?: string;
  nationalCode?: string;
  NationalCode?: string;
  gender?: number;
  Genders?: string;
  genders?: string;
  birthDate?: string;
  BirthDay?: string;
  brithDay?: string;
  Foreign?: string;
  foreign?: string;
  Address?: string;
  address?: string;
  IsParent?: boolean;
  isParent?: boolean;
}

// ۲. اینترفیس درخواست ثبت بلیت
export interface SaleTicketRequest {
  selectChaires: string; // نسخه رایج در بک‌اند فعلی
  selectChairs?: string; // نسخه جایگزین در برخی مستندات
  busId: string;
  serviceId: string;
  tokenCompany: string;
  sellerId?: number | null;
  tripId: string;
  sellerTicketId?: number | null;
  userId?: number | null;
  srcCode: string;
  destCode: string;
  useCreditOnSafar724: boolean;
  useCreditInSafar724?: boolean;
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
