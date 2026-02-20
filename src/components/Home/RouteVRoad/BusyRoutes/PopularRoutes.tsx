// src/components/PopularRoutes.tsx
import React from "react";

import { popularRoutes } from "@/lib/data/mockRoutes"; 
import RouteItem from "./RouteItem";

const PopularRoutes = () => {
  return (
    <section className="w-full h-full  mx-auto">
      <div className="bg-white rounded-[25px] shadow-box  overflow-hidden">
        
        {/* Header */}
        <div className="px-9 pb-5 pt-10  flex items-center justify-between">
          <h2 className="text-gray-800 font-bold text-lg md:text-xl lg:text-2xl">
            پردرخواست ترین بلیط ها
          </h2>
          {/* اگر دکمه "مشاهده همه" نیاز بود اینجا قرار می‌گیرد */}
        </div>

        {/* List Container */}
        <div className="px-4 md:px-6 flex flex-col">
          {popularRoutes.map((route) => (
            <RouteItem key={route.id} route={route} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PopularRoutes;