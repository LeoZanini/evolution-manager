import React from "react";
import styled from "styled-components";
import { useTheme } from "../../hooks/useTheme";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "outlined" | "filled";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  label?: string;
  helperText?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label<{ $theme: any }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const StyledInput = styled.input<{
  $variant: string;
  $size: string;
  $error: boolean;
  $theme: any;
}>`
  border-radius: ${(props) => props.$theme.borderRadius};
  font-family: ${(props) => props.$theme.fonts.primary};
  transition: all 0.2s ease;
  outline: none;

  ${(props) => {
    const sizes = {
      sm: "padding: 8px 12px; font-size: 14px; height: 32px;",
      md: "padding: 12px 16px; font-size: 14px; height: 40px;",
      lg: "padding: 16px 20px; font-size: 16px; height: 48px;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}

  ${(props) => {
    const baseStyle = `
      color: ${props.$theme.colors.text};
      background: ${props.$theme.colors.background};
    `;

    if (props.$error) {
      return `
        ${baseStyle}
        border: 2px solid ${props.$theme.colors.danger};
        &:focus { border-color: ${props.$theme.colors.danger}; }
      `;
    }

    const variants = {
      default: `
        ${baseStyle}
        border: 1px solid ${props.$theme.colors.border};
        &:focus { border-color: ${props.$theme.colors.primary}; }
      `,
      outlined: `
        ${baseStyle}
        border: 2px solid ${props.$theme.colors.border};
        &:focus { border-color: ${props.$theme.colors.primary}; }
      `,
      filled: `
        ${baseStyle}
        border: 1px solid transparent;
        background: ${props.$theme.colors.secondary};
        &:focus { border-color: ${props.$theme.colors.primary}; }
      `,
    };
    return variants[props.$variant as keyof typeof variants];
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.$theme.colors.textSecondary};
  }
`;

const HelperText = styled.span<{ $error: boolean; $theme: any }>`
  font-size: 12px;
  color: ${(props) =>
    props.$error
      ? props.$theme.colors.danger
      : props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

export const Input: React.FC<InputProps> = ({
  variant = "default",
  inputSize = "md",
  error = false,
  label,
  helperText,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Container>
      {label && <Label $theme={theme}>{label}</Label>}
      <StyledInput
        $variant={variant}
        $size={inputSize}
        $error={error}
        $theme={theme}
        {...props}
      />
      {helperText && (
        <HelperText $error={error} $theme={theme}>
          {helperText}
        </HelperText>
      )}
    </Container>
  );
};
