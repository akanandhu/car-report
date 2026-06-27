"use client";

import { Loader2, X } from "lucide-react";
import { ConfirmModalProps } from "./types";

const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
  error,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!open) return null;

  const confirmClasses =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={loading ? undefined : onCancel}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <h3
              id="confirm-modal-title"
              className="text-base font-semibold text-slate-950"
            >
              {title}
            </h3>
            {description ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {error ? (
          <div className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex justify-end gap-3 px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex h-10 min-w-24 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${confirmClasses}`}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
