import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router"; // Correct import
import toast from "react-hot-toast";

export function OtpModal() {
  const [otp, setOtp] = useState(""); // OTP State
  const [signing, setSigning] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate(); // Correct way to navigate
  const { verifyOTP } = useAuthStore();

  // OTP Change Handler
  const handleOtpChange = (value) => {
    setOtp(value);
    console.log("Current OTP:", value); // Debugging
  };

  // OTP Verification Handler
  const handlerOTP = async (e) => {
    e.preventDefault();
    setSigning(true);

    try {
      await verifyOTP(otp);
      setIsOtpVerified(true);
      navigate("/dashboard");
    } catch (error) {
      toast.error("OTP Verification Failed: " + error.message);
      setSigning(false);
    }
  };

  // Redirect if OTP is verified
  useEffect(() => {
    if (isOtpVerified) {
      navigate("/dashboard");
    }
  }, [isOtpVerified, navigate]);

  return (
    <>
      <InputOTP maxLength={4} value={otp} onChange={handleOtpChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={handlerOTP} disabled={signing}>
        {signing ? "Verifying..." : "Verify OTP"}
      </Button>
    </>
  );
}
