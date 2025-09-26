import ErrorText from "@/components/common/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosPostRequest } from "@/config/axios";
import { successPopup } from "@/utils/popup";
import { EmailValidationRule } from "@/utils/validationRules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

const ForgetPasswordSchema = z.object({
  email: EmailValidationRule,
});

type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
  } = useForm<ForgetPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const submit = async (data: ForgetPasswordSchemaType) => {
    const res = await axiosPostRequest("/auth/forgetPassword", {
      email: data.email,
    });
    if (!res) return;
    successPopup(res.message || "OTP sent to your email");
    navigate("/auth/otp", {
      state: {
        forAction: "resetPassword",
        email: data.email,
      },
    });
  };

  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          Forgot Password
          <span className="block w-20 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
          <p className="text-app-text-muted text-sm text-center">
            Enter your registered email. We’ll send you an OTP to reset your
            password.
          </p>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="email" className="text-app-text-muted">
              Email
            </label>
            <Input
              {...register("email")}
              placeholder="you@example.com"
              id="email"
              type="email"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
            {errors.email && <ErrorText error={errors.email.message!} />}
          </div>

          <Button
            className="w-full bg-app-primary hover:bg-app-info transition-colors duration-200 text-app-bg font-medium rounded-lg py-2 disabled:bg-app-border cursor-pointer "
            disabled={!isValid || isSubmitting}
          >
            Send OTP
          </Button>
        </form>

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

export default ForgotPasswordPage;
