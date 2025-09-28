import React from "react";
import clsx from "clsx";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitchProps {
  checked: boolean; // true = dark mode, false = light mode
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  className,
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

        {/* Background track */}
        <div
          className={clsx(
            "w-14 h-7 rounded-full transition-all duration-300 ease-in-out relative",
            checked
              ? "bg-slate-700 dark:bg-slate-600"
              : "bg-amber-200 dark:bg-amber-300"
          )}
        >
          {/* Sliding circle with icon */}
          <div
            className={clsx(
              "absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center",
              checked ? "translate-x-7 left-0.5" : "translate-x-0 left-0.5"
            )}
          >
            {checked ? (
              <Moon className="w-3.5 h-3.5 text-slate-600" strokeWidth={2.5} />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
            )}
          </div>

          {/* Background icons (optional, for extra visual feedback) */}
          <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
            <Sun
              className={clsx(
                "w-3 h-3 transition-opacity duration-300",
                !checked ? "opacity-30 text-amber-600" : "opacity-0"
              )}
            />
            <Moon
              className={clsx(
                "w-3 h-3 transition-opacity duration-300",
                checked ? "opacity-30 text-slate-300" : "opacity-0"
              )}
            />
          </div>
        </div>
      </div>
    </label>
  );
};
