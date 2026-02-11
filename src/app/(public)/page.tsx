// src/app/(public)/page.tsx

import Footer from "@/components/Global/Footer"; // نکته دارد (پایین بخون)
import { 
  Hero, 
  ServicesGrid, 
  QuickActionvTerminal, 
  ProofSection, 
  RouteVRoad, 
  CompanySlider, 
  FAQSection, 
  BlogSection, 
  SeoContent, 
  CommentSection 
} from "@/components/Home"; // ایمپورت یک‌خطی و تمیز!

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <QuickActionvTerminal />
      <ProofSection />
      <RouteVRoad />
      <CompanySlider />
      <FAQSection />
      <BlogSection />
      <SeoContent />
      <CommentSection />
    </main>
  );
}