import { PAY_TKN_ADDRESSES } from "@/utils/constants/addresses";
import { create } from "zustand";

export type SelectedTokenType = keyof typeof PAY_TKN_ADDRESSES | "self";

interface RegistrationStatus {
  isRegistering: boolean;
  isRegisterDisabled: boolean;
}

interface RegisterState {
  registrationStatus: RegistrationStatus;
  allowance: number;
  isValidChain: boolean;
  ownedNames: string[];
  setRegistrationStatus: (registrationStatus: RegistrationStatus) => void;
  setAllowance: (allowance: number) => void;
  setIsValidChain: (isValid: boolean) => void;
  setOwnedNames: (ownedNames: string[]) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  registrationStatus: { isRegistering: false, isRegisterDisabled: false },
  allowance: 0,
  isValidChain: true,
  ownedNames: [],
  setRegistrationStatus: (registrationStatus) => set({ registrationStatus }),
  setAllowance: (allowance) => set({ allowance }),
  setIsValidChain: (isValidChain) => set({ isValidChain }),
  setOwnedNames: (ownedNames) => set({ ownedNames }),
}));
