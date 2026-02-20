// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://api.test.payasafar.com/api";

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  // 1. بازسازی آدرس نهایی
  // مثال: تبدیل /api/proxy/Trip/GetList... به http://api.test.../Trip/GetList...
  const path = params.path.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const finalUrl = `${API_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

  console.log("Proxying to:", finalUrl);

  try {
    // 2. ارسال درخواست به سرور اصلی
    const response = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // نکته مهم: هدرهای اضافی را نمی‌فرستیم تا سرور گیج نشود
      },
      cache: "no-store", // کش نکن تا دیتای تازه بگیریم
    });

    // 3. بررسی وضعیت پاسخ
    if (!response.ok) {
      console.error(`Proxy Error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: "Upstream Error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Proxy Failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}