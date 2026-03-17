import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("SignIn Response:", res);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }

    // setTimeout(() => {
    //   setIsLoading(false);
    //   router.push("/");
    // }, 2000);
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
