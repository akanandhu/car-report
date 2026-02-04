import { SectionI } from "@/src/app/(authenticated)/car-evaluation/_components/CarEvaluationForm/types";

export interface StepperTabsProps {
  sections: SectionI[];
  activeSection: number;
  onSectionChange: (index: number) => void;
  className?: string;
}

