"use client";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import { PhoneLoginFormPropsI } from "./types";
import usePhoneLoginForm from "./useHook";

const PhoneLoginForm = ({ onBack }: PhoneLoginFormPropsI) => {
  const { register, handleSubmit, errors, isLoading, onSubmit } =
    usePhoneLoginForm();

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
        label="Phone Number"
        type="tel"
        placeholder="+91 98765 43210"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
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
          {isLoading ? "Sending OTP..." : "Login"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </Button>
    </form>
  );
};

export default PhoneLoginForm;
