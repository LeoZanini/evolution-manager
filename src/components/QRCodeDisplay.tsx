import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Loading } from "./ui/Loading";

interface QRCodeDisplayProps {
  qrCode?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  instanceName?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const QRContainer = styled.div<{ $theme: any }>`
  padding: 20px;
  background: white;
  border-radius: ${(props) => props.$theme.borderRadius};
  border: 1px solid ${(props) => props.$theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  min-width: 200px;
`;

const QRImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const Title = styled.h3<{ $theme: any }>`
  margin: 0;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
  text-align: center;
`;

const Instructions = styled.p<{ $theme: any }>`
  margin: 0;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
`;

const ErrorMessage = styled.div<{ $theme: any }>`
  padding: 12px 16px;
  background: ${(props) => props.$theme.colors.dangerLight || "#fef2f2"};
  color: ${(props) => props.$theme.colors.danger};
  border-radius: ${(props) => props.$theme.borderRadius};
  border: 1px solid ${(props) => props.$theme.colors.danger};
  text-align: center;
  font-size: 14px;
`;

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCode,
  isLoading = false,
  onRefresh,
  instanceName,
}) => {
  const { theme } = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return <Loading size="lg" text="Gerando QR Code..." />;
    }

    if (!qrCode) {
      return (
        <>
          <ErrorMessage $theme={theme}>QR Code não disponível</ErrorMessage>
          {onRefresh && (
            <Button variant="primary" onClick={onRefresh}>
              Tentar Novamente
            </Button>
          )}
        </>
      );
    }

    return <QRImage src={qrCode} alt="QR Code para conexão" />;
  };

  return (
    <Card variant="elevated" padding="lg">
      <Container>
        <Title $theme={theme}>
          {instanceName ? `Conectar ${instanceName}` : "Conectar WhatsApp"}
        </Title>

        <Instructions $theme={theme}>
          1. Abra o WhatsApp no seu telefone
          <br />
          2. Toque em Menu ou Configurações e selecione "Aparelhos conectados"
          <br />
          3. Toque em "Conectar um aparelho"
          <br />
          4. Aponte seu telefone para esta tela para capturar o código
        </Instructions>

        <QRContainer $theme={theme}>{renderContent()}</QRContainer>

        {qrCode && onRefresh && (
          <Button variant="ghost" onClick={onRefresh}>
            Atualizar QR Code
          </Button>
        )}
      </Container>
    </Card>
  );
};
