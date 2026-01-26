"use client";
import Tabs from "@/src/components/Tabs";
import useAuthForm from "./useHook";
import MethodSelection from "../MethodSelection";
import EmailLoginForm from "../EmailLoginForm";
import PhoneLoginForm from "../PhoneLoginForm";
import EmailSignupForm from "../EmailSignupForm";
import PhoneSignupForm from "../PhoneSignupForm";

const AuthForm = () => {
  const {
    activeTab,
    onTabChange,
    tabs,
    currentView,
    showEmailForm,
    showPhoneForm,
    backToMethodSelection,
  } = useAuthForm();

  const renderContent = () => {
    switch (currentView) {
      case "email-login":
        return <EmailLoginForm onBack={backToMethodSelection} />;
      case "phone-login":
        return <PhoneLoginForm onBack={backToMethodSelection} />;
      case "email-signup":
        return <EmailSignupForm onBack={backToMethodSelection} />;
      case "phone-signup":
        return <PhoneSignupForm onBack={backToMethodSelection} />;
      case "method-selection":
      default:
        return (
          <MethodSelection
            isSignup={activeTab === "signup"}
            onSelectEmail={showEmailForm}
            onSelectPhone={showPhoneForm}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs
        className="flex w-full mb-6"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className="bg-white rounded-3xl shadow-xl px-8 py-8 space-y-6 border border-gray-100 w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthForm;
