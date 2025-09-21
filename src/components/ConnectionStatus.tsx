import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";

interface ConnectionStatusProps {
  status: "connected" | "disconnected" | "connecting";
  instanceName?: string;
  lastUpdate?: Date;
  onReconnect?: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIndicator = styled.div<{ $status: string; $theme: any }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => {
    switch (props.$status) {
      case "connected":
        return props.$theme.colors.success;
      case "connecting":
        return props.$theme.colors.warning;
      default:
        return props.$theme.colors.danger;
    }
  }};

  ${(props) =>
    props.$status === "connecting" &&
    `
    animation: pulse 2s infinite;
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `}
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InstanceName = styled.span<{ $theme: any }>`
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const LastUpdate = styled.span<{ $theme: any }>`
  font-size: 12px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const ReconnectButton = styled.button<{ $theme: any }>`
  background: none;
  border: 1px solid ${(props) => props.$theme.colors.primary};
  color: ${(props) => props.$theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.$theme.colors.primary};
    color: white;
  }
`;

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  instanceName,
  lastUpdate,
  onReconnect,
}) => {
  const { theme } = useTheme();

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Conectado";
      case "connecting":
        return "Conectando...";
      default:
        return "Desconectado";
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      default:
        return "danger";
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return null;
    return `Última atualização: ${lastUpdate.toLocaleTimeString()}`;
  };

  return (
    <Card variant="outlined" padding="md">
      <Container>
        <StatusIndicator $status={status} $theme={theme} />
        <InfoContainer>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {instanceName && (
              <InstanceName $theme={theme}>{instanceName}</InstanceName>
            )}
            <Badge variant={getStatusVariant()} size="sm">
              {getStatusText()}
            </Badge>
          </div>
          {lastUpdate && (
            <LastUpdate $theme={theme}>{formatLastUpdate()}</LastUpdate>
          )}
        </InfoContainer>
        {status === "disconnected" && onReconnect && (
          <ReconnectButton $theme={theme} onClick={onReconnect}>
            Reconectar
          </ReconnectButton>
        )}
      </Container>
    </Card>
  );
};
