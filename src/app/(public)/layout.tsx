// src/app/(public)/layout.tsx

import Footer from "@/components/Global/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>

      {/* محتوای اصلی هر صفحه (page.tsx ها) اینجا رندر می‌شوند */}
      <main >
        {children}
      </main>

      {/* فوتر سایت */}
      <Footer />
      
    </div>
  );
}