'use client'
import { useState } from "react";
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

  return {
    activeTab,
    tabs,
    currentView,
    onTabChange,
    showEmailForm,
    showPhoneForm,
    backToMethodSelection,
  };
};

export default useAuthForm;
