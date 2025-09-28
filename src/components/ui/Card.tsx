import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  style,
  ...props
}) => {
  const cardStyles = {
    backgroundColor: "var(--theme-background)",
    borderColor: "var(--theme-border)",
    color: "var(--theme-foreground)",
    ...style,
  };

  return (
    <div
      className={clsx("border rounded-lg shadow-sm p-6", className)}
      style={cardStyles}
      {...props}
    >
      {children}
    </div>
  );
};
