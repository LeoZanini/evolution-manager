import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white focus:ring-2 focus:ring-offset-2",
    secondary: "focus:ring-2 focus:ring-offset-2",
    danger: "text-white focus:ring-2 focus:ring-offset-2",
    ghost: "focus:ring-2 focus:ring-offset-2",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "h-10 w-10",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "var(--theme-primary)",
          borderColor: "var(--theme-primary)",
          color: "white",
        };
      case "secondary":
        return {
          backgroundColor: "var(--theme-muted)",
          borderColor: "var(--theme-border)",
          color: "var(--theme-foreground)",
        };
      case "danger":
        return {
          backgroundColor: "var(--theme-danger)",
          borderColor: "var(--theme-danger)",
          color: "white",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "var(--theme-secondary)",
        };
      default:
        return {};
    }
  };

  const variantClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      className={variantClasses}
      style={getVariantStyles()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
