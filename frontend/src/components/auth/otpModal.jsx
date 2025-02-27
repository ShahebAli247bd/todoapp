import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";

export function OtpModal() {
    const [otp, setOtp] = useState(""); // OTP State

    // OTP Change Handler
    const handleOtpChange = (value) => {
        setOtp(value);
        console.log("Current OTP:", value); // Debugging
    };

    const { verifyOTP } = useAuthStore();
    // Verify OTP Function
    const verifyOTPHandler = async () => {
        await verifyOTP(otp);
    };

    return (
        <>
            <InputOTP maxLength={4} value={otp} onChange={handleOtpChange}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <Button onClick={verifyOTPHandler}>Verify OTP</Button>
        </>
    );
}
