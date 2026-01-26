"use client";
import Input from "@/src/components/Input";
import Checkbox from "@/src/components/Checkbox";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import { EmailSignupFormPropsI } from "./types";
import useEmailSignupForm from "./useHook";
import Back from "@/src/components/Back";

const EmailSignupForm = ({ onBack }: EmailSignupFormPropsI) => {
  const { register, handleSubmit, errors, isLoading, onSubmit } =
    useEmailSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Back onBack={onBack} />
      <Input
        label="Full Name"
        type="text"
        placeholder="Raj Kumar"
        {...register("fullName")}
        error={errors.fullName?.message}
        disabled={isLoading}
      />

      <Input
        label="Company/Dealership (Optional)"
        type="text"
        placeholder="Premium Auto Assessments"
        {...register("company")}
        error={errors.company?.message}
        disabled={isLoading}
      />

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
        helperText="At least 8 characters"
        disabled={isLoading}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
      />

      <Checkbox
        id="terms"
        label="I agree to the Terms of Service and Privacy Policy"
        {...register("terms")}
        disabled={isLoading}
        containerClassName="pt-2"
      />
      {errors.terms && (
        <p className="text-sm text-red-600 -mt-3">{errors.terms.message}</p>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        className="py-4 text-base"
      >
        <div className="flex items-center justify-center font-semibold">
          {isLoading ? "Creating account..." : "Create Account"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </Button>
    </form>
  );
};

export default EmailSignupForm;
