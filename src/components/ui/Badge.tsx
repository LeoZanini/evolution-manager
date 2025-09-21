import React from "react";
import styled from "styled-components";
import { useTheme } from "../../hooks/useTheme";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
}

const StyledBadge = styled.span<{
  $variant: string;
  $size: string;
  $theme: any;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-family: ${(props) => props.$theme.fonts.primary};
  font-weight: 500;

  ${(props) => {
    const sizes = {
      sm: "padding: 2px 8px; font-size: 12px; height: 20px;",
      md: "padding: 4px 12px; font-size: 12px; height: 24px;",
      lg: "padding: 6px 16px; font-size: 14px; height: 28px;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}

  ${(props) => {
    const variants = {
      primary: `
        background: ${props.$theme.colors.primary};
        color: white;
      `,
      secondary: `
        background: ${props.$theme.colors.secondary};
        color: ${props.$theme.colors.text};
      `,
      success: `
        background: ${props.$theme.colors.success};
        color: white;
      `,
      warning: `
        background: ${props.$theme.colors.warning};
        color: white;
      `,
      danger: `
        background: ${props.$theme.colors.danger};
        color: white;
      `,
    };
    return variants[props.$variant as keyof typeof variants];
  }}
`;

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <StyledBadge $variant={variant} $size={size} $theme={theme} {...props}>
      {children}
    </StyledBadge>
  );
};
