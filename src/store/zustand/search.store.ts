// src/store/useSearchStore.ts
import { create } from 'zustand';

// 1. تعریف تایپ‌ها
type TabType = 'bus' | 'coop' | 'terminal';

export interface LocationData {
  title: string;
  code: string | null;
}

interface BusSearchState {
  origin: LocationData;       // تغییر از string به آبجکت
  destination: LocationData;  // تغییر از string به آبجکت
  date: string;
  passengers: number;
}

interface CoopSearchState {
  terminalId: string;
  coopId: string;
  date: string;
}

interface TerminalSearchState {
  city: string;
  terminalName: string;
}

// 2. تعریف اینترفیس اصلی استور
interface SearchStore {
  activeTab: TabType;
  bus: BusSearchState;
  coop: CoopSearchState;
  terminal: TerminalSearchState;

  // اکشن‌های عمومی
  setActiveTab: (tab: TabType) => void;

  // اکشن‌های اختصاصی و راحت برای اتوبوس (New Logic)
  setBusOrigin: (title: string, code?: string | null) => void;
  setBusDestination: (title: string, code?: string | null) => void;
  swapBusLocations: () => void;

  // اکشن‌های عمومی قبلی (برای سایر فیلدها مثل تاریخ و تعداد مسافر)
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

// 3. ایجاد استور
export const useSearchStore = create<SearchStore>((set) => ({
  activeTab: 'bus',

  // وضعیت اولیه اتوبوس با ساختار جدید
  bus: {
    origin: { title: '', code: null },
    destination: { title: '', code: null },
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

  setActiveTab: (tab) => set({ activeTab: tab }),

  // پیاده‌سازی لاجیک‌های جدید برای اتوبوس
  setBusOrigin: (title, code = null) =>
    set((state) => ({
      bus: { ...state.bus, origin: { title, code } },
    })),

  setBusDestination: (title, code = null) =>
    set((state) => ({
      bus: { ...state.bus, destination: { title, code } },
    })),

  swapBusLocations: () =>
    set((state) => ({
      bus: {
        ...state.bus,
        origin: state.bus.destination,
        destination: state.bus.origin,
      },
    })),

  // پیاده‌سازی ست‌کننده‌های عمومی (Legacy but useful)
  setBusField: (key, value) =>
    set((state) => ({
      bus: { ...state.bus, [key]: value },
    })),

  setCoopField: (key, value) =>
    set((state) => ({
      coop: { ...state.coop, [key]: value },
    })),

  setTerminalField: (key, value) =>
    set((state) => ({
      terminal: { ...state.terminal, [key]: value },
    })),
}));
