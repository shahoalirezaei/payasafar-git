// src/app/(public)/layout.tsx

import Footer from "@/components/Global/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* محتوای اصلی هر صفحه (page.tsx ها) اینجا رندر می‌شوند */}
      <main className="flex-grow" >
        {children}
      </main>

      {/* فوتر سایت */}
      <Footer />
      
    </div>
  );
}