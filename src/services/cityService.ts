// src/services/cityService.ts
import { City } from "@/types/city";

// استفاده از متغیر محیطی
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getCities(): Promise<City[]> {
  try {
    // دقت کن که /api را هم اگر در .env نیست اینجا اضافه کنی
    const response = await fetch(`${API_BASE_URL}/api-proxy/cities/getListCities`, {
      method: "GET",
      headers: {

        "Content-Type": "application/json",
      },
      next: { revalidate: 86400 }, 
    });

    if (!response.ok) throw new Error("Fetch failed");

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return [];
  }
}