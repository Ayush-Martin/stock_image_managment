import {
  EmailValidationRule,
  PasswordValidationRule,
  UsernameValidationRule,
} from "@/utils/validationRules";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import LoginRegisterContext from "@/context/LoginRegisterContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import ErrorText from "../common/ErrorText";

const RegisterSchema = z.object({
  email: EmailValidationRule,
  password: PasswordValidationRule,
  username: UsernameValidationRule,
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register = () => {
  const { handleRegister } = useContext(LoginRegisterContext)!;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    handleRegister(data.username, data.email, data.password);
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="username" className="text-app-text-muted">
          Username
        </label>
        <Input
          {...register("username")}
          placeholder="user"
          id="username"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
        {errors.username && <ErrorText error={errors.username.message!} />}
      </div>

      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="email" className="text-app-text-muted">
          Email
        </label>
        <Input
          {...register("email")}
          placeholder="abc@gmail.com"
          id="email"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
        {errors.email && <ErrorText error={errors.email.message!} />}
      </div>

      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="password" className="text-app-text-muted">
          Password
        </label>
        <Input
          {...register("password")}
          type="password"
          placeholder="*******"
          id="password"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
        {errors.password && <ErrorText error={errors.password.message!} />}
      </div>

      <Button
        className="bg-app-primary hover:bg-app-info transition-colors duration-200 text-app-bg font-medium rounded-lg py-2 disabled:bg-app-border cursor-pointer"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Registering in..." : "Register"}
      </Button>
    </form>
  );
};

export default Register;
