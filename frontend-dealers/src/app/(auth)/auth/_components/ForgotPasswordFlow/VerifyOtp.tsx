"use client";
import { useState } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import Back from "@/src/components/Back";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import toast from "react-hot-toast";

type VerifyOtpProps = {
  email: string;
  onBack: () => void;
  onSuccess: (otp: string) => void;
};

export default function VerifyOtp({ email, onBack, onSuccess }: VerifyOtpProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Verification code (OTP) is required");
      return;
    }
    if (otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        let errMsg = "Invalid OTP code";
        try {
          const errJson = await res.json();
          if (errJson?.message) {
            errMsg = Array.isArray(errJson.message) ? errJson.message.join(", ") : errJson.message;
          }
        } catch {}
        throw new Error(errMsg);
      }

      const result = await res.json();
      if (result?.success) {
        toast.success(result.message || "OTP verified successfully");
        onSuccess(otp);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred");
      console.error("Verify OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Back onBack={onBack} />

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900">Verify Code</h3>
        <p className="text-sm text-gray-500">
          We've sent a verification code to <span className="font-semibold text-gray-700">{email}</span>.
        </p>
      </div>

      <Input
        label="Enter OTP"
        type="text"
        maxLength={6}
        placeholder="123456"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value);
          if (error) setError("");
        }}
        error={error}
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
          {isLoading ? "Verifying..." : "Verify Code"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </Button>
    </form>
  );
}
