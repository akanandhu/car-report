"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionI, CarEvaluationFormDataI } from "./types";

const SECTIONS: SectionI[] = [
  { id: "seller", label: "Seller Info" },
  { id: "registration", label: "Registration" },
  { id: "specs", label: "Car Specs" },
  { id: "documents", label: "Documents" },
  { id: "exterior", label: "Exterior" },
];

const useCarEvaluationForm = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<CarEvaluationFormDataI>({});

  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem("car-evaluation-draft");
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  const handleNext = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDataChange = (newData: Partial<CarEvaluationFormDataI>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem("car-evaluation-draft", JSON.stringify(formData));
    alert("Draft saved successfully!");
  };

  const handleSubmit = () => {
    // Generate evaluation object
    const evaluation = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "in-sale" as const,
      ...formData,
    };

    // Save to evaluations list
    const savedCars = localStorage.getItem("car-evaluations");
    const cars = savedCars ? JSON.parse(savedCars) : [];
    cars.unshift(evaluation);
    localStorage.setItem("car-evaluations", JSON.stringify(cars));

    // Clear draft
    localStorage.removeItem("car-evaluation-draft");

    // Navigate back to home
    router.push("/");
  };

  const handleBack = () => {
    router.push("/");
  };

  return {
    sections: SECTIONS,
    currentSection,
    formData,
    progress,
    handleNext,
    handlePrevious,
    handleSectionChange,
    handleDataChange,
    handleSaveDraft,
    handleSubmit,
    handleBack,
  };
};

export default useCarEvaluationForm;

