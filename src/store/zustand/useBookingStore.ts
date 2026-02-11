// store/Zustand/useBookingStore.ts
import { create } from 'zustand';

interface BookingState {
  currentStep: number;
  ticketData: any; // تایپ مربوط به بلیط
  selectedSeat: number | null;
  setStep: (step: number) => void;
  setSeat: (seatId: number) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 1,
  ticketData: null,
  selectedSeat: null,
  setStep: (step) => set({ currentStep: step }),
  setSeat: (seatId) => set({ selectedSeat: seatId }),
}));