import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
  // (...a) captura todos los parámetros (set, get, storeApi) que Zustand pasa automáticamente.
  // Luego ...a los esparce para pasarlos a cada slice. Es más corto que escribir (set, get, storeApi).
  // Útil para combinar múltiples slices en un solo store sin repetir código.
  // Se llama rest parameter

  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a)
  }))
);
