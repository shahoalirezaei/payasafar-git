
// src/app/layout.tsx
import type { ReactNode } from "react";
import { peyda } from "@/lib/fonts";
import "./globals.css"
import Header from "@/components/Global/Header";
import GlobalDatePicker from "@/components/ui/GlobalDatePicker";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={peyda.variable}>
      <body>
        <div className="container mx-auto  md:pt-[85px]">

      <Header />
      

        {children}
        <GlobalDatePicker />
      
        </div>
        </body>
    </html>
  );
}
