import { changePassword } from "@/api/auth.api";
import ErrorText from "@/components/common/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IChangePasswordSchema,
  ChangePasswordSchema,
} from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const {
    register,
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
  } = useForm<IChangePasswordSchema>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const submit = async (data: IChangePasswordSchema) => {
    const res = await changePassword(data.currentPassword, data.newPassword);
    if (!res) return;
    navigate(-1);
  };

  return (
    <div className="bg-app-bg h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-app-bg-secondary rounded-2xl p-8 border border-app-border-muted shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-app-text mb-6">
          Change Password
          <span className="block w-28 h-[2px] bg-app-highlight mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
          <p className="text-app-text-muted text-sm text-center">
            Enter your current password and choose a new one.
          </p>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="oldPassword" className="text-app-text-muted">
              Old Password
            </label>
            <Input
              {...register("currentPassword")}
              id="oldPassword"
              type="password"
              placeholder="Enter old password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
            {errors.currentPassword && (
              <ErrorText error={errors.currentPassword.message!} />
            )}
          </div>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="newPassword" className="text-app-text-muted">
              New Password
            </label>
            <Input
              {...register("newPassword")}
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
            {errors.newPassword && (
              <ErrorText error={errors.newPassword.message!} />
            )}
          </div>

          <div className="flex gap-1 flex-col text-sm">
            <label htmlFor="confirmNewPassword" className="text-app-text-muted">
              Confirm New Password
            </label>
            <Input
              {...register("confirmNewPassword")}
              id="confirmNewPassword"
              type="password"
              placeholder="Enter confirm new password"
              className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
            />
            {errors.confirmNewPassword && (
              <ErrorText error={errors.confirmNewPassword.message!} />
            )}
          </div>

          <Button
            className="w-full  bg-app-primary hover:bg-app-highlight transition-colors duration-200 text-app-bg font-medium rounded-lg py-2"
            disabled={!isValid || isSubmitting}
          >
            Change Password
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

export default ChangePasswordPage;
