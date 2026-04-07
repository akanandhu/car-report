"use client";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import { EmailLoginFormPropsI } from "./types";
import useEmailLoginForm from "./useHook";
import Back from "@/src/components/Back";

const EmailLoginForm = ({ onBack }: EmailLoginFormPropsI) => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    mode,
    forgotStep,
    forgotEmail,
    isForgotLoading,
    handleStartForgot,
    handleBackToLogin,
    handleForgotSubmit,
    handleForgotChangeEmail,
    registerForgotEmail,
    registerForgotOtp,
    registerForgotReset,
    forgotEmailErrors,
    forgotOtpErrors,
    forgotResetErrors,
  } = useEmailLoginForm();

  if (mode === "forgot") {
    return (
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          handleForgotSubmit();
        }}
      >
        <Back onBack={onBack} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 font-medium">
              Reset your password
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {forgotStep === "email" &&
                "Enter your email to receive a one-time code."}
              {forgotStep === "otp" &&
                `We sent a code to ${forgotEmail || "your email"}.`}
              {forgotStep === "reset" &&
                "Create a new password to finish resetting."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleBackToLogin}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Back to Login
          </button>
        </div>

        {forgotStep === "email" && (
          <div className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              {...registerForgotEmail("email")}
              error={forgotEmailErrors.email?.message}
              disabled={isForgotLoading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="py-4 text-base"
              disabled={isForgotLoading}
            >
              <div className="flex items-center justify-center font-semibold">
                {isForgotLoading ? "Sending OTP..." : "Send OTP"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </Button>
          </div>
        )}

        {forgotStep === "otp" && (
          <div className="space-y-5">
            <Input
              label="Enter OTP"
              type="text"
              placeholder="123456"
              inputMode="numeric"
              {...registerForgotOtp("otp")}
              error={forgotOtpErrors.otp?.message}
              helperText="Check your inbox for the 6 digit code."
              disabled={isForgotLoading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="py-4 text-base"
              disabled={isForgotLoading}
            >
              <div className="flex items-center justify-center font-semibold">
                {isForgotLoading ? "Verifying..." : "Verify OTP"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </Button>

            <button
              type="button"
              onClick={handleForgotChangeEmail}
              className="text-sm text-slate-600 hover:text-slate-900 font-semibold"
              disabled={isForgotLoading}
            >
              Change email address
            </button>
          </div>
        )}

        {forgotStep === "reset" && (
          <div className="space-y-5">
            <Input
              label="New Password"
              type="password"
              placeholder="********"
              {...registerForgotReset("newPassword")}
              error={forgotResetErrors.newPassword?.message}
              helperText="At least 8 characters"
              disabled={isForgotLoading}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="********"
              {...registerForgotReset("confirmPassword")}
              error={forgotResetErrors.confirmPassword?.message}
              disabled={isForgotLoading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="py-4 text-base"
              disabled={isForgotLoading}
            >
              <div className="flex items-center justify-center font-semibold">
                {isForgotLoading ? "Resetting..." : "Reset Password"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </Button>
          </div>
        )}
      </form>
    );
  }

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
        placeholder="********"
        {...register("password")}
        error={errors.password?.message}
        disabled={isLoading}
      />

      <button
        type="button"
        onClick={handleStartForgot}
        className="text-sm font-semibold text-slate-700 hover:text-slate-900"
      >
        Forgot your password?
      </button>

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
