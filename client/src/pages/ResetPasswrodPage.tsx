import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          Reset Password
          <span className="block w-24 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <p className="text-app-text-muted text-sm text-center">
            Enter your new password below.
          </p>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="newPassword" className="text-app-text-muted">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
          </div>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="confirmPassword" className="text-app-text-muted">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
          </div>

          <Button className="w-full bg-app-primary hover:bg-app-highlight transition-colors duration-200 text-app-bg font-medium rounded-lg py-2">
            Reset Password
          </Button>
        </div>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-8 text-sm text-app-info underline">
          <Link
            to="/auth"
            className="hover:text-app-secondary transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
