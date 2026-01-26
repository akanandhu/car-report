import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const emailLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type EmailLoginFormData = z.infer<typeof emailLoginSchema>;

const useEmailLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
  });

  const onSubmit = async (data: EmailLoginFormData) => {
    setIsLoading(true);

    console.log("Email Login:", data);

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

export default useEmailLoginForm;
