import { SectionI } from "../CarEvaluationForm/types";

export type CarFormHeadPropsI = {
    handleBack: () => void;
    currentSection: number;
    sections: SectionI[];
    progress: number;
    handleSectionChange: (index: number) => void;
    handleSaveDraft: () => void;
    submitting: boolean;
}