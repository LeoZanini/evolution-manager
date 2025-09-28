import React from "react";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  children,
}) => {
  return (
    <label
      className={clsx(
        "inline-flex items-center cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={clsx(
            "w-11 h-6 rounded-full transition-colors duration-200 ease-in-out",
            checked
              ? "bg-blue-600 dark:bg-blue-500"
              : "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <div
            className={clsx(
              "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md",
              checked && "translate-x-5"
            )}
          />
        </div>
      </div>
      {children && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {children}
        </span>
      )}
    </label>
  );
};
