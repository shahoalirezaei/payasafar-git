// types/terminal.ts
export interface Terminal {
  id: number;
  title: string;
  subtitle?: string; // فقط تهران زیرعنوان دارد
  imageUrl: string;
  ctaText: string;
  variant: 'hero' | 'vertical' | 'compact'; // برای کنترل استایل‌های مختلف
}

