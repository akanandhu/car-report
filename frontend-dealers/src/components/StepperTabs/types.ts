import { SectionI } from "@/src/app/(authenticated)/car-evaluation/_components/CarEvaluationForm/types";

export type StepperTabsContextI = {
  sections: SectionI[];
  activeSection: string;
  onSectionChange: (index: number) => void;
} | null;

export interface StepperTabsProps {
  sections: SectionI[];
  activeSection: number;
  onSectionChange: (index: number) => void;
  className?: string;
}

export type StepperTabsPropsI = {
  children: React.ReactNode;
  className?: string;
  value: StepperTabsContextI;
}
