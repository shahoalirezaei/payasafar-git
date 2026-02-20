// src/app/(public)/bus/[slug]/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import moment from 'jalali-moment';

// ایمپورت‌ها
import { tripService } from '@/services/tripService';
import { getCities } from '@/services/cityService'; 
import { useSearchStore } from '@/store/zustand/search.store';
import { BusSummary } from '@/types/trip.types';
import TicketCard, { BusService } from "@/components/Bus/TicketCard";

// کامپوننت‌های UI
import DesktopSidebar from '@/components/Bus/Filters/DesktopSidebar';
import MobileBaseDrawer from '@/components/Bus/Filters/MobileBaseDrawer';
import { FilterState } from '@/components/Bus/Filters/FilterContent';
import BusMobileHeader from '@/components/Bus/Header/BusMobileHeader';
import SortBar from '@/components/Bus/Search/SortBar';
import MobileBottomBar from '@/components/Bus/MobileBottomBar';
import SearchInfoBar from '@/components/Bus/Search/SearchInfoBar';

export default function SearchResultsPage() {
  const [filters, setFilters] = useState<FilterState>({
    trabori: false,
    hamsafar: false,
    ariasafar: false,
    gitipayma: false,
    sirosafar: false,
  });

  const params = useParams();
  const searchParams = useSearchParams();
  const { bus, setBusOrigin, setBusDestination } = useSearchStore();

  const router = useRouter(); // هوک روتر

  const [services, setServices] = useState<BusService[]>([]);
  const [loading, setLoading] = useState(true);

  // پارامترهای URL
  const slug = params.slug as string; 
  const departingDateJalali = searchParams.get('departing'); 

  useEffect(() => {
    const fetchTickets = async () => {
      if (!slug || !departingDateJalali) return;

      setLoading(true);
      try {
        // ۱. تبدیل تاریخ شمسی به میلادی برای ارسال به API
        const gregorianDate = moment.from(departingDateJalali, 'fa', 'YYYY-MM-DD')
                                    .locale('en')
                                    .format('YYYY-MM-DD');

        // ۲. کدهای فعلی در استور
        let srcCode = bus.origin.code;
        let destCode = bus.destination.code;

        // ۳. هندل کردن رفرش (اگر کدها در استور نبودند)
        if (!srcCode || !destCode) {
          const [srcSlug, destSlug] = slug.split('-');
          const allCities = await getCities();
          
          const foundSrc = allCities.find((c: any) => c.etitle && c.etitle.toLowerCase().replace(/\s+/g, '-') === srcSlug);
          const foundDest = allCities.find((c: any) => c.etitle && c.etitle.toLowerCase().replace(/\s+/g, '-') === destSlug);

          if (foundSrc) {
             srcCode = foundSrc.code;
             setBusOrigin({ id: foundSrc.id, title: foundSrc.title, code: foundSrc.code, etitle: foundSrc.etitle || '' });
          }
          if (foundDest) {
             destCode = foundDest.code;
             setBusDestination({ id: foundDest.id, title: foundDest.title, code: foundDest.code, etitle: foundDest.etitle || '' });
          }
        }

        if (!srcCode || !destCode) {
          setLoading(false);
          return;
        }

        // ۴. دریافت بلیط‌ها از API
        const apiData = await tripService.getBusSummaryList({
          srcCode: srcCode!,
          destCode: destCode!,
          dt: gregorianDate,
        });
        
        console.log("✅ API Data:", apiData);
        console.log(srcCode,"  ++++ ", destCode);
        

        // ۵. مپ کردن دیتا
        const mappedServices: BusService[] = apiData.map((item: BusSummary) => {
          
          // الف: استخراج توقف‌های بین راهی
          const allStops = item.droppingPoints || [];
          const stopsList = allStops.length > 1 
            ? allStops.slice(0, -1).map(s => s.city).join('، ') 
            : "";

          // ب: پیدا کردن شهر مقصد
          const destinationCity = item.destCityName 
            || (allStops.length > 0 ? allStops[allStops.length - 1].city : 'مقصد');

          return {
            id: item.id,
            company: item.company,
            companyLogo: '/images/companies/c_5.webp', // لوگوی پیش‌فرض
            type: item.type,
            fullPrice: item.price,
            availableSeats: item.availableSeats,
            time: item.time, // ساعت حرکت
            
            // ساعت رسیدن
            arrivalTime: (item.arrivalDate && !item.arrivalDate.startsWith('0001')) 
              ? moment(item.arrivalDate).format('HH:mm') 
              : undefined,

            boardingPoint: { 
              city: item.boardingPoint.city, 
              terminal: item.boardingPoint.terminal 
            },
            
            destCity: destinationCity,
            stops: stopsList,

            // *** فیلدهای اضافه شده برای سیستم رزرو جدید ***
            // (حتی اگر در تایپ BusService نباشند، اینجا اضافه می‌شوند تا هندلر به آنها دسترسی داشته باشد)
            apiType: item.apiType, 
            companyToken: item.companyToken
          } as BusService; // Type casting برای جلوگیری از خطای احتمالی تایپ‌اسکریپت
        });

        setServices(mappedServices);

      } catch (error) {
        console.error("❌ Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
    
  }, [slug, departingDateJalali, bus.origin.code, bus.destination.code, setBusOrigin, setBusDestination]);

  // --- تغییر اصلی: ساخت شناسه ترکیبی ---
  const handleSelectTicket = (service: any) => { // از any استفاده کردم تا به apiType و companyToken دسترسی داشته باشیم
    // 1. گرفتن کدهای شهر مبدا و مقصد از استور
    const srcCode = bus.origin.code;
    const destCode = bus.destination.code;

    if (!srcCode || !destCode) {
      alert("خطا در شناسایی مبدا و مقصد");
      return;
    }

    // 2. ساخت شناسه ترکیبی (Composite ID)
    // فرمت: ID__Type__Token
    // اگر توکن null بود، مقدار 'na' می‌گذاریم تا ساختار URL به هم نریزد
    const safeToken = service.companyToken ? service.companyToken : 'na';
    const compositeId = `${service.id}__${service.apiType}__${safeToken}`;
    console.log("my log:", service.companyToken ? service.companyToken : 'na'," id:", service.id, " apiType:", service.apiType);
    

    // 3. ساخت URL نهایی
    // مثال: /reserve/12345__2__na?src=...&dest=...
    const url = `/reserve/${compositeId}?src=${srcCode}&dest=${destCode}`;

    // 4. هدایت کاربر
    router.push(url);
  };

  return (
    <div className="mx-auto">
      <MobileBottomBar />
      <MobileBaseDrawer filters={filters} setFilters={setFilters} />

      {/* هدر */}
      <div className="bg-white lg:bg-transparent pr-8 lg:pr-0 md:pt-8 shadow-box lg:shadow-none mb-8 flex flex-col lg:flex-row items-center justify-between">
          <SearchInfoBar />
          <div className="w-full md:w-auto"><BusMobileHeader /></div>
          <div className='w-full lg:hidden '><SortBar /></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <DesktopSidebar filters={filters} setFilters={setFilters} />

        <main className="flex-1 px-4 md:px-0 min-w-0">
            <div className='hidden w-full lg:block'><SortBar /></div>
          
            <div className=" w-full flex flex-col gap-4">
            
            {/* Loading State */}
            {loading && <div className="text-center py-10 text-gray-500">در حال دریافت بلیط‌ها...</div>}

            {/* Empty State */}
            {!loading && services.length === 0 && (
                <div className="text-center py-10 text-gray-500">بلیطی یافت نشد.</div>
            )}

            {/* Ticket List */}
            {!loading && services.map((service) => (
              <TicketCard 
                key={service.id} 
                service={service} 
                onSelect={handleSelectTicket} 
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}