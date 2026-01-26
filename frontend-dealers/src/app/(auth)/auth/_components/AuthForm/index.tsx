"use client";
import Tabs from "@/src/components/Tabs";
import useAuthForm from "./useHook";
import MethodSelection from "../MethodSelection";
import EmailLoginForm from "../EmailLoginForm";
import PhoneLoginForm from "../PhoneLoginForm";
import EmailSignupForm from "../EmailSignupForm";
import PhoneSignupForm from "../PhoneSignupForm";
import Divider from "@/src/components/Divider";
import Button from "@/src/components/Button";
import Google from "@/public/assets/svg/Google";
import Apple from "@/public/assets/svg/Apple";

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
        <Divider className="my-2">
          <span className="px-3 bg-white text-gray-600 text-sm font-medium">
            Or continue with
          </span>
        </Divider>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="outlined" className="py-4 flex-col gap-2">
            <div className="flex flex-col gap-2 items-center">
              <Google width={28} height={28} />
              <span className="font-semibold text-gray-900">Google</span>
            </div>
          </Button>
          <Button variant="outlined" className="py-4 flex-col gap-2">
            <div className="flex flex-col gap-2 items-center">
              <Apple />
              <span className="font-semibold text-gray-900">Apple</span>
            </div>
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4 px-10">
          By continuing, you agree to our{" "}
          <span className="font-semibold text-gray-900">Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
