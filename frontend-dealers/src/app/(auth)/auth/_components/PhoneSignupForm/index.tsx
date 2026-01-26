"use client";
import Input from "@/src/components/Input";
import Checkbox from "@/src/components/Checkbox";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import { PhoneSignupFormPropsI } from "./types";
import usePhoneSignupForm from "./useHook";



const PhoneSignupForm = ({ onBack }: PhoneSignupFormPropsI) => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  } = usePhoneSignupForm();

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
        label="Phone Number"
        type="tel"
        placeholder="+91 98765 43210"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
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
        endAdornment={<ChevronRight className="w-5 h-5" />}
        className="py-4 text-base"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default PhoneSignupForm;

