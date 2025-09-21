import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../../hooks/useTheme";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Spinner = styled.div<{ $size: string; $theme: any }>`
  border: 2px solid ${(props) => props.$theme.colors.secondary};
  border-top: 2px solid ${(props) => props.$theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  ${(props) => {
    const sizes = {
      sm: "width: 16px; height: 16px;",
      md: "width: 24px; height: 24px;",
      lg: "width: 32px; height: 32px;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div<{ $size: string; $theme: any; $delay: number }>`
  background: ${(props) => props.$theme.colors.primary};
  border-radius: 50%;
  animation: ${bounce} 1.4s ease-in-out infinite both;
  animation-delay: ${(props) => props.$delay}s;

  ${(props) => {
    const sizes = {
      sm: "width: 8px; height: 8px;",
      md: "width: 12px; height: 12px;",
      lg: "width: 16px; height: 16px;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}
`;

const PulseCircle = styled.div<{ $size: string; $theme: any }>`
  background: ${(props) => props.$theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;

  ${(props) => {
    const sizes = {
      sm: "width: 16px; height: 16px;",
      md: "width: 24px; height: 24px;",
      lg: "width: 32px; height: 32px;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}
`;

const Text = styled.span<{ $theme: any }>`
  font-size: 14px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  variant = "spinner",
  text,
}) => {
  const { theme } = useTheme();

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return (
          <DotsContainer>
            <Dot $size={size} $theme={theme} $delay={0} />
            <Dot $size={size} $theme={theme} $delay={0.16} />
            <Dot $size={size} $theme={theme} $delay={0.32} />
          </DotsContainer>
        );
      case "pulse":
        return <PulseCircle $size={size} $theme={theme} />;
      default:
        return <Spinner $size={size} $theme={theme} />;
    }
  };

  return (
    <Container>
      {renderLoader()}
      {text && <Text $theme={theme}>{text}</Text>}
    </Container>
  );
};
