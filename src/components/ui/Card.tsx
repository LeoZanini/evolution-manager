import React from "react";
import styled from "styled-components";
import { useTheme } from "../../hooks/useTheme";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
  padding?: "sm" | "md" | "lg";
}

const StyledCard = styled.div<{
  $variant: string;
  $padding: string;
  $theme: any;
}>`
  background: ${(props) => props.$theme.colors.background};
  border-radius: ${(props) => props.$theme.borderRadius};
  transition: all 0.2s ease;

  ${(props) => {
    const paddings = {
      sm: "padding: 12px;",
      md: "padding: 16px;",
      lg: "padding: 24px;",
    };
    return paddings[props.$padding as keyof typeof paddings];
  }}

  ${(props) => {
    const variants = {
      default: `
        border: 1px solid ${props.$theme.colors.border};
      `,
      outlined: `
        border: 2px solid ${props.$theme.colors.primary};
      `,
      elevated: `
        border: 1px solid ${props.$theme.colors.border};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        &:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `,
    };
    return variants[props.$variant as keyof typeof variants];
  }}
`;

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <StyledCard $variant={variant} $padding={padding} $theme={theme} {...props}>
      {children}
    </StyledCard>
  );
};
