import {
  EmailValidationRule,
  PasswordValidationRule,
} from "@/utils/validationRules";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import LoginRegisterContext from "@/context/LoginRegisterContext";
import ErrorText from "../common/ErrorText";

const LoginSchema = z.object({
  email: EmailValidationRule,
  password: PasswordValidationRule,
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
  const { handleLogin } = useContext(LoginRegisterContext)!;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginSchemaType) => {
    handleLogin(data.email, data.password);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="email" className="text-app-text-muted">
          Email
        </label>
        <Input
          placeholder="abc@gmail.com"
          id="email"
          type="email"
          {...register("email")}
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
        {errors.email?.message && <ErrorText error={errors.email?.message} />}
      </div>

      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="password" className="text-app-text-muted">
          Password
        </label>
        <Input
          type="password"
          {...register("password")}
          placeholder="********"
          id="password"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
        {errors.password?.message && (
          <ErrorText error={errors.password?.message} />
        )}
      </div>

      <Button
        className="bg-app-primary hover:bg-app-info transition-colors duration-200 text-app-bg font-medium rounded-lg py-2 disabled:bg-app-border cursor-pointer"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default Login;
