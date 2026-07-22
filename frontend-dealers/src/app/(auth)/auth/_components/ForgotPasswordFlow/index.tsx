"use client";
import { useState } from "react";
import RequestReset from "./RequestReset";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";
import { ForgotPasswordFlowPropsI } from "./types";

export default function ForgotPasswordFlow({ onBack, onSuccess }: ForgotPasswordFlowPropsI) {
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleRequestSuccess = (emailVal: string) => {
    setEmail(emailVal);
    setStep("verify");
  };

  const handleVerifySuccess = (otpVal: string) => {
    setOtp(otpVal);
    setStep("reset");
  };

  switch (step) {
    case "verify":
      return (
        <VerifyOtp
          email={email}
          onBack={() => setStep("request")}
          onSuccess={handleVerifySuccess}
        />
      );
    case "reset":
      return (
        <ResetPassword
          email={email}
          otp={otp}
          onBack={() => setStep("verify")}
          onSuccess={onSuccess}
        />
      );
    case "request":
    default:
      return (
        <RequestReset
          onBack={onBack}
          onSuccess={handleRequestSuccess}
        />
      );
  }
}
