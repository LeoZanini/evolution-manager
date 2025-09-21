import React from "react";
import clsx from "clsx";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "default";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
}) => {
  const variants = {
    success: "bg-success-500 text-white",
    warning: "bg-warning-500 text-white",
    danger: "bg-danger-500 text-white",
    default: "bg-gray-500 text-white",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
