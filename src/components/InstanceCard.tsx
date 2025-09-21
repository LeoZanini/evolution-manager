import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import type { Instance } from "../types";

interface InstanceCardProps {
  instance: Instance;
  onConnect?: (instanceName: string) => void;
  onDisconnect?: (instanceName: string) => void;
  onDelete?: (instanceName: string) => void;
  onViewQR?: (instanceName: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const InstanceInfo = styled.div`
  flex: 1;
`;

const InstanceName = styled.h3<{ $theme: any }>`
  margin: 0 0 8px 0;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
  font-size: 18px;
  font-weight: 600;
`;

const InstanceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailItem = styled.div<{ $theme: any }>`
  font-size: 14px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};

  strong {
    color: ${(props) => props.$theme.colors.text};
    font-weight: 500;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
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

const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Divider = styled.hr<{ $theme: any }>`
  border: none;
  height: 1px;
  background: ${(props) => props.$theme.colors.border};
  margin: 0;
`;

export const InstanceCard: React.FC<InstanceCardProps> = ({
  instance,
  onConnect,
  onDisconnect,
  onDelete,
  onViewQR,
}) => {
  const { theme } = useTheme();

  const getStatusVariant = () => {
    switch (instance.status) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      default:
        return "danger";
    }
  };

  const getStatusText = () => {
    switch (instance.status) {
      case "connected":
        return "Conectado";
      case "connecting":
        return "Conectando...";
      default:
        return "Desconectado";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canConnect = instance.status === "disconnected";
  const canDisconnect = instance.status === "connected";
  const canViewQR = instance.status === "disconnected";

  return (
    <Card variant="elevated" padding="lg">
      <Container>
        <Header>
          <InstanceInfo>
            <InstanceName $theme={theme}>{instance.name}</InstanceName>
            <InstanceDetails>
              <DetailItem $theme={theme}>
                <strong>Webhook:</strong>{" "}
                {instance.webhook || "Não configurado"}
              </DetailItem>
              <DetailItem $theme={theme}>
                <strong>Criado em:</strong> {formatDate(instance.createdAt)}
              </DetailItem>
              {instance.lastConnection && (
                <DetailItem $theme={theme}>
                  <strong>Última conexão:</strong>{" "}
                  {formatDate(instance.lastConnection)}
                </DetailItem>
              )}
            </InstanceDetails>
          </InstanceInfo>

          <StatusContainer>
            <StatusIndicator $status={instance.status} $theme={theme} />
            <Badge variant={getStatusVariant()} size="sm">
              {getStatusText()}
            </Badge>
          </StatusContainer>
        </Header>

        <Divider $theme={theme} />

        <Actions>
          {canConnect && onConnect && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConnect(instance.name)}
            >
              Conectar
            </Button>
          )}

          {canDisconnect && onDisconnect && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDisconnect(instance.name)}
            >
              Desconectar
            </Button>
          )}

          {canViewQR && onViewQR && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onViewQR(instance.name)}
            >
              Ver QR Code
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    `Tem certeza que deseja excluir a instância "${instance.name}"?`
                  )
                ) {
                  onDelete(instance.name);
                }
              }}
            >
              Excluir
            </Button>
          )}
        </Actions>
      </Container>
    </Card>
  );
};
