import Image from "next/image";

export default function SearchBackground() {
  return (
    <>
      <div className="absolute -bottom-[10px] -left-[205px] hidden md:block">
        <Image
          src="/images/services/bus-02.webp"
          alt="Bus"
          width={250}
          height={160}
        />
      </div>

      <div className="absolute -bottom-5 -right-[185px] hidden md:block">
        <Image
          src="/images/services/bus-01.webp"
          alt="Bus"
          width={250}
          height={160}
        />
      </div>
    </>
  );
}
