// src/services/cityService.ts
import { City } from "@/types/city";

// آدرس پایه پروکسی
// اگر متغیر محیطی ست نشده بود، دیفالت خالی می‌ذاریم تا نسبی کار کنه
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getCities(): Promise<City[]> {
  try {
    
    // ✅ اصلاح شده: /api-proxy/City/getListCities (طبق Swagger)
    const response = await fetch(`${BASE_URL}/api/proxy/City/getListCities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // کش برای پرفورمنس (چون لیست شهرها دیر به دیر عوض میشه)
      next: { revalidate: 86400 }, 
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return [];
  }
}