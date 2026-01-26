import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const phoneLoginSchema = z.object({
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

type PhoneLoginFormData = z.infer<typeof phoneLoginSchema>;

const usePhoneLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneLoginFormData>({
    resolver: zodResolver(phoneLoginSchema),
  });

  const onSubmit = async (data: PhoneLoginFormData) => {
    setIsLoading(true);

    console.log("Phone Login:", data);

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

export default usePhoneLoginForm;
