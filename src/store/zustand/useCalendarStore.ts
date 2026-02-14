// store/useCalendarStore.ts
import { create } from 'zustand';

interface CalendarState {
  isCalendarOpen: boolean;
  selectedDate: Date | null;
  
  setCalendarOpen: (isOpen: boolean) => void;
  setSelectedDate: (date: Date | null) => void;
  toggleCalendar: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  isCalendarOpen: false,
  // تنظیم پیش‌فرض روی تاریخ امروز
  selectedDate: new Date(), 

  setCalendarOpen: (isOpen) => set({ isCalendarOpen: isOpen }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  toggleCalendar: () => set((state) => ({ isCalendarOpen: !state.isCalendarOpen })),
}));