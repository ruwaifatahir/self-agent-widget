import { create } from "zustand";

interface RegisterState {
    parentAddress: string;
    setParentAddress: (parentAddress: string) => void;
}

export const useAddressStore = create<RegisterState>((set) => ({
    parentAddress: "",
    setParentAddress: (parentAddress) => set({ parentAddress }),
}));
