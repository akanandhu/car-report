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
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      } as const);

      if (!res) {
        toast.error("Login could not be completed. Please try again.",{
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
        toast.error("Login failed. Please check your credentials and try again.");
        return;
      }

      if (res.ok) {
        router.push("/dashboard");
        return;
      }

      toast("Login failed. Please try again.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally{
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

export default useEmailLoginForm;
