import React from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  theme = "light",
}) => {
  if (!isOpen) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          className={clsx(
            "relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border",
            className
          )}
          style={{
            backgroundColor: `var(--theme-background${
              isDark ? "-dark" : "-light"
            })`,
            borderColor: `var(--theme-border${isDark ? "-dark" : "-light"})`,
            color: `var(--theme-foreground${isDark ? "-dark" : "-light"})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
