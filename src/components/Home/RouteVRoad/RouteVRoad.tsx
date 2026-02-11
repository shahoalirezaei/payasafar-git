import React from 'react'
import PopularRoutes from './BusyRoutes/PopularRoutes'
import RoadStatus from './RoadStatus/RoadStatus'

function RouteVRoad() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 items-stretch justify-between gap-x-[18px] gap-y-2.5 pt-3.5 md:pt-1 pb-'>
        <div className='flex md:col-span-2 flex-col items-center justify-center gap-2 text-title pb-3.5 md:pb-[21]'>
            <h2 className='font-semibold text-2xl '>وضعیت راه ها و مسیرهای پرتردد</h2>
            <p className='font-medium text-sm text-center px-10'>نگاهی سریع به شرایط جوی و ترافیکی مسیرهای کلیدی کشور برای برنامه‌ریزی یک سفر امن و راحت</p>
        </div>
        <PopularRoutes />
        <RoadStatus />
    </div>
  )
}

export default RouteVRoad