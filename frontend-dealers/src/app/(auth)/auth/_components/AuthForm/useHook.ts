import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Capacitor } from "@capacitor/core";
import { AuthI, AuthView } from "./types";

const tabs: AuthI[] = [
  {
    id: "login",
    label: "Login",
  },
  {
    id: "signup",
    label: "Sign Up",
  },
];

const useAuthForm = () => {
  const [activeTab, setActiveTab] = useState<AuthI["id"]>("login");
  const [currentView, setCurrentView] = useState<AuthView>("method-selection");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    const isNative = platform === "android" || platform === "ios";

    if (isNative) {
      if (localStorage.getItem("accessToken")) {
        router.push("/dashboard");
      }
    } else if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const onTabChange = (tab: AuthI["id"]) => {
    setActiveTab(tab);
    setCurrentView("method-selection");
  };

  const showEmailForm = () => {
    setCurrentView(activeTab === "login" ? "email-login" : "email-signup");
  };

  const showPhoneForm = () => {
    setCurrentView(activeTab === "login" ? "phone-login" : "phone-signup");
  };

  const backToMethodSelection = () => {
    setCurrentView("method-selection");
  };

  const onSignupSuccess = () => {
    setActiveTab("login");
    setCurrentView("email-login");
  };

  const showForgotPassword = () => {
    setCurrentView("forgot-password");
  };

  const onForgotPasswordSuccess = () => {
    setCurrentView("email-login");
  };

  return {
    activeTab,
    tabs,
    currentView,
    onTabChange,
    showEmailForm,
    showPhoneForm,
    backToMethodSelection,
    onSignupSuccess,
    showForgotPassword,
    onForgotPasswordSuccess,
  };
};




export default useAuthForm;
