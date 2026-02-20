import React from 'react';
import Image from 'next/image';

interface CityWeather {
  name: string;
  temp: number;
  icon: string;
}

const weatherData: CityWeather[] = [
  { name: 'تهران', temp: 22, icon: '/images/icons/sunny.webp' },
  { name: 'سنندج', temp: 12, icon: '/images/icons/rain.webp' },
];

const WeatherWidget: React.FC = () => {

    function formatTemperature(value: number ) {
    const sign = value < 0 ? "−" : "";
    const number = Math.abs(value).toLocaleString("fa-IR");
    return `${sign}${number}°`;
  }
  return (
    <div className="flex flex-col justify-center items-center w-full bg-white shadow-box px-4 h-[157px] rounded-[10px]">
      {weatherData.map((city, index) => (
        <div
        key={city.name}
        className='flex w-full justify-between items-center py-[11px] border-b border-b-[#ECECEC] last:border-b-0'
        >
            <span className='font-medium text-[20px] leading-7'>{city.name}</span>
            <div className="flex items-center gap-x-3.5 md:gap-x-2.5">
                    <span
                      className="text-2xl md:text-3xl font-medium leading-7"
                      style={{ unicodeBidi: "isolate", direction: "ltr" }}
                    >
                      {formatTemperature(city.temp)}
                    </span>
            
                    <Image
                      src={city.icon}
                      alt="weather icon"
                      width={42}
                      height={42}
                      className="object-contain"
                    />
                  </div>

        </div>
      ))}
    </div>
  );
};

export default WeatherWidget;