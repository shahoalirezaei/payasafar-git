// src/components/Seat/busConfig.ts

export type BusType = 'VIP_25' | 'CLASSIC_30' | 'NORMAL_44' | 'TRIAXLE_VIP';

export interface BusLayoutConfig {
  rows: number;
  columns: number;
  doorRow: number; // ردیفی که درب خروج در آن قرار دارد (از 1 شروع می‌شود)
  // در اتوبوس‌های ایران، درب معمولاً سمت راست (شاگرد) است.
  // ستون‌های سمت راست معمولاً ستون 1 و 2 هستند.
  doorSide: 'right'; 
  colTemplate: string; // برای گرید تیلویند
}

export const getBusConfig = (type: BusType): BusLayoutConfig => {
  switch (type) {
    case 'VIP_25': // سه ستونه (تک + راهرو + جفت)
      return {
        rows: 9,
        columns: 4, // 1 ستون تک + 1 راهرو + 2 ستون جفت = 4
        doorRow: 4, // درب معمولاً در ردیف 4 یا 5 است
        doorSide: 'right',
        colTemplate: '1fr 0.6fr 1fr 1fr' // ستون دوم (راهرو) باریک‌تر است
      };
    case 'CLASSIC_30': // سه ستونه (تک + راهرو + جفت) - مثل 25 نفره ولی طولانی‌تر
      return {
        rows: 11, // یا 10
        columns: 4,
        doorRow: 5,
        doorSide: 'right',
        colTemplate: '1fr 0.6fr 1fr 1fr'
      };
    case 'TRIAXLE_VIP': // سه محور (مشابه 25 نفره ولی خیلی طولانی)
        return {
          rows: 14, // حدودا
          columns: 4,
          doorRow: 6,
          doorSide: 'right',
          colTemplate: '1fr 0.6fr 1fr 1fr'
        };
    case 'NORMAL_44': // چهار ستونه (جفت + راهرو + جفت)
    default:
      return {
        rows: 12, // یا 11
        columns: 5, // 2 راست + 1 راهرو + 2 چپ = 5
        doorRow: 4,
        doorSide: 'right',
        colTemplate: '1fr 1fr 0.6fr 1fr 1fr' // ستون وسط (راهرو) باریک‌تر
      };
  }
};