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
import { FormFieldGroupI, FormFieldI } from "@/src/networks/form-fields/types";
import { createVehicle, updateVehicle } from "@/src/networks/vehicles";
import {
  getVehicleFormData,
  saveStepData,
  submitAllSteps,
} from "@/src/networks/vehicle-documents";
import {
  createSignedMediaReads,
  deleteUploadedMedia,
  uploadEvaluationMedia,
} from "@/src/networks/media";
import { isUploadedMedia, UploadedMedia } from "@/src/utils/media";
import { appToast } from "@/src/utils/toast";
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

  if (!getValue(nextData.fuel_type) && fuelTypes.length === 1) {
    nextData.fuel_type = fuelTypes[0];
  }

  const selectedFuelType = getValue(nextData.fuel_type);

  if (selectedFuelType) {
    transmissionOptions = getTransmissionOptions(variants, selectedFuelType);
  }

  if (!getValue(nextData.transmission_type) && transmissionOptions.length === 1) {
    nextData.transmission_type = transmissionOptions[0].value;
  }

  const selectedTransmissionType = getValue(nextData.transmission_type);

  if (selectedFuelType && selectedTransmissionType) {
    variantOptions = getVariantOptions(
      variants,
      selectedFuelType,
      selectedTransmissionType,
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
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<
    Record<string, string>
  >({});

  const sectionFieldKeysRef = useRef<Record<number, string[]>>({});
  const initialVehicleIdRef = useRef(vehicleIdFromUrl);

  const progress =
    sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0;
  const isStepOneCompleted = Boolean(vehicleId);
  const canSaveDraft = currentSection > 0 || isStepOneCompleted;
  const maxAccessibleSection = isStepOneCompleted ? sections.length - 1 : 0;

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
          setCurrentFieldGroups(fields.fieldGroups);
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

  useEffect(() => {
    const mediaByPath = new Map<string, UploadedMedia>();

    currentFields.forEach((field) => {
      if (field.type !== "file" || !isFieldVisible(field, formData)) return;

      const value = formData[field.fieldKey];
      if (
        isUploadedMedia(value) &&
        (value.type === "image" || value.type === "video") &&
        !mediaPreviewUrls[value.path]
      ) {
        mediaByPath.set(value.path, value);
      }
    });

    const mediaItems = [...mediaByPath.values()];
    if (mediaItems.length === 0) return;

    let active = true;

    createSignedMediaReads(
      mediaItems.map((media) => ({
        bucket: media.bucket,
        path: media.path,
      })),
    )
      .then(({ urls }) => {
        if (!active) return;
        if (Object.keys(urls).length === 0) return;
        setMediaPreviewUrls((prevUrls) => ({ ...prevUrls, ...urls }));
      })
      .catch((error) => {
        console.error("Failed to load media previews:", error);
      });

    return () => {
      active = false;
    };
  }, [currentFields, formData, mediaPreviewUrls]);

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
      setCurrentFieldGroups(result.fieldGroups);
      sectionFieldKeysRef.current[sectionIndex] = result.fields.map(
        (field) => field.fieldKey,
      );
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
      if (
        formData[key] !== undefined &&
        formData[key] !== "" &&
        !(formData[key] instanceof File)
      ) {
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
          field.isRequired &&
          isFieldVisible(field, formData);

        if (isRequiredVisible && !hasValue(formData[field.fieldKey])) {
          nextErrors[field.fieldKey] = `${field.label} is required`;
        }

        return nextErrors;
      },
      {},
    );

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

  const getFallbackVehicleNumber = () => {
    const registered = getValue(formData.registered).toLowerCase();
    const prefix = registered === "scrap" ? "SCRAP" : "UNREGISTERED";
    const randomNumber = `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

    return `${prefix}_${randomNumber}`;
  };

  const getStepOneVehicleNumber = () =>
    getValue(formData.registration_number) || getFallbackVehicleNumber();

  const createVehicleFromStepOne = async () => {
    const brand = getLabelValue(formData.car_brand);
    const model = getLabelValue(formData.car_model);
    const name =
      [brand, model, formData.manufacturing_year].filter(Boolean).join(" ") ||
      "New Vehicle";

    const vehicle = await createVehicle({
      name,
      vehicleNumber: getStepOneVehicleNumber(),
      status: "draft",
      model: model || "unknown",
    });

    updateVehicleId(vehicle.id);
    return vehicle.id;
  };

  const requireVehicleId = () => {
    if (!vehicleId) {
      throw new Error("Complete Basic Details before continuing.");
    }

    return vehicleId;
  };

  const handleMediaUpload = async ({
    documentGroupId,
    fieldKey,
    file,
  }: {
    documentGroupId: string;
    fieldKey: string;
    file: File;
  }) => {
    const currentVehicleId = requireVehicleId();

    return uploadEvaluationMedia({
      vehicleId: currentVehicleId,
      documentGroupId,
      fieldKey,
      file,
    });
  };

  const handleMediaDelete = async ({
    documentGroupId,
    fieldKey,
    media,
  }: {
    documentGroupId: string;
    fieldKey: string;
    media: UploadedMedia;
  }) => {
    const currentVehicleId = requireVehicleId();

    await deleteUploadedMedia({
      bucket: media.bucket,
      path: media.path,
    });

    await saveStepData(currentVehicleId, {
      documentGroupId,
      documentSpec: { [fieldKey]: "" },
    });

    setMediaPreviewUrls((prevUrls) => {
      const nextUrls = { ...prevUrls };
      delete nextUrls[media.path];
      return nextUrls;
    });
    setFormData((prevData) => ({ ...prevData, [fieldKey]: "" }));
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
      setSubmitting(true);
      const currentVehicleId =
        currentSection === 0
          ? vehicleId || (await createVehicleFromStepOne())
          : requireVehicleId();

      await saveCurrentStepData(currentVehicleId, currentSection);
      setValidationErrors({});
      setCurrentSection(currentSection + 1);
      loadFields(currentSection + 1);
      scrollToTop();
    } catch (error) {
      console.error("Failed to save step data:", error);
      appToast.error({
        title: "Unable to save progress",
        message: "Please try again before moving to the next section.",
      });
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
    if (index > 0 && !isStepOneCompleted) return;

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
    if (!canSaveDraft) {
      appToast.info(
        {
          title: "Draft is not ready yet",
          message:
            "Complete Basic Details and click Next once before saving this evaluation as a draft.",
        },
        { id: "draft-not-ready" },
      );
      return;
    }

    try {
      setSubmitting(true);
      const currentVehicleId = requireVehicleId();

      await saveCurrentStepData(currentVehicleId, currentSection);
      appToast.success({
        title: "Draft saved",
        message: "Your car evaluation draft has been updated.",
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
      appToast.error({
        title: "Unable to save draft",
        message: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!vehicleId) {
      appToast.info({
        title: "Start with Basic Details",
        message: "No vehicle record was found for this evaluation.",
      });
      return;
    }

    if (!validateCurrentFields()) {
      scrollToTop();
      return;
    }

    try {
      setSubmitting(true);
      await saveCurrentStepData(vehicleId, currentSection);
      await submitAllSteps(vehicleId, "EVALUATION");
      await updateVehicle(vehicleId, { status: "completed" });
      appToast.success({
        title: "Evaluation completed",
        message: "The car evaluation has been submitted successfully.",
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to submit evaluation:", error);
      appToast.error({
        title: "Unable to submit evaluation",
        message: "Please try again after reviewing the current section.",
      });
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
    canSaveDraft,
    maxAccessibleSection,
    handleNext,
    handlePrevious,
    handleSectionChange,
    handleDataChange,
    handleSaveDraft,
    handleSubmit,
    handleBack,
    handleMediaUpload,
    handleMediaDelete,
    mediaPreviewUrls,
  };
};

export default useCarEvaluationForm;
