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
  setRegistrationStatus: (registrationStatus: RegistrationStatus) => void;
  setAllowance: (allowance: number) => void;
  setIsValidChain: (isValid: boolean) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  registrationStatus: { isRegistering: false, isRegisterDisabled: false },
  allowance: 0,
  isValidChain: true,
  setRegistrationStatus: (registrationStatus) => set({ registrationStatus }),
  setAllowance: (allowance) => set({ allowance }),
  setIsValidChain: (isValidChain) => set({ isValidChain }),
}));
