"use client";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import Mail from "@/public/assets/svg/Mail";
import Phone from "@/public/assets/svg/Phone";
import { MethodSelectionPropsI } from "./types";

const MethodSelection = ({
  isSignup,
  onSelectEmail,
  onSelectPhone,
}: MethodSelectionPropsI) => {
  return (
    <div className="flex flex-col space-y-4">
      {isSignup && (
        <h2 className="text-base font-medium text-gray-900 mb-4">
          How would you like to sign up?
        </h2>
      )}

      <Button
        variant="outlined"
        startAdornment={<Mail />}
        endAdornment={<ChevronRight />}
        className="py-4 px-5"
        onClick={onSelectEmail}
      >
        <div className="text-left">
          <div className="font-bold text-gray-900 text-base">
            {isSignup ? "Sign Up with Email" : "Login with Email"}
          </div>
          <div className="text-sm text-gray-600">
            {isSignup ? "Create your account" : "Use your email address"}
          </div>
        </div>
      </Button>

      <Button
        variant="outlined"
        startAdornment={<Phone />}
        endAdornment={<ChevronRight />}
        className="py-4 px-5"
        onClick={onSelectPhone}
      >
        <div className="text-left">
          <div className="font-bold text-gray-900 text-base">
            {isSignup ? "Sign Up with Phone" : "Login with Phone"}
          </div>
          <div className="text-sm text-gray-600">
            {isSignup ? "Quick and easy signup" : "Quick access with OTP"}
          </div>
        </div>
      </Button>

    </div>
  );
};

export default MethodSelection;

