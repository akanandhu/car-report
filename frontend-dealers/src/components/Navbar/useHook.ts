import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const useNavbar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const res = await signOut({ redirect: false });
      if (res?.url) {
        router.push("/auth");
        return;
      }
      toast.error("Logout failed. Please try again.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { onLogout, isLoggingOut };
};

export default useNavbar;
