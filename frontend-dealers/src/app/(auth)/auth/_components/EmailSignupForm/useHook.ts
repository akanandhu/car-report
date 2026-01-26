import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
    formState: { errors },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  const onSubmit = async (data: EmailSignupFormData) => {
    setIsLoading(true);

    console.log("Email Signup:", data);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 2000);
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
