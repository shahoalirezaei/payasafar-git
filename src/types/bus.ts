// types/bus.ts
export interface BusService {
  id: string;
  company: string;
  companyLogo: string;
  type: string; // مثال: تخت‌خواب‌شو یا معمولی
  fullPrice: number;
  availableSeats: number;
  time: string;
  boardingPoint: {
    city: string;
    terminal?: string;
  };
  destCity: string;
  description?: string;
}