import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const emailLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const forgotEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const forgotOtpSchema = z.object({
  otp: z.string().min(6, "OTP is required").max(6, "Please enter a valid OTP"),
});

const forgotResetSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailLoginFormData = z.infer<typeof emailLoginSchema>;
type ForgotEmailData = z.infer<typeof forgotEmailSchema>;
type ForgotOtpData = z.infer<typeof forgotOtpSchema>;
type ForgotResetData = z.infer<typeof forgotResetSchema>;

type ForgotStep = "email" | "otp" | "reset";
type Mode = "login" | "forgot";

const parseErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    if (data?.message && typeof data.message === "string") {
      return data.message;
    }
    if (data?.error && typeof data.error === "string") {
      return data.error;
    }
  } catch {
    return "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
};

const useEmailLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
  });

  const {
    register: registerForgotEmail,
    handleSubmit: handleForgotEmailSubmit,
    formState: { errors: forgotEmailErrors },
    reset: resetForgotEmail,
  } = useForm<ForgotEmailData>({
    resolver: zodResolver(forgotEmailSchema),
  });

  const {
    register: registerForgotOtp,
    handleSubmit: handleForgotOtpSubmit,
    formState: { errors: forgotOtpErrors },
    reset: resetForgotOtp,
  } = useForm<ForgotOtpData>({
    resolver: zodResolver(forgotOtpSchema),
  });

  const {
    register: registerForgotReset,
    handleSubmit: handleForgotResetSubmit,
    formState: { errors: forgotResetErrors },
    reset: resetForgotReset,
  } = useForm<ForgotResetData>({
    resolver: zodResolver(forgotResetSchema),
  });

  const resetForgotFlow = () => {
    setForgotStep("email");
    setForgotEmail("");
    setForgotOtp("");
    resetForgotEmail();
    resetForgotOtp();
    resetForgotReset();
  };

  const handleStartForgot = () => {
    setMode("forgot");
    setForgotStep("email");
  };

  const handleBackToLogin = () => {
    setMode("login");
    resetForgotFlow();
  };

  const onSubmit = async (data: EmailLoginFormData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      } as const);

      if (!res) {
        toast.error("Login could not be completed. Please try again.", {
          position: "top-center",
          className: "bg-destructive text-black",
        });
        return;
      }

      if (res.error) {
        if (res.error === "CredentialsSignin") {
          toast.error("Invalid email or password.", {
            className: "bg-destructive text-destructive-foreground",
          });
          return;
        }
        toast.error(
          "Login failed. Please check your credentials and try again.",
        );
        return;
      }

      if (res.ok) {
        router.push("/dashboard");
        return;
      }

      toast("Login failed. Please try again.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordResetOtp = async (email: string) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${url}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }

    return response.json().catch(() => ({}));
  };

  const verifyPasswordResetOtp = async (email: string, otp: string) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${url}/auth/verify-reset-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    console.log("OTP verification response:", response);
    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }

    return response.json().catch(() => ({}));
  };

  const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
  ) => {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }

    return response.json().catch(() => ({}));
  };

  const onSubmitForgotEmail = async ({ email }: ForgotEmailData) => {
    if (isForgotLoading) return;
    setIsForgotLoading(true);

    try {
      const response = await requestPasswordResetOtp(email);
      if (response?.success) {
        setForgotEmail(email);
        setForgotStep("otp");
        toast.success(response?.message || "OTP sent to your email.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send OTP. Please try again.",
      );
    } finally {
      setIsForgotLoading(false);
    }
  };

  const onSubmitForgotOtp = async ({ otp }: ForgotOtpData) => {
    if (!forgotEmail) {
      toast.error("Please enter your email first.");
      setForgotStep("email");
      return;
    }
    if (isForgotLoading) return;
    setIsForgotLoading(true);

    try {
      const response = await verifyPasswordResetOtp(forgotEmail, otp);
      if(response?.status === 200){
        setForgotOtp(otp);
        setForgotStep("reset");
        toast.success(response?.message || "OTP verified. You can reset your password.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to verify OTP. Please try again.",
      );
    } finally {
      setIsForgotLoading(false);
    }
  };

  const onSubmitForgotReset = async ({ newPassword }: ForgotResetData) => {
    if (!forgotEmail || !forgotOtp) {
      toast.error("Please verify your OTP before resetting.");
      setForgotStep(!forgotEmail ? "email" : "otp");
      return;
    }
    if (isForgotLoading) return;
    setIsForgotLoading(true);

    try {
      await resetPassword(forgotEmail, forgotOtp, newPassword);
      toast.success("Password updated successfully.", {
        className: "bg-slate-700 text-white",
      });
      handleBackToLogin();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to reset password. Please try again.",
      );
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleForgotSubmit = () => {
    if (forgotStep === "email") {
      handleForgotEmailSubmit(onSubmitForgotEmail)();
      return;
    }
    if (forgotStep === "otp") {
      handleForgotOtpSubmit(onSubmitForgotOtp)();
      return;
    }
    handleForgotResetSubmit(onSubmitForgotReset)();
  };

  const handleForgotChangeEmail = () => {
    setForgotStep("email");
    setForgotOtp("");
  };

  return {
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
  };
};

export default useEmailLoginForm;
