"use client";
import { useState, FormEvent } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import { PhoneLoginFormPropsI } from "./types";

const PhoneLoginForm = ({ onBack }: PhoneLoginFormPropsI) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Phone Login:", formData);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isFormValid = formData.phoneNumber;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold mb-4 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        placeholder="+91 98765 43210"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isFormValid || isLoading}
        endAdornment={<ChevronRight className="w-5 h-5" />}
        className="py-4 text-base"
      >
        {isLoading ? "Sending OTP..." : "Login"}
      </Button>
    </form>
  );
};

export default PhoneLoginForm;

