"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { SectionI, FormDataI } from "./types";
import { fetchDocumentGroups } from "@/src/networks/document-groups";
import { fetchFormFields } from "@/src/networks/form-fields";
import { FormFieldI } from "@/src/networks/form-fields/types";
import { DocumentGroupI } from "@/src/networks/document-groups/types";
import {
  fetchConfigFull,
  fetchVariantsFull,
} from "@/src/networks/catalogue";
import {
  VariantFullItem,
  CatalogueOption,
} from "@/src/networks/catalogue/types";
import { createVehicle, updateVehicle } from "@/src/networks/vehicles";
import {
  saveStepData,
  submitAllSteps,
  getVehicleFormData,
} from "@/src/networks/vehicle-documents";

type OptionMap = Record<string, CatalogueOption[]>;

const VEHICLE_ID_KEY = "car-evaluation-vehicle-id";

const useCarEvaluationForm = () => {
  const router = useRouter();

  const [sections, setSections] = useState<SectionI[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormDataI>({});
  const [currentFields, setCurrentFields] = useState<FormFieldI[]>([]);

  const [loading, setLoading] = useState(true);
  const [fieldsLoading, setFieldsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Track the vehicle ID (set after creation on first step)
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  // Track the raw document groups (needed for IDs when fetching fields)
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupI[]>([]);

  // ── Cached config data (fetched once on mount) ─────────────────
  const [configOptions, setConfigOptions] = useState<OptionMap>({});

  // ── Variant-derived state ──────────────────────────────────────
  const [allVariants, setAllVariants] = useState<VariantFullItem[]>([]);
  const [variantDerivedOptions, setVariantDerivedOptions] = useState<OptionMap>(
    {}
  );
  const [variantsLoading, setVariantsLoading] = useState(false);

  // Ref to track previous values for cascade clearing
  const prevCascadeRef = useRef<Record<string, string>>({});

  // Cache field keys per section index so we can extract step-specific data when saving
  const sectionFieldKeysRef = useRef<Record<number, string[]>>({});

  const progress =
    sections.length > 0
      ? ((currentSection + 1) / sections.length) * 100
      : 0;

  // ── Fetch config data once on mount ────────────────────────────
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await fetchConfigFull("chennai");
        setConfigOptions({
          manufacturing_year: config.make_year ?? [],
          ownership_number: config.no_of_owners ?? [],
          kms_driven: config.mileage ?? [],
          sell_time: config.sell_time ?? [],
        });
      } catch (error) {
        console.error("Failed to load config data:", error);
      }
    };
    loadConfig();
  }, []);

  // ── Fetch document groups on mount ─────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const loadGroups = async () => {
      try {
        setLoading(true);
        const groups = await fetchDocumentGroups("FORM_STEP");

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

    // Load draft: check for existing vehicleId and recover form data
    const savedVehicleId = localStorage.getItem(VEHICLE_ID_KEY);
    if (savedVehicleId) {
      setVehicleId(savedVehicleId);
      // Load saved form data from backend
      getVehicleFormData(savedVehicleId, "EVALUATION")
        .then((docs) => {
          const merged: FormDataI = {};
          for (const doc of docs) {
            if (doc.documentSpec) {
              Object.assign(merged, doc.documentSpec);
            }
          }
          if (Object.keys(merged).length > 0) {
            setFormData((prev) => ({ ...prev, ...merged }));
          }
        })
        .catch((err) => {
          console.error("Failed to load saved form data:", err);
        });
    } else {
      // Fallback: load draft from localStorage
      const draft = localStorage.getItem("car-evaluation-draft");
      if (draft) {
        try {
          setFormData(JSON.parse(draft));
        } catch (error) {
          console.error("Failed to load draft:", error);
        }
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Fetch form fields when section changes ─────────────────────
  const loadFields = useCallback(
    async (sectionIndex: number) => {
      if (documentGroups.length === 0) return;

      const group = documentGroups[sectionIndex];
      if (!group) return;

      try {
        setFieldsLoading(true);
        const result = await fetchFormFields(group.id);
        setCurrentFields(result.fields);

        // Cache the field keys for this section so we can use them when saving
        sectionFieldKeysRef.current[sectionIndex] = result.fields.map(
          (f) => f.fieldKey
        );
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

  // ── Fetch variants when car_model changes ──────────────────────
  useEffect(() => {
    const modelId = formData.car_model;
    const makeYear = formData.manufacturing_year;

    if (!modelId || !makeYear) {
      setAllVariants([]);
      setVariantDerivedOptions({});
      return;
    }

    let cancelled = false;

    const loadVariants = async () => {
      setVariantsLoading(true);
      try {
        const variants = await fetchVariantsFull(modelId, makeYear);
        if (cancelled) return;

        setAllVariants(variants);

        // Derive fuel_type options from all variants
        const fuelTypes = [...new Set(variants.map((v) => v.fuel_type))].filter(
          Boolean
        );
        const fuelOptions: CatalogueOption[] = fuelTypes.map((ft) => ({
          label: ft.charAt(0).toUpperCase() + ft.slice(1),
          value: ft,
        }));

        setVariantDerivedOptions((prev) => ({
          ...prev,
          fuel_type: fuelOptions,
          // Reset downstream options since model changed
          transmission_type: [],
          car_variant: [],
        }));

        // Auto-select if only one fuel type
        if (fuelTypes.length === 1) {
          setFormData((prev) => ({ ...prev, fuel_type: fuelTypes[0] }));
        }
      } catch (error) {
        console.error("Failed to fetch variants:", error);
        setAllVariants([]);
        setVariantDerivedOptions((prev) => ({
          ...prev,
          fuel_type: [],
          transmission_type: [],
          car_variant: [],
        }));
      } finally {
        if (!cancelled) setVariantsLoading(false);
      }
    };

    loadVariants();

    return () => {
      cancelled = true;
    };
  }, [formData.car_model, formData.manufacturing_year]);

  // ── Derive transmission_type options when fuel_type changes ─────
  useEffect(() => {
    const fuelType = formData.fuel_type;

    if (!fuelType || allVariants.length === 0) {
      setVariantDerivedOptions((prev) => ({
        ...prev,
        transmission_type: [],
        car_variant: [],
      }));
      return;
    }

    // Filter variants by selected fuel type
    const filteredByFuel = allVariants.filter(
      (v) => v.fuel_type === fuelType
    );

    // Derive unique transmission types
    const transmissionTypes = [
      ...new Set(filteredByFuel.map((v) => v.transmission_type)),
    ].filter(Boolean);

    const transmissionOptions: CatalogueOption[] = transmissionTypes.map(
      (tt) => ({
        label: tt.charAt(0).toUpperCase() + tt.slice(1),
        value: tt,
      })
    );

    setVariantDerivedOptions((prev) => ({
      ...prev,
      transmission_type: transmissionOptions,
      // Reset variant options since fuel changed
      car_variant: [],
    }));

    // Auto-select if only one transmission type
    if (transmissionTypes.length === 1) {
      setFormData((prev) => ({
        ...prev,
        transmission_type: transmissionTypes[0],
      }));
    }
  }, [formData.fuel_type, allVariants]);

  // ── Derive car_variant options when transmission_type changes ──
  useEffect(() => {
    const fuelType = formData.fuel_type;
    const transmissionType = formData.transmission_type;

    if (!fuelType || !transmissionType || allVariants.length === 0) {
      setVariantDerivedOptions((prev) => ({
        ...prev,
        car_variant: [],
      }));
      return;
    }

    // Filter variants by both fuel type and transmission type
    const filteredVariants = allVariants.filter(
      (v) =>
        v.fuel_type === fuelType &&
        v.transmission_type === transmissionType
    );

    const variantOptions: CatalogueOption[] = filteredVariants.map((v) => ({
      label: v.display_name,
      value: String(v.id),
    }));

    setVariantDerivedOptions((prev) => ({
      ...prev,
      car_variant: variantOptions,
    }));
  }, [formData.fuel_type, formData.transmission_type, allVariants]);

  // ── Cascade clearing: when a parent field changes, clear children
  useEffect(() => {
    const cascadeChain = [
      "car_brand",
      "manufacturing_year",
      "car_model",
      "fuel_type",
      "transmission_type",
      "car_variant",
    ];

    const currentVals: Record<string, string> = {};
    cascadeChain.forEach((key) => {
      currentVals[key] = String(formData[key] ?? "");
    });

    const changedKeys = new Set<string>();
    cascadeChain.forEach((key) => {
      if (
        prevCascadeRef.current[key] !== undefined &&
        prevCascadeRef.current[key] !== currentVals[key]
      ) {
        changedKeys.add(key);
      }
    });

    if (changedKeys.size > 0) {
      const fieldsToClear: Record<string, string> = {};

      changedKeys.forEach((changedKey) => {
        const changedIdx = cascadeChain.indexOf(changedKey);
        // Clear all children after this field
        for (let i = changedIdx + 1; i < cascadeChain.length; i++) {
          const childKey = cascadeChain[i];
          if (formData[childKey]) {
            fieldsToClear[childKey] = "";
          }
        }
      });

      if (Object.keys(fieldsToClear).length > 0) {
        setFormData((prev) => ({ ...prev, ...fieldsToClear }));
      }
    }

    prevCascadeRef.current = currentVals;
  }, [
    formData.car_brand,
    formData.manufacturing_year,
    formData.car_model,
    formData.fuel_type,
    formData.transmission_type,
    formData.car_variant,
  ]);

  /**
   * Helper: extract only the field values belonging to a specific step.
   * Uses the cached field keys from sectionFieldKeysRef.
   */
  const getStepFormData = (sectionIndex: number): Record<string, any> => {
    const fieldKeys = sectionFieldKeysRef.current[sectionIndex];
    if (!fieldKeys || fieldKeys.length === 0) return { ...formData };

    const stepData: Record<string, any> = {};
    for (const key of fieldKeys) {
      if (formData[key] !== undefined && formData[key] !== "") {
        stepData[key] = formData[key];
      }
    }
    return stepData;
  };

  /**
   * Helper: save the current step's form data to the backend.
   * Sends only the fields that belong to this step's document group.
   */
  const saveCurrentStepData = async (vId: string, sectionIndex: number) => {
    const group = documentGroups[sectionIndex];
    if (!group) return;

    const stepData = getStepFormData(sectionIndex);

    await saveStepData(vId, {
      documentGroupId: group.id,
      documentSpec: stepData,
    });
  };

  /**
   * Helper: create a new vehicle in DRAFT status.
   * Returns the new vehicle ID.
   */
  const createDraftVehicle = async (): Promise<string> => {
    const vehicleName = [
      formData.car_brand,
      formData.car_model,
      formData.manufacturing_year,
    ]
      .filter(Boolean)
      .join(" ") || "New Vehicle";

    const vehicle = await createVehicle({
      name: vehicleName,
      vehicleNumber: formData.vehicle_number || `TEMP-${Date.now()}`,
      status: "draft",
      model: formData.car_model || "unknown",
    });

    setVehicleId(vehicle.id);
    localStorage.setItem(VEHICLE_ID_KEY, vehicle.id);
    return vehicle.id;
  };

  const handleNext = async () => {
    if (currentSection >= sections.length - 1) return;

    try {
      setSubmitting(true);

      let currentVehicleId = vehicleId;

      // Create the vehicle as DRAFT if it doesn't exist yet
      if (!currentVehicleId) {
        currentVehicleId = await createDraftVehicle();
      }

      // Save this step's field data
      await saveCurrentStepData(currentVehicleId, currentSection);

      // Advance to next section
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to save step data:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSubmitting(false);
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

  const handleSaveDraft = async () => {
    try {
      setSubmitting(true);

      let currentVehicleId = vehicleId;

      // If no vehicle exists yet, create one as DRAFT first
      if (!currentVehicleId) {
        currentVehicleId = await createDraftVehicle();
      }

      // Save this step's field data to backend
      await saveCurrentStepData(currentVehicleId, currentSection);

      // Also save to localStorage as a fallback
      localStorage.setItem("car-evaluation-draft", JSON.stringify(formData));

      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Failed to save draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!vehicleId) {
      alert("No vehicle found. Please start from the first step.");
      return;
    }

    try {
      setSubmitting(true);

      // Save the last step's data first
      await saveCurrentStepData(vehicleId, currentSection);

      // Submit all steps (DRAFT → SUBMITTED)
      await submitAllSteps(vehicleId, "EVALUATION");

      // Update vehicle status to completed
      await updateVehicle(vehicleId, { status: "completed" });

      // Clean up localStorage
      localStorage.removeItem(VEHICLE_ID_KEY);
      localStorage.removeItem("car-evaluation-draft");

      router.push("/");
    } catch (error) {
      console.error("Failed to submit evaluation:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
    submitting,
    variantsLoading,
    configOptions,
    variantDerivedOptions,
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
