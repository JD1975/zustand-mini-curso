import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}

export interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bearsList: Bear[];

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  blackBears: 0,
  polarBears: 0,
  pandaBears: 0,

  bearsList: [{ id: 1, name: "Paddington" }],

  doNothing: () => set((state) => ({ bearsList: state.bearsList })),

  addBear: () =>
    set((state) => ({
      bearsList: [
        ...state.bearsList,
        {
          id: state.bearsList.length + 1,
          name: `Oso #${state.bearsList.length + 1}`,
        },
      ],
    })),

  clearBears: () => set({ bearsList: [] }),

  increaseBlackBears: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),
}));
