// src/types/city.ts

export interface City {
  id: number;
  title: string;        // نام فارسی شهر (مثلا: تهران)
  code: string;         // کد شهر برای جستجو (مثلا: 11320000)
  provinceId: number;   // شناسه استان
  enabled: boolean;     // آیا شهر فعال است؟ (در خروجی شما false بود، شاید مهم باشد)
  sellerCityId: number; // شناسه شهر در سیستم فروشنده
  coords: string;       // مختصات جغرافیایی (مثلا: "35.75,51.375")
  etitle: string;       // نام انگلیسی (مثلا: tehran)
}
