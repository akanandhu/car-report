"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const isDark = theme === "dark"

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-green-700" />
        ),
        info: (
          <InfoIcon className="size-4 text-yellow-400" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-orange-400" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-red-500" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": isDark ? "#0f172a" : "#ffffff",
          "--normal-text": isDark ? "#f8fafc" : "#0f172a",
          "--normal-border": isDark ? "#334155" : "#e2e8f0",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      position="top-center"
      {...props}
    />
  )
}

export { Toaster }
