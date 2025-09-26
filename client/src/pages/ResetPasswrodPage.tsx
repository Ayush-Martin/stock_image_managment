import ErrorText from "@/components/common/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosPostRequest } from "@/config/axios";
import { successPopup } from "@/utils/popup";
import { PasswordValidationRule } from "@/utils/validationRules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import z from "zod";

const ResetPasswordSchema = z
  .object({
    password: PasswordValidationRule,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password == confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email } = location.state || {};

  useEffect(() => {
    if (!email) {
      navigate("/auth");
    }
  });

  const {
    register,
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
  } = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const submit = async (data: ResetPasswordSchemaType) => {
    const res = await axiosPostRequest("/auth/resetPassword", {
      password: data.password,
      email,
    });
    if (!res) return;
    successPopup(res.message || "Password is changed");
    navigate("/auth");
  };

  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          Reset Password
          <span className="block w-24 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
          <p className="text-app-text-muted text-sm text-center">
            Enter your new password below.
          </p>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="newPassword" className="text-app-text-muted">
              New Password
            </label>
            <Input
              {...register("password")}
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
            {errors.password && <ErrorText error={errors.password.message!} />}
          </div>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="confirmPassword" className="text-app-text-muted">
              Confirm Password
            </label>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
            {errors.confirmPassword && (
              <ErrorText error={errors.confirmPassword.message!} />
            )}
          </div>

          <Button
            className="w-full  bg-app-primary hover:bg-app-highlight transition-colors duration-200 text-app-bg font-medium rounded-lg py-2"
            disabled={!isValid || isSubmitting}
          >
            Reset Password
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

export default ResetPasswordPage;
