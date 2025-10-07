import { create } from "zustand";

interface PersonState {
    firstName: string;
    lastName: string;
}


interface PersonActions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

export const usePersonStore = create<PersonState & PersonActions> ()((set) => ({
    firstName: "",
    lastName: "",

    setFirstName: (value: string) => set(state => ({ firstName: value })),
    setLastName: (value: string) => set(state =>({ lastName: value })),
}));