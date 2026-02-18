import { InputHTMLAttributes } from "react";

export type RadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  containerClassName?: string;
};

