import { create } from "zustand";

interface OTPStore {
  otp: string | null;
  email: string | null;
  generateOTP: () => void;
  clearOTP: () => void;
}

const useOTPStore = create<OTPStore>((set) => ({
  otp: null,
   email: null,
  generateOTP: () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    set({ otp: newOTP });
  },
  clearOTP: () => set({ otp: null }),
}));

export default useOTPStore;