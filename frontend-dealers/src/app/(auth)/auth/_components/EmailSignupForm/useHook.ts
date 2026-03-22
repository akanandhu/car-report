import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";

const emailSignupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    company: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),

    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

const useEmailSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  const onSubmit = async (data: EmailSignupFormData) => {
    if (isLoading) return;
    setIsLoading(true);

    const getErrorMessage = (responseBody: unknown) => {
      if (typeof responseBody === "string" && responseBody.trim()) {
        return responseBody;
      }
      if (!responseBody || typeof responseBody !== "object") {
        return "Signup failed. Please try again.";
      }
      const body = responseBody as {
        message?: string | string[];
        error?: string;
      };
      if (Array.isArray(body.message)) {
        return body.message.filter(Boolean).join(", ");
      }
      if (typeof body.message === "string" && body.message.trim()) {
        return body.message;
      }
      if (typeof body.error === "string" && body.error.trim()) {
        return body.error;
      }
      return "Signup failed. Please try again.";
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
      const url = `${baseUrl}/auth/register`;
      const payload = {
        name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        mobile: data.phoneNumber.trim(),
        // company: data.company?.trim() || undefined,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let responseBody: unknown = null;
      if (responseText) {
        try {
          responseBody = JSON.parse(responseText);
        } catch {
          responseBody = responseText;
        }
      }

      if (!response.ok) {
        if (response.status === 409) {
          toast.error(getErrorMessage(responseBody));
          return;
        }
        if (response.status === 429) {
          toast.error("Too many requests. Please try again shortly.");
          return;
        }
        toast.error(getErrorMessage(responseBody));
        return;
      }

      if (responseBody && typeof responseBody === "object") {
        const result = responseBody as { success?: boolean; message?: string };
        if (result.success === false) {
          toast.error(result.message ?? "Signup failed. Please try again.");
          return;
        }
      }

      toast.success("Account created successfully. Please log in.");
      reset();
      router.push("/auth");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Unable to sign up right now. Please check your connection.");
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
