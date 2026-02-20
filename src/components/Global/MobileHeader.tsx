"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  onMenuClick: () => void;
};

export default function MobileHeader({ onMenuClick }: Props) {
  return (
    <header className="md:hidden relative h-14 mt-5 flex items-center">
      
      {/* logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            alt="Payasafar Logo"
            width={84}
            height={28}
            priority
          />
        </Link>
      </div>

      {/* menu button */}
      <button
        onClick={onMenuClick}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        aria-label="menu"
      >
        <Image
          src="/icons/menu.svg"
          alt="menu"
          width={30}
          height={30}
        />
      </button>
    </header>
  );
}
