import Link from "next/link";
import { RoadStatusItem } from "./RoadStatusItem";

export default function RoadStatus() {
  const routes = [
    {
      id: 1,
      icon: "/images/icons/sunny.webp",
      temperature: 23,
      route: "اتوبان تهران - ساوه",
      traffic: "ترافیک روان",
    },
    {
      id: 2,
      icon: "/images/icons/heavy-rain.webp",
      temperature: 7,
      route: "اتوبان تهران - شمال",
      traffic: "ترافیک روان",
    },
    {
      id: 3,
      icon: "/images/icons/rain.webp",
      temperature: 2,
      route: "جاده تبریز - اردبیل",
      traffic: "بدون ترافیک",
    },
    {
      id: 4,
      icon: "/images/icons/snow.webp",
      temperature: -3,
      route: "جاده چالوس",
      traffic: "مسدود",
    },
    {
      id: 5,
      icon: "/images/icons/sunny.webp",
      temperature: 32,
      route: "بزرگراه شیراز - بندرعباس",
      traffic: "بدون ترافیک",
    },
  ];

  return (
    
      <section className="box mx-auto  w-full h-full shadow-box rounded-[20px] flex flex-col px-5 md:pr-[33px] md:pl-[38px] pt-[26px] md:pt-[38px] gap-3.5 ">
      <div className="w-full flex flex-col mb-[9px] md:mb-[21px]">
        <h2 className="font-bold leading-[25px] text-xl md:text-2xl">وضعیت جاده‌های پرتردد کشور</h2>
        <Link href="#" className="text-[#335FD6] text-sm font-semibold cursor-pointer md:hidden">
         جستجو مسیر
        </Link>
      </div>

      <div className="flex flex-col">
        {routes.map((item, index) => (
          
            <RoadStatusItem
            key={item.id}
              iconSrc={item.icon}
              temperature={item.temperature}
              route={item.route}
              traffic={item.traffic}
            />

   
        ))}
      </div>
    </section>
  );
}
