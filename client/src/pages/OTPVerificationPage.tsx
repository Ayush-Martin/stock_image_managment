import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link } from "react-router-dom";

const OTPVerificationPage = () => {
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

          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button className="w-full bg-app-primary hover:bg-app-highlight transition-colors duration-200 text-app-bg font-medium rounded-lg py-2">
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
          <button className="hover:text-app-secondary transition-colors cursor-pointer">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
