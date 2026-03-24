"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SectionI, FormDataI } from "./types";
import { fetchDocumentGroups } from "@/src/networks/document-groups";
import { fetchFormFields } from "@/src/networks/form-fields";
import { FormFieldI } from "@/src/networks/form-fields/types";
import { DocumentGroupI } from "@/src/networks/document-groups/types";

const useCarEvaluationForm = () => {
  const router = useRouter();

  const [sections, setSections] = useState<SectionI[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormDataI>({});
  const [currentFields, setCurrentFields] = useState<FormFieldI[]>([]);

  const [loading, setLoading] = useState(true);
  const [fieldsLoading, setFieldsLoading] = useState(false);

  // Track the raw document groups (needed for IDs when fetching fields)
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupI[]>([]);

  const progress =
    sections.length > 0
      ? ((currentSection + 1) / sections.length) * 100
      : 0;

  // Fetch document groups on mount
  useEffect(() => {
    let cancelled = false;

    const loadGroups = async () => {
      try {
        setLoading(true);
        const groups = await fetchDocumentGroups();

        if (cancelled) return;

        // Sort by order and filter enabled
        const sorted = groups
          .filter((g) => g.isEnabled)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setDocumentGroups(sorted);
        setSections(
          sorted.map((g) => ({
            id: g.id,
            label: g.name,
          }))
        );
      } catch (error) {
        console.error("Failed to load document groups:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadGroups();

    // Load draft from localStorage
    const draft = localStorage.getItem("car-evaluation-draft");
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch form fields when section changes
  const loadFields = useCallback(
    async (sectionIndex: number) => {
      if (documentGroups.length === 0) return;

      const group = documentGroups[sectionIndex];
      if (!group) return;

      try {
        setFieldsLoading(true);
        const result = await fetchFormFields(group.id);
        setCurrentFields(result.fields);
      } catch (error) {
        console.error("Failed to load form fields:", error);
        setCurrentFields([]);
      } finally {
        setFieldsLoading(false);
      }
    },
    [documentGroups]
  );

  // Load fields whenever section changes or documentGroups are ready
  useEffect(() => {
    if (documentGroups.length > 0) {
      loadFields(currentSection);
    }
  }, [currentSection, documentGroups, loadFields]);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
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

  const handleDataChange = (newData: Partial<FormDataI>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem("car-evaluation-draft", JSON.stringify(formData));
    alert("Draft saved successfully!");
  };

  const handleSubmit = () => {
    const evaluation = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "in-sale" as const,
      ...formData,
    };

    const savedCars = localStorage.getItem("car-evaluations");
    const cars = savedCars ? JSON.parse(savedCars) : [];
    cars.unshift(evaluation);
    localStorage.setItem("car-evaluations", JSON.stringify(cars));

    localStorage.removeItem("car-evaluation-draft");
    router.push("/");
  };

  const handleBack = () => {
    router.push("/");
  };

  return {
    sections,
    currentSection,
    formData,
    progress,
    currentFields,
    loading,
    fieldsLoading,
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
