// store/zustand/useDrawerStore.ts
import { create } from 'zustand';
type DrawerView = 'FILTER' | 'TRIP_DETAILS' | 'CHANGE_DIRECTION' | null;

interface DrawerState {
  isOpen: boolean;
  view: DrawerView;
  fullHeight: boolean; // اضافه شد
  openDrawer: (view: DrawerView, fullHeight?: boolean) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  view: null,
  fullHeight: false,
  openDrawer: (view, fullHeight = false) => set({ isOpen: true, view, fullHeight }),
  closeDrawer: () => set({ isOpen: false, view: null, fullHeight: false }),
}));