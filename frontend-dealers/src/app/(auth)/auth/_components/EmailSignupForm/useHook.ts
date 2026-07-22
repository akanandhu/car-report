import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import toast from "react-hot-toast";

const emailSignupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

const useEmailSignupForm = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  const onSubmit = async (data: EmailSignupFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          mobile: data.mobile,
          password: data.password,
        }),
      });

      if (!res.ok) {
        let errMsg = "Failed to register user";
        try {
          const errJson = await res.json();
          if (errJson?.message) {
            if (Array.isArray(errJson.message)) {
              errMsg = errJson.message.join(", ");
            } else {
              errMsg = errJson.message;
            }
          }
        } catch {}
        throw new Error(errMsg);
      }

      const result = await res.json();
      if (result && result.success) {
        toast.success("User registered successfully");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Invalid response from registration server");
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  };
};

export default useEmailSignupForm;

