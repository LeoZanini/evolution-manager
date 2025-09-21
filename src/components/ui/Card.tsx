import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
