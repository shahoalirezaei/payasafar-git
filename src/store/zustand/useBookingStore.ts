// store/Zustand/useBookingStore.ts
import { create } from 'zustand';

interface BookingState {
  currentStep: number;
  ticketData: any; // تایپ مربوط به بلیط
  selectedSeats: number[];

  isMobileFormOpen: boolean; // وضعیت نمایش فرم در موبایل
  setMobileFormOpen: (isOpen: boolean) => void; // تابعی برای تغییر این وضعیت

  setStep: (step: number) => void;
  toggleSeat: (seatId: number) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 2,
  ticketData: null,
  selectedSeats: [],

  isMobileFormOpen: false, // پیش‌فرض: فرم بسته است (اتوبوس نمایش داده می‌شود)
  setMobileFormOpen: (isOpen) => set({ isMobileFormOpen: isOpen }),

  setStep: (step) => set({ currentStep: step }),
  toggleSeat: (seatId) => set((state) => ({
    selectedSeats: state.selectedSeats.includes(seatId)
      ? state.selectedSeats.filter(id => id !== seatId) // حذف اگر قبلاً بود
      : [...state.selectedSeats, seatId] // اضافه کردن اگر نبود
  })),
}));