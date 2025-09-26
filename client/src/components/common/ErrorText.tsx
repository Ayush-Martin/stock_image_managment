import { FC } from "react";

interface IErrorTextProps {
  error: string;
}

const ErrorText: FC<IErrorTextProps> = ({ error }) => {
  return <p className="text-sm text-app-danger">{error}</p>;
};

export default ErrorText;
