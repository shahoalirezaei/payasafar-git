import Image from "next/image";

interface RouteWeatherItemProps {
  iconSrc: string;
  temperature: number;
  route: string;
  traffic: string;
}

export function RoadStatusItem({
  iconSrc,
  temperature,
  route,
  traffic,
}: RouteWeatherItemProps) {
  function formatTemperature(value: number) {
    const sign = value < 0 ? "−" : "";
    const number = Math.abs(value).toLocaleString("fa-IR");
    return `${sign}${number}°`;
  }

  const trafficColor =
    traffic === "مسدود" ? "text-[#FF6E00]" : "text-[#335FD6]";

  return (
    <div className="relative flex items-center justify-between w-full h-[89px]
                    after:content-[''] after:absolute after:bottom-0 after:-left-5 after:-right-5  
                    after:h-px after:bg-[#ECECEC] last:after:hidden">
      {/* Right: Route Info */}
      <div className="text-right">
        <p className="font-semibold text-base md:text-[22px] leading-7">{route}</p>
        <p className={`font-semibold text-base leading-7 ${trafficColor}`}>
          {traffic}
        </p>
      </div>

      {/* Left: Weather */}
      <div className="flex items-center gap-x-3.5 md:gap-x-2.5">
        <span
          className="text-2xl md:text-3xl font-medium leading-7"
          style={{ unicodeBidi: "isolate", direction: "ltr" }}
        >
          {formatTemperature(temperature)}
        </span>

        <Image
          src={iconSrc}
          alt="weather icon"
          width={42}
          height={42}
          className="object-contain"
        />
      </div>
    </div>
  );
}