'use client'
import { useState } from "react";
import { AuthI } from "./types";

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

  const onTabChange = (tab: AuthI["id"]) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    tabs,
    onTabChange
  };
};

export default useAuthForm;
