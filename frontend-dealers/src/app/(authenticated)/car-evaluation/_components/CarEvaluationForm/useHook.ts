"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { fetchConfigFull, fetchVariantsFull } from "@/src/networks/catalogue";
import {
  CatalogueOption,
  VariantFullItem,
} from "@/src/networks/catalogue/types";
import { fetchDocumentGroups } from "@/src/networks/document-groups";
import { DocumentGroupI } from "@/src/networks/document-groups/types";
import { fetchFormFields } from "@/src/networks/form-fields";
import { FormFieldI } from "@/src/networks/form-fields/types";
import { createVehicle, updateVehicle } from "@/src/networks/vehicles";
import {
  getVehicleFormData,
  saveStepData,
  submitAllSteps,
} from "@/src/networks/vehicle-documents";
import { FormDataI, SectionI } from "./types";

export type OptionMap = Record<string, CatalogueOption[]>;

const optionLabel = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const getValue = (value: unknown) => {
  if (value && typeof value === "object" && "id" in value) {
    return String(value.id);
  }

  return String(value ?? "");
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
          setCurrentFields(fields.fields);
          sectionFieldKeysRef.current[0] = fields.fields.map(
            (field) => field.fieldKey,
          );
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
      setCurrentFields(result.fields);
      sectionFieldKeysRef.current[sectionIndex] = result.fields.map(
        (field) => field.fieldKey,
      );
    } catch (error) {
      console.error("Failed to load form fields:", error);
      setCurrentFields([]);
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

  const saveCurrentStepData = async (id: string, sectionIndex: number) => {
    const group = documentGroups[sectionIndex];
    if (!group) return;

    await saveStepData(id, {
      documentGroupId: group.id,
      documentSpec: getStepFormData(sectionIndex),
    });
  };

  const createDraftVehicle = async () => {
    const brand = formData.car_brand?.label || getValue(formData.car_brand);
    const model = formData.car_model?.label || getValue(formData.car_model);
    const name =
      [brand, model, formData.manufacturing_year].filter(Boolean).join(" ") ||
      "New Vehicle";

    const vehicle = await createVehicle({
      name,
      vehicleNumber: formData.registration_number || `TEMP-${Date.now()}`,
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

    try {
      setSubmitting(true);
      const currentVehicleId = vehicleId || (await createDraftVehicle());

      await saveCurrentStepData(currentVehicleId, currentSection);
      setCurrentSection(currentSection + 1);
      loadFields(currentSection + 1);
      scrollToTop();
    } catch (error) {
      console.error("Failed to save step data:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentSection === 0) return;

    setCurrentSection(currentSection - 1);
    loadFields(currentSection - 1);
    scrollToTop();
  };

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    loadFields(index);
    scrollToTop();
  };

  const handleDataChange = async (newData: Partial<FormDataI>) => {
    const nextData = { ...formData, ...newData };
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
      setSubmitting(true);
      const currentVehicleId = vehicleId || (await createDraftVehicle());

      await saveCurrentStepData(currentVehicleId, currentSection);
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
      await saveCurrentStepData(vehicleId, currentSection);
      await submitAllSteps(vehicleId, "EVALUATION");
      await updateVehicle(vehicleId, { status: "completed" });
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
    methods,
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
