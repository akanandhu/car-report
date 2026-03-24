import { FormFieldI } from "@/src/networks/form-fields/types";


export type SectionI = {
  id: string;
  label: string;
}

export type FormDataI = Record<string, any>;

/**
 * @deprecated Use FormDataI instead. Kept for backward compatibility with legacy section components.
 */
export type CarEvaluationFormDataI = FormDataI;

export type SectionComponentPropsI = {
  fields?: FormFieldI[];
  data: FormDataI;
  onChange: (newData: Partial<FormDataI>) => void;
}

export type { FormFieldI };
