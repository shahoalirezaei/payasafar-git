// src/lib/data/mockRoutes.ts

export type RouteType = {
  id: number;
  from: string;
  to: string;
  link: string;
};

export const popularRoutes: RouteType[] = [
  { id: 1, from: "بانه", to: "تهران", link: "/bus/baneh-tehran" },
  { id: 2, from: "مریوان", to: "تهران", link: "/bus/marivan-tehran" },
  { id: 3, from: "سقز", to: "تهران", link: "/bus/saqqez-tehran" },
  { id: 4, from: "تهران", to: "قزوین", link: "/bus/tehran-qazvin" },
  { id: 5, from: "بتدر‌عباس", to: "تهران", link: "/bus/rasht-tehran" },
  { id: 6, from: "اصفهان", to: "تهران", link: "/bus/esfahan-tehran" },
  { id: 7, from: "ساری", to: "تهران", link: "/bus/sari-tehran" },
];