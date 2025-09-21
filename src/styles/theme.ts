import { Theme } from "../types";

export const defaultTheme: Theme = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#f3f4f6",
    secondaryHover: "#e5e7eb",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#d1d5db",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  fonts: {
    primary:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  borderRadius: "8px",
};

export const darkTheme: Theme = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#374151",
    secondaryHover: "#4b5563",
    background: "#111827",
    surface: "#1f2937",
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    border: "#374151",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  fonts: {
    primary:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  borderRadius: "8px",
};
