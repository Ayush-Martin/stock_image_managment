import { loginWithPassword, registerApi } from "@/api/auth.api";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import LoginRegisterContext from "@/context/LoginRegisterContext";
import { login } from "@/features/auth/slice/userSlice";
import { AppDispatch } from "@/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (email: string, password: string) => {
    const data = await loginWithPassword(email, password);
    if (!data) return;
    dispatch(login(data));
    navigate(from, { replace: true });
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await registerApi(username, email, password);
    if (!res) return;
    navigate("/auth/otp", {
      state: {
        email,
        forAction: "register",
      },
    });
  };

  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          {isLogin ? "Login" : "Register"}
          <span className="block w-12 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Form */}
        <LoginRegisterContext.Provider value={{ handleLogin, handleRegister }}>
          {isLogin ? <Login /> : <Register />}
        </LoginRegisterContext.Provider>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-8 text-sm text-app-info underline">
          <button
            className="hover:text-app-secondary transition-colors cursor-pointer"
            onClick={() => setIsLogin((p) => !p)}
          >
            {isLogin ? "register" : "login"}
          </button>

          <Link
            to="/auth/forgetPassword"
            className="hover:text-app-secondary transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
