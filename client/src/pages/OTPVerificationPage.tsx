import {
  completeRegisterApi,
  resendOTPApi,
  verifyOTPApi,
} from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { logout } from "@/features/auth/slice/userSlice";
import { AppDispatch } from "@/store";
import { successPopup } from "@/utils/popup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerificationPage = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(20);

  const { forAction, email }: { forAction: string; email: string } =
    location.state || {};

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!forAction || !email) {
      navigate("/");
    }
  }, [email, forAction, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const submit = async () => {
    if (value.length !== 6) {
      successPopup("Please enter a valid 6-digit OTP");
      return;
    }

    const res = await verifyOTPApi(email, value);
    if (!res) return;

    if (forAction === "register") {
      const res = await completeRegisterApi(email);
      if (!res) return;
      navigate("/auth");
    } else {
      navigate("/auth/resetPassword", { state: { email } });
    }
  };

  const resendOTP = async () => {
    if (timer > 0) return;
    const res = await resendOTPApi(email);
    if (!res) return;
    setTimer(20);
  };

  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          Verify OTP
          <span className="block w-16 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* OTP Input */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-app-text-muted text-sm text-center">
            Enter the 6-digit code we sent to your email
          </p>

          <InputOTP
            maxLength={6}
            value={value}
            onChange={(val) => setValue(val)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={submit}
            disabled={value.length !== 6}
            className="w-full bg-app-primary hover:bg-app-highlight transition-colors duration-200 text-app-bg font-medium rounded-lg py-2"
          >
            Verify
          </Button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-8 text-sm text-app-info underline">
          <Link
            to="/auth"
            className="hover:text-app-secondary transition-colors"
          >
            Back to Register
          </Link>
          <button
            onClick={resendOTP}
            disabled={timer > 0}
            className="hover:text-app-secondary transition-colors cursor-pointer disabled:opacity-50"
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
