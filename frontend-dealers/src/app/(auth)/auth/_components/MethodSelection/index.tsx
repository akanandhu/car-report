"use client";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import Mail from "@/public/assets/svg/Mail";
import Phone from "@/public/assets/svg/Phone";
import Divider from "@/src/components/Divider";
import Google from "@/public/assets/svg/Google";
import Apple from "@/public/assets/svg/Apple";
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
  );
};

export default MethodSelection;

