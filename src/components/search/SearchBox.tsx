"use client";

import SearchTabs from "./SearchTabs";
import SearchBackground from "./SearchBackground";
import SearchContent from "./SearchContent";

export default function SearchBox() {
  return (
    <div className="relative w-[378px] md:w-[471px] h-[398px] overflow-y-visible">
      <div className="relative z-10 flex flex-col items-center mt-12  w-full h-full shadow-soft-blue bg-white px-[27px] pt-[22px] pb-11 rounded-2xl">
        <SearchTabs />
        {/* <BusSearch /> */}
        <SearchContent/>
      </div>

      <SearchBackground />
    </div>
  );
}
