"use client";
import { useState, FormEvent } from "react";
import Input from "@/src/components/Input";
import Checkbox from "@/src/components/Checkbox";
import Button from "@/src/components/Button";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import { PhoneSignupFormPropsI } from "./types";

const PhoneSignupForm = ({ onBack }: PhoneSignupFormPropsI) => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
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

    // Your form submission logic here
    console.log("Phone Signup:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isFormValid =
    formData.fullName &&
    formData.phoneNumber &&
    formData.password &&
    formData.confirmPassword &&
    termsAccepted;

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
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Raj Kumar"
        value={formData.fullName}
        onChange={handleChange}
        required
        disabled={isLoading}
      />

      <Input
        label="Company/Dealership (Optional)"
        type="text"
        name="company"
        placeholder="Premium Auto Assessments"
        value={formData.company}
        onChange={handleChange}
        disabled={isLoading}
      />

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

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        helperText="At least 8 characters"
        required
        disabled={isLoading}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={isLoading}
      />

      <Checkbox
        id="terms"
        label="I agree to the Terms of Service and Privacy Policy"
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        required
        disabled={isLoading}
        containerClassName="pt-2"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isFormValid || isLoading}
        endAdornment={<ChevronRight className="w-5 h-5" />}
        className="py-4 text-base"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default PhoneSignupForm;

