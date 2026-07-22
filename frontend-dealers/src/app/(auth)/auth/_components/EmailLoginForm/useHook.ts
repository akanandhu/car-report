import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Capacitor } from "@capacitor/core";

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

    const platform = Capacitor.getPlatform();
    const isNative = platform === "android" || platform === "ios";

    if (isNative) {
      try {
        const apiUrl = platform === "android" 
          ? (process.env.NEXT_PUBLIC_API_URL_ANDROID || "http://10.0.2.2:3001")
          : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
          
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        if (!res.ok) {
          let errMsg = "Invalid email or password";
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
        if (result?.success && result?.data) {
          localStorage.setItem("accessToken", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          toast.success("Login successful");
          router.push("/");
          router.refresh();
        } else {
          throw new Error("Invalid response from login server");
        }
      } catch (error: any) {
        toast.error(error?.message || "An unexpected error occurred. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          toast.error("Invalid email or password");
        } else {
          toast.success("Login successful");
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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

