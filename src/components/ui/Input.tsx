import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200",
          error ? "border-danger focus:ring-danger" : "border-border",
          className
        )}
        style={{
          backgroundColor: "var(--theme-surface)",
          color: "var(--theme-foreground)",
        }}
        {...props}
      />
      {helperText && (
        <p
          className={clsx(
            "mt-1 text-xs",
            error ? "text-danger" : "text-textSecondary"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
