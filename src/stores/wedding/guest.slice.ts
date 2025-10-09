import { StateCreator } from "zustand";

export interface GuestSlice {
    guestCount: number;
    setGuestCount: (count: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
    guestCount: 0,
    setGuestCount: (count: number) => set({ guestCount: count && count >= 0 ? count : 0 }),
});