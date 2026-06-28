"use client";

import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import toast, { Toast, ToastOptions } from "react-hot-toast";

type ToastVariant = "success" | "error" | "info";

type AppToastPayload = {
  title: string;
  message?: string;
};

const variantConfig = {
  success: {
    Icon: CheckCircle2,
    accent: "bg-emerald-500",
    iconWrap:
      "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
  },
  error: {
    Icon: XCircle,
    accent: "bg-red-500",
    iconWrap:
      "bg-red-50 text-red-600 ring-red-100 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-400/20",
  },
  info: {
    Icon: Info,
    accent: "bg-sky-500",
    iconWrap:
      "bg-sky-50 text-sky-600 ring-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
  },
} satisfies Record<
  ToastVariant,
  {
    Icon: typeof AlertCircle;
    accent: string;
    iconWrap: string;
  }
>;

const renderToast = (
  t: Toast,
  variant: ToastVariant,
  { title, message }: AppToastPayload,
) => {
  const { Icon, accent, iconWrap } = variantConfig[variant];

  return (
    <div
      className={`pointer-events-auto relative flex w-[calc(100vw-2rem)] max-w-md items-start overflow-hidden rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-slate-900 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.7)] ring-1 ring-slate-950/5 transition-all duration-300 ease-out sm:w-md dark:border-white/10 dark:bg-slate-950 dark:text-slate-50 ${
        t.visible
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-2 opacity-0 scale-95"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-1.5 ${accent}`} />
      <div
        className={`ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${iconWrap}`}
      >
        <Icon size={17} strokeWidth={2.4} aria-hidden="true" />
      </div>
      <div className="min-w-0 pl-3">
        <p className="text-sm font-semibold leading-4 tracking-normal">
          {title}
        </p>
        {message ? (
          <p className="mt-1 text-[13px] leading-4 text-slate-500 dark:text-slate-400">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

const showToast = (
  variant: ToastVariant,
  payload: AppToastPayload,
  options?: ToastOptions,
) =>
  toast.custom((t) => renderToast(t, variant, payload), {
    duration: variant === "info" ? 4200 : 3600,
    ...options,
  });

export const appToast = {
  success: (payload: AppToastPayload, options?: ToastOptions) =>
    showToast("success", payload, options),
  error: (payload: AppToastPayload, options?: ToastOptions) =>
    showToast("error", payload, options),
  info: (payload: AppToastPayload, options?: ToastOptions) =>
    showToast("info", payload, options),
};
