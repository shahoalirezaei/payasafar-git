// src/lib/data/companies.ts

export interface Company {
  id: number;
  name: string;
  img: string;
  link: string;
}

export const busCompanies: Company[] = [
  { id: 1, name: "همسفر", img: "/images/companies/c_1.webp", link: "/companies/hamsafar" },
  { id: 2, name: "ترابری بی تا", img: "/images/companies/c_2.webp", link: "/companies/bita" },
  { id: 3, name: "سیر و سفر", img: "/images/companies/c_3.webp", link: "/companies/sirosafar" },
  { id: 4, name: "رویال سفر ایرانیان", img: "/images/companies/c_4.webp", link: "/companies/royal" },
  { id: 5, name: "گیتی پیما", img: "/images/companies/c_5.webp", link: "/companies/giti" },
  { id: 6, name: "آریا سفر", img: "/images/companies/c_6.webp", link: "/companies/aria" },
  { id: 7, name: "ایران پیما", img: "/images/companies/c_7.webp", link: "/companies/iranpeyma" },
  // برای تست لوپ شدن، می‌توانید موارد بیشتری اضافه کنید
];