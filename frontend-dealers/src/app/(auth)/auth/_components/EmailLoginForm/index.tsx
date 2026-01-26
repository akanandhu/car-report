"use client";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import { EmailLoginFormPropsI } from "./types";
import useEmailLoginForm from "./useHook";

const EmailLoginForm = ({ onBack }: EmailLoginFormPropsI) => {
  const { errors, handleSubmit, isLoading, onSubmit, register } =
    useEmailLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold mb-4 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

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
        endAdornment={<ChevronRight className="w-5 h-5" />}
        className="py-4 text-base"
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default EmailLoginForm;
