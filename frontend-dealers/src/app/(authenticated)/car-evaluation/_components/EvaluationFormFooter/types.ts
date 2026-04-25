export type EvaluationFormFooterPropsI = {
  currentSection: number;
  submitting: boolean;
  isLastSection: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
};