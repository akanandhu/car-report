import { FormFieldComplexConditionI, FormFieldConditionI, FormFieldI } from "@/src/networks/form-fields/types";
import { FormDataI } from "../CarEvaluationForm/types";

export function resolveEndpoint(
  endpointTemplate: string,
  data: FormDataI,
): string | null {
  const placeholderRegex = /\{(\w+)\}/g;
  let resolved = endpointTemplate;
  let match: RegExpExecArray | null;

  while ((match = placeholderRegex.exec(endpointTemplate)) !== null) {
    const fieldKey = match[1];
    const value = data[fieldKey];
    if (value === undefined || value === null || value === "") {
      return null; // Can't resolve — dependency not yet filled
    }
    resolved = resolved.replace(match[0], String(value));
  }

  return resolved;
}

export function getEndpointDependencies(endpointTemplate: string): string[] {
  const deps: string[] = [];
  const regex = /\{(\w+)\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(endpointTemplate)) !== null) {
    deps.push(match[1]);
  }
  return deps;
}

export function evaluateSimpleCondition(
  condition: Omit<FormFieldConditionI, "action">,
  data: FormDataI,
): boolean {
  const fieldValue = data[condition.dependsOn];

  switch (condition.operator) {
    case "equals":
      return (
        String(fieldValue ?? "").toLowerCase() ===
        String(condition.value ?? "").toLowerCase()
      );
    case "not_equals":
      return (
        String(fieldValue ?? "").toLowerCase() !==
        String(condition.value ?? "").toLowerCase()
      );
    case "contains":
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(condition.value);
      }
      return String(fieldValue ?? "").includes(String(condition.value ?? ""));
    case "not_empty":
      return (
        fieldValue !== undefined && fieldValue !== null && fieldValue !== ""
      );
    case "empty":
      return (
        fieldValue === undefined || fieldValue === null || fieldValue === ""
      );
    case "in":
      if (Array.isArray(condition.value)) {
        return condition.value.includes(String(fieldValue ?? ""));
      }
      return false;
    case "greater_than":
      return Number(fieldValue) > Number(condition.value);
    case "less_than":
      return Number(fieldValue) < Number(condition.value);
    default:
      return true;
  }
}

export function evaluateConditions(
  conditions: FormFieldConditionI | FormFieldComplexConditionI,
  data: FormDataI
): boolean {
  // Complex condition with logic (AND/OR)
  if ("logic" in conditions && "rules" in conditions) {
    const complex = conditions as FormFieldComplexConditionI;
    const results = complex.rules.map((rule) => {
      if ("logic" in rule) {
        return evaluateConditions(
          { ...rule, action: complex.action } as FormFieldComplexConditionI,
          data
        );
      }
      return evaluateSimpleCondition(rule, data);
    });

    const passed =
      complex.logic === "AND"
        ? results.every(Boolean)
        : results.some(Boolean);

    return complex.action === "show" ? passed : !passed;
  }

  // Simple condition
  const simple = conditions as FormFieldConditionI;
  const passed = evaluateSimpleCondition(simple, data);
  return simple.action === "show" ? passed : !passed;
}

export function isFieldVisible(
  field: FormFieldI,
  data: FormDataI
): boolean {
  if (!field.conditions) return true;
  return evaluateConditions(field.conditions, data);
}