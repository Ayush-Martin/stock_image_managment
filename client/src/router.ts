// import { lazy } from "react";

//Auth Routes
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswrodPage";

type Route = {
  path: string;
  Component: React.ComponentType;
};

type Routes = Route[];

export const AuthRouter: Routes = [
  {
    path: "",
    Component: LoginRegisterPage,
  },
  {
    path: "otp",
    Component: OTPVerificationPage,
  },
  {
    path: "forget-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "reset-password",
    Component: ResetPasswordPage,
  },
];
