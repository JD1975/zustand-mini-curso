import { StateCreator } from "zustand";

export interface ConfirmationSlice {
    isConfirmed: boolean;
    setIsConfirm: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({
    isConfirmed: false ,
    setIsConfirm: (value: boolean) => set({isConfirmed: value})
})