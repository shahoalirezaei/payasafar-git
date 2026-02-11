"use client";

import { useState } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <DesktopHeader />
      <MobileHeader onMenuClick={() => setMenuOpen(true)} />
      {/* بعدا: MobileMenu */}
    </>
  );
}
