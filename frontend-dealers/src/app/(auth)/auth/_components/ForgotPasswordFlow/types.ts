export type ForgotPasswordFlowPropsI = {
  onBack: () => void;
  onSuccess: () => void;
};

export type ResetFlowState = {
  email: string;
  otp: string;
};
