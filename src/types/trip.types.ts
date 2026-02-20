// src/types/trip.types.ts

// 1. اطلاعات نقطه سوار/پیاده شدن
export interface Point {
  city: string;
  terminal: string;
}

// 2. اطلاعات مالی
export interface FinancialInfo {
  price: number;
  maxApplicableDiscountPercentage: number;
  availablePaymentMethods: string[] | null;
  commissionPercentage: number;
}

// 3. مدل اصلی هر آیتم بلیط (لیست جستجو)
export interface BusSummary {
  id: string;
  company: string;
  companyCode: string | null;
  boardingPoint: Point;
  droppingPoints: Point[];
  departureDate: string;
  arrivalDate: string;
  price: number;
  fullPrice: number;
  type: string;
  availableSeats: number;
  financial: FinancialInfo;
  description: string;
  companyToken: string | null;
  apiType: number;
  time: string;
  destCityName: string | null;
}

// 4. *** جدید: مدل کلی پاسخ API (Generic Wrapper) ***
// این جایگزین BusSearchResponse می‌شود تا برای همه متدها کار کند
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T | null;       // برای GetServiceDetail این پر می‌شود
  payload: any | null;
  listPayload: T[] | null; // برای GetListBusSummarys این پر می‌شود
}

// 5. مدل‌های مربوط به صندلی و جزئیات سرویس
export interface Seat {
  number: number;
  row: number;
  column: number;
  // وضعیت‌های کامل طبق داکیومنت و لاگ‌ها
 status: 'Available' | 'Sold' | 'Reserved' | 'BookedForMale' | 'BookedForFemale' | 'SoldOut' | 'Blocked';
  gender?: 'Male' | 'Female';
  price?: number;
}

export interface ChairLayout {
  rows: number;
  columns: number;
  floors: number;
  columnSpace?: number;
  layoutChairs?: string; // ممکن است استرینگ باشد طبق برخی لاگ‌ها
}

// تعریف BussEntity جداگانه برای تمیزی کد
export interface BussEntity {
  id: string;
  company: string;
  boardingPoint: { city: string; terminal: string };
  droppingPoints: { city: string; terminal: string }[];
  departureDate: string;
  price: number;
  fullPrice: number;
  availableSeats: number;
  type: string;
  seates: Seat[]; // لیست صندلی‌ها
  description?: string;
}

export interface ServiceDetail {
  bussEntity: BussEntity;
  chairLayout: ChairLayout;
  trip?: any;     // فعلا لازم نداریم، ولی تایپ سیف نگهش میداریم
  sellInfo?: any; // فعلا لازم نداریم
}
