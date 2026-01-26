"use client";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import { EmailLoginFormPropsI } from "./types";
import useEmailLoginForm from "./useHook";
import Back from "@/src/components/Back";

const EmailLoginForm = ({ onBack }: EmailLoginFormPropsI) => {
  const { errors, handleSubmit, isLoading, onSubmit, register } =
    useEmailLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Back onBack={onBack} />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
        disabled={isLoading}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register("password")}
        error={errors.password?.message}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        className="py-4 text-base"
      >
        <div className="flex items-center justify-center font-semibold">
          {isLoading ? "Logging in..." : "Login"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </Button>
    </form>
  );
};

export default EmailLoginForm;
