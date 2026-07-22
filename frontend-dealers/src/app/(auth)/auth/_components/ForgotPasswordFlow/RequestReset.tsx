"use client";
import { useState } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import Back from "@/src/components/Back";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import toast from "react-hot-toast";

type RequestResetProps = {
  onBack: () => void;
  onSuccess: (email: string) => void;
};

export default function RequestReset({ onBack, onSuccess }: RequestResetProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email address is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        let errMsg = "Failed to request password reset";
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
        toast.success(result.message || "OTP sent to your email");
        onSuccess(email);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred");
      console.error("Forgot password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Back onBack={onBack} />
      
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900">Forgot Password</h3>
        <p className="text-sm text-gray-500">
          Enter your registered email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
          {isLoading ? "Sending OTP..." : "Send OTP"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </Button>
    </form>
  );
}
