// store/Zustand/useBookingStore.ts
import { create } from 'zustand';

// ساختار اطلاعات هر مسافر طبق مستندات 
export interface PersonInfo {
  firstName: string;
  LastName: string;
  nationalCode: string;
  gender: number; // 1: مرد، 2: زن 
  birthDate: string;
}

interface BookingState {
  // --- فیلدهای قبلی شما ---
  currentStep: number;
  ticketData: any; 
  selectedSeats: number[];
  isMobileFormOpen: boolean;

  // --- فیلدهای جدید برای اطلاعات مسافران و خریدار [cite: 35, 116, 160] ---
  buyerMobile: string; // شماره موبایل سرپرست/خریدار [cite: 156]
  passengers: Record<number, PersonInfo>; // ذخیره اطلاعات بر اساس شماره صندلی

  // --- متدهای قبلی شما ---
  setMobileFormOpen: (isOpen: boolean) => void;
  setStep: (step: number) => void;

  // --- متدهای جدید و بروزرسانی شده ---
  toggleSeat: (seatNumber: number) => void;
  setBuyerMobile: (mobile: string) => void;
  updatePassenger: (seatNumber: number, data: Partial<PersonInfo>) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  // مقادیر اولیه
  currentStep: 2,
  ticketData: null,
  selectedSeats: [],
  isMobileFormOpen: false,
  buyerMobile: "09190973470",
  passengers: {},

  setMobileFormOpen: (isOpen) => set({ isMobileFormOpen: isOpen }),
  setStep: (step) => set({ currentStep: step }),

  // بروزرسانی شده: مدیریت همزمان صندلی و دیتای مسافر 
  toggleSeat: (seatNumber) => set((state) => {
    const isSelected = state.selectedSeats.includes(seatNumber);

    if (isSelected) {
      // اگر صندلی حذف شد، اطلاعات مسافر آن صندلی هم حذف شود
      const { [seatNumber]: _, ...remainingPassengers } = state.passengers;
      return {
        selectedSeats: state.selectedSeats.filter(id => id !== seatNumber),
        passengers: remainingPassengers,
      };
    } else {
      // اگر صندلی اضافه شد، یک آبجکت خالی برای اطلاعات مسافر ایجاد شود 
      return {
        selectedSeats: [...state.selectedSeats, seatNumber],
        passengers: {
          ...state.passengers,
          [seatNumber]: {
            firstName: "",
            LastName: "",
            nationalCode: "",
            gender: 0, // بدون انتخاب
            birthDate: "",
          }
        },
      };
    }
  }),

  // تنظیم شماره موبایل خریدار [cite: 156]
  setBuyerMobile: (mobile) => set({ buyerMobile: mobile }),

  // بروزرسانی بخشی از اطلاعات یک مسافر خاص
  updatePassenger: (seatNumber, data) => set((state) => ({
    passengers: {
      ...state.passengers,
      [seatNumber]: { ...state.passengers[seatNumber], ...data }
    }
  })),
}));