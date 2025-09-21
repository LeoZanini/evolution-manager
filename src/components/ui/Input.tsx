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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200",
          error
            ? "border-danger-500 focus:ring-danger-500"
            : "border-gray-300 dark:border-gray-600",
          className
        )}
        {...props}
      />
      {helperText && (
        <p
          className={clsx(
            "mt-1 text-xs",
            error ? "text-danger-500" : "text-gray-500 dark:text-gray-400"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
