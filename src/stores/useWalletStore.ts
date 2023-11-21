import { create } from "zustand";
interface walletModalState {
    isWalletModalOpen: boolean;
    setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;
    isAccountModalOpen: boolean;
    setIsAccountModalOpen: (isAccountModalOpen: boolean) => void;
}

export const useWalletModalStore = create<walletModalState>((set) => ({
    isWalletModalOpen: false,
    setIsWalletModalOpen: (isWalletModalOpen) => set({ isWalletModalOpen }),
    isAccountModalOpen: false,
    setIsAccountModalOpen: (isAccountModalOpen) => set({ isAccountModalOpen }),
}));
