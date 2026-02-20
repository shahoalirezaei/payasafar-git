// src/store/zustand/search.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ==========================================
// 1. تعریف تایپ‌ها و اینترفیس‌ها
// ==========================================

export type TabType = 'bus' | 'coop' | 'terminal';

// اینترفیس کامل اطلاعات شهر (برای مبدا و مقصد)
export interface LocationData {
  id: number;          // شناسه شهر (برای اطمینان)
  title: string;       // نام فارسی: "تهران"
  code: string | null; // کد شهر: "11320000"
  etitle: string;      // نام انگلیسی: "tehran" (برای ساخت URL slug)
}

// وضعیت تب اتوبوس
interface BusSearchState {
  origin: LocationData;
  destination: LocationData;
  date: string;       // تاریخ به صورت رشته (مثلاً "1404-11-27" یا "2026-02-16")
  passengers: number;
}

// وضعیت تب شرکت‌های تعاونی (Coop)
interface CoopSearchState {
  terminalId: string;
  coopId: string;
  date: string;
}

// وضعیت تب پایانه‌ها (Terminal)
interface TerminalSearchState {
  city: string;
  terminalName: string;
}

// ==========================================
// 2. اینترفیس اصلی استور (State + Actions)
// ==========================================
interface SearchStore {
  // --- State ---
  activeTab: TabType;
  bus: BusSearchState;
  coop: CoopSearchState;
  terminal: TerminalSearchState;

  // --- Actions ---
  setActiveTab: (tab: TabType) => void;

  // اکشن‌های اختصاصی اتوبوس (بهینه‌شده برای دریافت کل آبجکت LocationData)
  setBusOrigin: (location: LocationData) => void;
  setBusDestination: (location: LocationData) => void;
  
  // اکشن جابجایی مبدا و مقصد
  swapBusLocations: () => void;

  // اکشن‌های عمومی (Generic Setters) برای تغییر تک‌فیلدها
  setBusField: <K extends keyof BusSearchState>(
    key: K,
    value: BusSearchState[K]
  ) => void;

  setCoopField: <K extends keyof CoopSearchState>(
    key: K,
    value: CoopSearchState[K]
  ) => void;

  setTerminalField: <K extends keyof TerminalSearchState>(
    key: K,
    value: TerminalSearchState[K]
  ) => void;
}

// ==========================================
// 3. پیاده‌سازی استور با Zustand و Persist
// ==========================================
export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      // ------------------------------------------------
      // Initial State (مقادیر اولیه)
      // ------------------------------------------------
      activeTab: 'bus',
      
      bus: {
        // مقادیر پیش‌فرض کامل (شامل etitle و id)
        origin: { id: 0, title: '', code: null, etitle: '' },
        destination: { id: 0, title: '', code: null, etitle: '' },
        date: '',
        passengers: 1,
      },

      coop: {
        terminalId: '',
        coopId: '',
        date: '',
      },

      terminal: {
        city: '',
        terminalName: '',
      },

      // ------------------------------------------------
      // Actions (توابع تغییر وضعیت)
      // ------------------------------------------------
      
      setActiveTab: (tab) => set({ activeTab: tab }),

      // ذخیره کامل آبجکت مبدا (شامل etitle و code)
      setBusOrigin: (location) =>
        set((state) => ({
          bus: { ...state.bus, origin: location },
        })),

      // ذخیره کامل آبجکت مقصد
      setBusDestination: (location) =>
        set((state) => ({
          bus: { ...state.bus, destination: location },
        })),

      // جابجایی جای مبدا و مقصد
      swapBusLocations: () =>
        set((state) => ({
          bus: {
            ...state.bus,
            origin: state.bus.destination,
            destination: state.bus.origin,
          },
        })),

      // تغییر یک فیلد خاص در استیت اتوبوس (مثلاً فقط تاریخ یا تعداد مسافر)
      setBusField: (key, value) =>
        set((state) => ({
          bus: { ...state.bus, [key]: value },
        })),

      // تغییر فیلدهای Coop
      setCoopField: (key, value) =>
        set((state) => ({
          coop: { ...state.coop, [key]: value },
        })),

      // تغییر فیلدهای Terminal
      setTerminalField: (key, value) =>
        set((state) => ({
          terminal: { ...state.terminal, [key]: value },
        })),
    }),
    {
      // تنظیمات Persist (ذخیره در localStorage)
      name: 'search-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);