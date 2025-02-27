import axios from "axios";

import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
    devtools((set) => ({
        user: null,
        isSigningUp: false,
        redirectAfterSignUp: false,
        isSigningIn: false,
        isOtpModalOpen: false, // Open OTP Modal

        signup: async (signupData) => {
            set({ isSigningUp: true });
            try {
                const response = await axios.post(
                    import.meta.env.VITE_HOST + "/api/v1/auth/signup",
                    signupData
                );

                set((state) => ({
                    ...state,
                    user: response.data.user,
                    isSigningUp: false,
                    redirectAfterSignUp: true,
                }));
                toast.success(response.data.message);
            } catch (error) {
                set((state) => ({
                    ...state,
                    user: null,
                    isSigningUp: false,
                    redirectAfterSignUp: false,
                }));
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
            }
        },
        signin: async (signInCredential) => {
            set({ isSigningIn: true });
            try {
                const response = await axios.post(
                    import.meta.env.VITE_HOST + "/api/v1/auth/signin",
                    signInCredential
                );
                set((state) => ({
                    ...state,
                    user: response.data.user,
                    isSigningIn: false,
                    isOtpModalOpen: true, // Open OTP Modal
                }));
                toast.success(response.data.user.message);
            } catch (error) {
                set((state) => ({
                    ...state,
                    user: null,
                    isSigningIn: false,
                    isOtpModalOpen: false, // Open OTP Modal
                }));
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
            }
        },
    }))
);
