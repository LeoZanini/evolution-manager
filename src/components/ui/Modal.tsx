import React from "react";
import styled from "styled-components";
import { useTheme } from "../../hooks/useTheme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const ModalContainer = styled.div<{ $size: string; $theme: any }>`
  background: ${(props) => props.$theme.colors.background};
  border-radius: ${(props) => props.$theme.borderRadius};
  border: 1px solid ${(props) => props.$theme.colors.border};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow-y: auto;

  ${(props) => {
    const sizes = {
      sm: "width: 400px; max-width: 90vw;",
      md: "width: 500px; max-width: 90vw;",
      lg: "width: 700px; max-width: 90vw;",
      xl: "width: 900px; max-width: 95vw;",
    };
    return sizes[props.$size as keyof typeof sizes];
  }}
`;

const Header = styled.div<{ $theme: any }>`
  padding: 20px 24px 16px;
  border-bottom: 1px solid ${(props) => props.$theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2<{ $theme: any }>`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const CloseButton = styled.button<{ $theme: any }>`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.$theme.colors.textSecondary};
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.$theme.colors.secondary};
  }
`;

const Content = styled.div`
  padding: 20px 24px;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) => {
  const { theme } = useTheme();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer $size={size} $theme={theme}>
        {(title || showCloseButton) && (
          <Header $theme={theme}>
            {title && <Title $theme={theme}>{title}</Title>}
            {showCloseButton && (
              <CloseButton $theme={theme} onClick={onClose}>
                ×
              </CloseButton>
            )}
          </Header>
        )}
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};
