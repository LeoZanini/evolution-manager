import React from "react";
import styled from "styled-components";
import { useTheme } from "../../hooks/useTheme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const StyledButton = styled.button<{
  $variant: string;
  $size: string;
  $theme: any;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius};
  font-family: ${(props) => props.$theme.fonts.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    const sizes = {
      sm: "padding: 8px 16px; font-size: 14px; height: 32px;",
      md: "padding: 12px 20px; font-size: 14px; height: 40px;",
      lg: "padding: 16px 24px; font-size: 16px; height: 48px;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}

  ${(props) => {
    const variants = {
      primary: `
        background: ${props.$theme.colors.primary};
        color: white;
        &:hover { background: ${props.$theme.colors.primaryHover}; }
      `,
      secondary: `
        background: ${props.$theme.colors.secondary};
        color: ${props.$theme.colors.text};
        &:hover { background: ${props.$theme.colors.secondaryHover}; }
      `,
      danger: `
        background: ${props.$theme.colors.danger};
        color: white;
        &:hover { opacity: 0.9; }
      `,
      ghost: `
        background: transparent;
        color: ${props.$theme.colors.primary};
        border: 1px solid ${props.$theme.colors.border};
        &:hover { background: ${props.$theme.colors.secondary}; }
      `,
    };
    return variants[props.$variant as keyof typeof variants];
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $theme={theme}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div>⏳</div>}
      {children}
    </StyledButton>
  );
};
