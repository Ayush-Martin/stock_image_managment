import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          {isLogin ? "Login" : "Register"}
          <span className="block w-12 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Form */}
        {isLogin ? <Login /> : <Register />}

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-8 text-sm text-app-info underline">
          <button
            className="hover:text-app-secondary transition-colors cursor-pointer"
            onClick={() => setIsLogin((p) => !p)}
          >
            {isLogin ? "register" : "login"}
          </button>

          <Link
            to="/auth/forget-password"
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
