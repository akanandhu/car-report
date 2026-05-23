"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { fetchConfigFull, fetchVariantsFull } from "@/src/networks/catalogue";
import {
  CatalogueOption,
  VariantFullItem,
} from "@/src/networks/catalogue/types";
import { fetchDocumentGroups } from "@/src/networks/document-groups";
import { DocumentGroupI } from "@/src/networks/document-groups/types";
import { fetchFormFields } from "@/src/networks/form-fields";
import { FormFieldGroupI, FormFieldI } from "@/src/networks/form-fields/types";
import { createVehicle, updateVehicle } from "@/src/networks/vehicles";
import {
  getVehicleFormData,
  saveStepData,
  submitAllSteps,
} from "@/src/networks/vehicle-documents";
import { FormDataI, SectionI } from "./types";
import { isFieldVisible } from "../DynamicFormSection/utils";

export type OptionMap = Record<string, CatalogueOption[]>;

const optionLabel = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const getValue = (value: unknown) => {
  if (value && typeof value === "object" && "id" in value) {
    return String(value.id);
  }

  return String(value ?? "");
};

const getLabelValue = (value: unknown) => {
  if (value && typeof value === "object" && "label" in value) {
    return String(value.label);
  }

  return getValue(value);
};

const getTransmissionOptions = (
  variants: VariantFullItem[],
  fuelType: string,
) => {
  const types = variants
    .filter((variant) => variant.fuel_type === fuelType)
    .map((variant) => variant.transmission_type)
    .filter(Boolean);

  return [...new Set(types)].map((value) => ({
    label: optionLabel(value),
    value,
  }));
};

const getVariantOptions = (
  variants: VariantFullItem[],
  fuelType: string,
  transmissionType: string,
) =>
  variants
    .filter(
      (variant) =>
        variant.fuel_type === fuelType &&
        variant.transmission_type === transmissionType,
    )
    .map((variant) => ({
      label: variant.display_name,
      value: String(variant.id),
    }));

const getVariantSelection = (variants: VariantFullItem[], data: FormDataI) => {
  const nextData = { ...data };
  const fuelTypes = [
    ...new Set(variants.map((variant) => variant.fuel_type).filter(Boolean)),
  ];
  const fuelOptions = fuelTypes.map((value) => ({
    label: optionLabel(value),
    value,
  }));
  let transmissionOptions: CatalogueOption[] = [];
  let variantOptions: CatalogueOption[] = [];

  if (fuelTypes.length === 1) {
    nextData.fuel_type = fuelTypes[0];
    transmissionOptions = getTransmissionOptions(variants, fuelTypes[0]);
  }

  if (transmissionOptions.length === 1) {
    nextData.transmission_type = transmissionOptions[0].value;
    variantOptions = getVariantOptions(
      variants,
      String(nextData.fuel_type ?? ""),
      transmissionOptions[0].value,
    );
  }

  return {
    data: nextData,
    options: {
      fuel_type: fuelOptions,
      transmission_type: transmissionOptions,
      car_variant: variantOptions,
    },
  };
};

const emptyVariantOptions: OptionMap = {
  fuel_type: [],
  transmission_type: [],
  car_variant: [],
};

const useCarEvaluationForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const methods = useForm({ mode: "onBlur" });

  const vehicleIdFromUrl = searchParams.get("vehicleId");

  const [sections, setSections] = useState<SectionI[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormDataI>({});
  const [currentFields, setCurrentFields] = useState<FormFieldI[]>([]);
  const [currentFieldGroups, setCurrentFieldGroups] = useState<
    FormFieldGroupI[]
  >([]);
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupI[]>([]);
  const [vehicleId, setVehicleIdState] = useState<string | null>(
    vehicleIdFromUrl,
  );

  const [configOptions, setConfigOptions] = useState<OptionMap>({});
  const [variantDerivedOptions, setVariantDerivedOptions] =
    useState<OptionMap>(emptyVariantOptions);
  const [allVariants, setAllVariants] = useState<VariantFullItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [fieldsLoading, setFieldsLoading] = useState(false);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const sectionFieldKeysRef = useRef<Record<number, string[]>>({});
  const initialVehicleIdRef = useRef(vehicleIdFromUrl);

  const progress =
    sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0;

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);

        const [config, groups] = await Promise.all([
          fetchConfigFull("chennai"),
          fetchDocumentGroups("FORM_STEP"),
        ]);

        if (!active) return;

        const enabledGroups = groups
          .filter((group) => group.isEnabled)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setConfigOptions({
          manufacturing_year: config.make_year ?? [],
          ownership_number: config.no_of_owners ?? [],
          kms_driven: config.mileage ?? [],
          sell_time: config.sell_time ?? [],
        });
        setDocumentGroups(enabledGroups);
        setSections(
          enabledGroups.map((group) => ({
            id: group.id,
            label: group.name,
          })),
        );

        if (enabledGroups[0]) {
          setFieldsLoading(true);
          const fields = await fetchFormFields(enabledGroups[0].id);
          if (!active) return;
          const enabledFields = fields.fields.filter((f) => f.isEnabled);
          const enabledFieldGroups = fields.fieldGroups
            .map((g) => ({ ...g, fields: g.fields.filter((f) => f.isEnabled) }))
            .filter((g) => g.fields.length > 0);
          setCurrentFields(enabledFields);
          setCurrentFieldGroups(enabledFieldGroups);
          sectionFieldKeysRef.current[0] = enabledFields.map((f) => f.fieldKey);
          setFieldsLoading(false);
        }

        const initialVehicleId = initialVehicleIdRef.current;
        if (!initialVehicleId) return;

        const docs = await getVehicleFormData(initialVehicleId, "EVALUATION");
        if (!active) return;

        const savedData = docs.reduce<FormDataI>((data, doc) => {
          if (doc.documentSpec) return { ...data, ...doc.documentSpec };
          return data;
        }, {});

        if (!Object.keys(savedData).length) return;

        const modelId = getValue(savedData.car_model);
        const makeYear = getValue(savedData.manufacturing_year);

        if (!modelId || !makeYear) {
          setFormData(savedData);
          return;
        }

        setVariantsLoading(true);
        const variants = await fetchVariantsFull(modelId, makeYear);
        if (!active) return;

        const selected = getVariantSelection(variants, savedData);
        setAllVariants(variants);
        setVariantDerivedOptions(selected.options);
        setFormData(selected.data);
      } catch (error) {
        console.error("Failed to load form:", error);
      } finally {
        if (active) {
          setLoading(false);
          setFieldsLoading(false);
          setVariantsLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const loadFields = async (
    sectionIndex: number,
    groups: DocumentGroupI[] = documentGroups,
  ) => {
    const group = groups[sectionIndex];
    if (!group) return;

    try {
      setFieldsLoading(true);
      const result = await fetchFormFields(group.id);
      const enabledFields = result.fields.filter((f) => f.isEnabled);
      const enabledFieldGroups = result.fieldGroups
        .map((g) => ({ ...g, fields: g.fields.filter((f) => f.isEnabled) }))
        .filter((g) => g.fields.length > 0);
      setCurrentFields(enabledFields);
      setCurrentFieldGroups(enabledFieldGroups);
      sectionFieldKeysRef.current[sectionIndex] = enabledFields.map((f) => f.fieldKey);
    } catch (error) {
      console.error("Failed to load form fields:", error);
      setCurrentFields([]);
      setCurrentFieldGroups([]);
    } finally {
      setFieldsLoading(false);
    }
  };

  const loadVariants = async (data: FormDataI) => {
    const modelId = getValue(data.car_model);
    const makeYear = getValue(data.manufacturing_year);

    if (!modelId || !makeYear) {
      setAllVariants([]);
      setVariantDerivedOptions(emptyVariantOptions);
      return data;
    }

    try {
      setVariantsLoading(true);
      const variants = await fetchVariantsFull(modelId, makeYear);
      const selected = getVariantSelection(variants, data);

      setAllVariants(variants);
      setVariantDerivedOptions(selected.options);

      return selected.data;
    } catch (error) {
      console.error("Failed to fetch variants:", error);
      setAllVariants([]);
      setVariantDerivedOptions(emptyVariantOptions);
      return data;
    } finally {
      setVariantsLoading(false);
    }
  };

  const updateVehicleId = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("vehicleId", id);
    setVehicleIdState(id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getStepFormData = (sectionIndex: number) => {
    const fieldKeys = sectionFieldKeysRef.current[sectionIndex];
    if (!fieldKeys?.length) return { ...formData };

    return fieldKeys.reduce<Record<string, unknown>>((data, key) => {
      if (formData[key] !== undefined && formData[key] !== "") {
        data[key] = formData[key];
      }

      return data;
    }, {});
  };

  const hasValue = (value: unknown) => {
    if (Array.isArray(value)) return value.length > 0;
    if (value instanceof File) return true;
    if (value && typeof value === "object") {
      return Object.keys(value).length > 0;
    }

    return value !== undefined && value !== null && value !== "";
  };

  const validateCurrentFields = () => {
    const errors = currentFields.reduce<Record<string, string>>(
      (nextErrors, field) => {
        const isRequiredVisible =
          field.isEnabled &&
          field.isRequired &&
          isFieldVisible(field, formData);

        if (isRequiredVisible && !hasValue(formData[field.fieldKey])) {
          nextErrors[field.fieldKey] = `${field.label} is required`;
        }

        return nextErrors;
      },
      {},
    );

    if (Object.keys(errors).length > 0) {
      console.warn(
        "[Validation] Blocking fields:",
        Object.entries(errors).map(([key, msg]) => ({
          key,
          msg,
          value: formData[key],
        })),
      );
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveCurrentStepData = async (id: string, sectionIndex: number) => {
    const group = documentGroups[sectionIndex];
    if (!group) return;

    await saveStepData(id, {
      documentGroupId: group.id,
      documentSpec: getStepFormData(sectionIndex),
    });
  };

  const createDraftVehicle = async () => {
    const brand = getLabelValue(formData.car_brand);
    const model = getLabelValue(formData.car_model);
    const name =
      [brand, model, formData.manufacturing_year].filter(Boolean).join(" ") ||
      "New Vehicle";

    const vehicle = await createVehicle({
      name,
      vehicleNumber: getValue(formData.registration_number) || `TEMP-${Date.now()}`,
      status: "draft",
      model: model || "unknown",
    });

    updateVehicleId(vehicle.id);
    return vehicle.id;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    if (currentSection >= sections.length - 1) return;
    if (!validateCurrentFields()) {
      scrollToTop();
      return;
    }

    try {
      flushSync(() => setSubmitting(true));
      const currentVehicleId = vehicleId || (await createDraftVehicle());

      await saveCurrentStepData(currentVehicleId, currentSection);
      setValidationErrors({});
      setCurrentSection(currentSection + 1);
      loadFields(currentSection + 1);
      scrollToTop();
    } catch (error) {
      console.error("Failed to save step data:", error);
      toast.error("Failed to save. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentSection === 0) return;

    setValidationErrors({});
    setCurrentSection(currentSection - 1);
    loadFields(currentSection - 1);
    scrollToTop();
  };

  const handleSectionChange = (index: number) => {
    setValidationErrors({});
    setCurrentSection(index);
    loadFields(index);
    scrollToTop();
  };

  const handleDataChange = async (newData: Partial<FormDataI>) => {
    const nextData = { ...formData, ...newData };
    const changedKeys = Object.keys(newData);

    if (changedKeys.length > 0) {
      setValidationErrors((errors) => {
        const nextErrors = { ...errors };
        changedKeys.forEach((key) => {
          delete nextErrors[key];
        });
        return nextErrors;
      });
    }

    const chain = [
      "car_brand",
      "manufacturing_year",
      "car_model",
      "fuel_type",
      "transmission_type",
      "car_variant",
    ];
    const changedIndex = chain.findIndex((key) =>
      Object.prototype.hasOwnProperty.call(newData, key),
    );

    if (changedIndex >= 0) {
      chain.slice(changedIndex + 1).forEach((key) => {
        nextData[key] = "";
      });
    }

    if (newData.car_brand !== undefined) {
      setAllVariants([]);
      setVariantDerivedOptions(emptyVariantOptions);
      setFormData(nextData);
      return;
    }

    const shouldFetchVariants =
      newData.manufacturing_year !== undefined ||
      newData.car_model !== undefined;

    if (shouldFetchVariants) {
      setFormData(nextData);
      setVariantDerivedOptions(emptyVariantOptions);
      const dataWithVariants = await loadVariants(nextData);
      setFormData(dataWithVariants);
      return;
    }

    if (
      newData.fuel_type !== undefined ||
      newData.transmission_type !== undefined
    ) {
      const transmissionOptions = getTransmissionOptions(
        allVariants,
        String(nextData.fuel_type ?? ""),
      );

      if (transmissionOptions.length === 1 && !nextData.transmission_type) {
        nextData.transmission_type = transmissionOptions[0].value;
      }

      setVariantDerivedOptions((options) => ({
        ...options,
        transmission_type: transmissionOptions,
        car_variant: getVariantOptions(
          allVariants,
          String(nextData.fuel_type ?? ""),
          String(nextData.transmission_type ?? ""),
        ),
      }));
    }

    setFormData(nextData);
  };

  const handleSaveDraft = async () => {
    try {
      flushSync(() => setSubmitting(true));
      const currentVehicleId = vehicleId || (await createDraftVehicle());

      await saveCurrentStepData(currentVehicleId, currentSection);
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Failed to save draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    console.log("submit handler test")
    if (!validateCurrentFields()) {
      scrollToTop();
    console.log("submit handler test2")
      return;
    }
    console.log("submit handler test3")

    try {
      flushSync(() => setSubmitting(true));
      const currentVehicleId = vehicleId || (await createDraftVehicle());
      await saveCurrentStepData(currentVehicleId, currentSection);
      await submitAllSteps(currentVehicleId, "EVALUATION");
      await updateVehicle(currentVehicleId, { status: "completed" });
      toast.success("Evaluation submitted successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      console.error("Failed to submit evaluation:", error);
      const message =
        (error as { message?: string })?.message ||
        "Failed to submit. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return {
    sections,
    methods,
    currentSection,
    formData,
    progress,
    currentFields,
    currentFieldGroups,
    loading,
    fieldsLoading,
    submitting,
    variantsLoading,
    configOptions,
    variantDerivedOptions,
    validationErrors,
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
