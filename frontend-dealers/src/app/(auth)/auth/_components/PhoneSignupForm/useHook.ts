import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const phoneSignupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    company: z.string().optional(),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
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

type PhoneSignupFormData = z.infer<typeof phoneSignupSchema>;

const usePhoneSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneSignupFormData>({
    resolver: zodResolver(phoneSignupSchema),
  });

  const onSubmit = async (data: PhoneSignupFormData) => {
    setIsLoading(true);

    console.log("Phone Signup:", data);

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

export default usePhoneSignupForm;
