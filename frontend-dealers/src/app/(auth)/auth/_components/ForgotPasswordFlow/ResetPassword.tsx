"use client";
import { useState } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import Back from "@/src/components/Back";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import toast from "react-hot-toast";

type ResetPasswordProps = {
  email: string;
  otp: string;
  onBack: () => void;
  onSuccess: () => void;
};

export default function ResetPassword({ email, otp, onBack, onSuccess }: ResetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validate = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    if (!password) {
      newErrors.password = "New password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });

      if (!res.ok) {
        let errMsg = "Failed to reset password";
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
        toast.success(result.message || "Password reset successfully");
        onSuccess();
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred");
      console.error("Reset password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Back onBack={onBack} />

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900">Set New Password</h3>
        <p className="text-sm text-gray-500">
          Create a secure new password for your account.
        </p>
      </div>

      <Input
        label="New Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
        }}
        error={errors.password}
        helperText="At least 8 characters"
        disabled={isLoading}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }}
        error={errors.confirmPassword}
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
          {isLoading ? "Resetting..." : "Confirm"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </Button>
    </form>
  );
}
