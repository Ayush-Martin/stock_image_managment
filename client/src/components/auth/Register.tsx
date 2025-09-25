import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Register = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="username" className="text-app-text-muted">
          Username
        </label>
        <Input
          placeholder="user"
          id="username"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
      </div>

      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="email" className="text-app-text-muted">
          Email
        </label>
        <Input
          placeholder="abc@gmail.com"
          id="email"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
      </div>

      <div className="flex gap-1 flex-col text-sm">
        <label htmlFor="password" className="text-app-text-muted">
          Password
        </label>
        <Input
          type="password"
          placeholder="Keklf@121l_0"
          id="password"
          className="bg-transparent border border-app-border-muted text-app-text placeholder:text-app-text-muted focus:ring-2 focus:ring-app-highlight focus:border-app-highlight"
        />
      </div>

      <Button className="bg-app-primary hover:bg-app-highlight transition-colors duration-200 text-app-bg font-medium rounded-lg py-2">
        Register
      </Button>
    </div>
  );
};

export default Register;
