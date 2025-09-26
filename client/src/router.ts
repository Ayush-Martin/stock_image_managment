//Auth Routes
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import HomePage from "./pages/HomePage";
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
    path: "forgetPassword",
    Component: ForgotPasswordPage,
  },
  {
    path: "resetPassword",
    Component: ResetPasswordPage,
  },
];

export const UserRouter: Routes = [
  {
    path: "",
    Component: HomePage,
  },
  {
    path: "changePassword",
    Component: ChangePasswordPage,
  },
];
