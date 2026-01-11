"use client";
import Tabs from "@/src/components/Tabs";
import useAuthForm from "./useHook";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import Mail from "@/public/assets/svg/Mail";
import Button from "@/src/components/Button";
import Phone from "@/public/assets/svg/Phone";

const AuthForm = () => {
  const { activeTab, onTabChange, tabs } = useAuthForm();

  return (
    <div>
      <Tabs
        className="flex w-full "
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100">
        <div className="flex flex-col space-y-4">
          <Button
            variant="outlined"
            startAdornment={<Mail />}
            endAdornment={<ChevronRight />}
            className="py-4"
          >
            <div className="text-left">
              <div className="font-bold text-gray-900 text-base">
                Login with Email
              </div>
              <div className="text-sm text-gray-600">
                Use your email address
              </div>
            </div>
          </Button>
          <Button
            variant="outlined"
            startAdornment={<Phone/>}
            endAdornment={<ChevronRight />}
            className="py-4"
          >
            <div className="text-left">
              <div className="font-bold text-gray-900 text-base">
                Login with Phone
              </div>
              <div className="text-sm text-gray-600">Quick access with OTP</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
