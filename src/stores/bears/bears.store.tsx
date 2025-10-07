import { create } from "zustand";

export interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  increaseBlackBears: (by:number) => void;
  increasePolarBears: (by:number) => void;
  increasePandaBears: (by:number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
    blackBears: 0,
    polarBears: 0,
    pandaBears: 0,

    increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
    increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),
}));
