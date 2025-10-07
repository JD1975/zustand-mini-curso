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

  computed: {
    totalBears: number;
  },
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 0,
  polarBears: 0,
  pandaBears: 0,

  bearsList: [{ id: 1, name: "Paddington" }],


  // Propiedad computada 
  // Se define dentro del store y puede acceder a otras propiedades del estado
  // Usando la función get() proporcionada por Zustand
  computed: {
    get totalBears(): number {
      return get().blackBears + get().polarBears + get().pandaBears + get().bearsList.length;
    }
  },

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
