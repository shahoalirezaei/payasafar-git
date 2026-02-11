import { create } from 'zustand';

type TabType = 'bus' | 'coop' | 'terminal';

interface BusSearchState {
  origin: string;
  destination: string;
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

interface SearchStore {
  activeTab: TabType;

  bus: BusSearchState;
  coop: CoopSearchState;
  terminal: TerminalSearchState;

  setActiveTab: (tab: TabType) => void;

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

export const useSearchStore = create<SearchStore>((set) => ({
  activeTab: 'bus',

  bus: {
    origin: '',
    destination: '',
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
