export type ConfirmModalVariant = "default" | "danger";

export type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmModalVariant;
  loading?: boolean;
  error?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};
