import React from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Loading } from "./ui/Loading";
import { InstanceData } from "../types";
import {
  Link,
  Pause,
  Settings,
  Trash2,
  Users,
  MessageCircle,
} from "lucide-react";

interface InstanceCardProps {
  instance: InstanceData & {
    qrCode?: string;
    isGeneratingQR?: boolean;
    isConnecting?: boolean;
  };
  onConnect?: (instanceName: string) => void;
  onDisconnect?: (instanceName: string) => void;
  onDelete?: (instanceName: string) => void;
  onSettings?: (instanceName: string) => void;
  hideDeleteButton?: boolean; // ✅ Nova prop para esconder botão Excluir
}

export const InstanceCard: React.FC<InstanceCardProps> = ({
  instance,
  onConnect,
  onDisconnect,
  onDelete,
  onSettings,
  hideDeleteButton = true, // ✅ Default = true (escondido)
}) => {
  const getStatusInfo = () => {
    if (instance.isGeneratingQR) {
      return {
        text: "Gerando QR Code...",
        badgeColor: "var(--theme-primary, #3b82f6)",
        textColor: "var(--theme-primary, #3b82f6)",
        showLoader: true,
      };
    }

    if (instance.qrCode) {
      return {
        text: "Escaneie com seu celular",
        badgeColor: "var(--theme-warning, #f59e0b)",
        textColor: "var(--theme-warning, #f59e0b)",
        showQR: true,
      };
    }

    if (instance.isConnecting) {
      return {
        text: "Conectando...",
        badgeColor: "var(--theme-warning, #f97316)",
        textColor: "var(--theme-warning, #f97316)",
        showLoader: true,
      };
    }

    switch (instance.status) {
      case "connected":
        return {
          text: "Conectado",
          badgeColor: "var(--theme-success, #10b981)",
          textColor: "var(--theme-success, #10b981)",
          showStats: true,
        };
      case "connecting":
        return {
          text: "Conectando",
          badgeColor: "var(--theme-warning, #f97316)",
          textColor: "var(--theme-warning, #f97316)",
          showLoader: true,
        };
      default:
        return {
          text: "Desconectado",
          badgeColor: "var(--theme-danger, #ef4444)",
          textColor: "var(--theme-danger, #ef4444)",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card
      style={{
        backgroundColor: "var(--theme-background)",
        borderColor: "var(--theme-border)",
        color: "var(--theme-foreground)",
      }}
      className="transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusInfo.badgeColor }}
          />
          <h3
            className="text-lg font-medium"
            style={{ color: "var(--theme-foreground)" }}
          >
            {instance.name}
          </h3>
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: statusInfo.textColor }}
        >
          {statusInfo.text}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 pt-0">
        {/* QR Code Section */}
        {statusInfo.showQR && instance.qrCode && (
          <div className="mb-4 flex flex-col items-center space-y-3">
            <div
              className="p-4 rounded-lg shadow-sm border"
              style={{
                backgroundColor: "var(--theme-background)",
                borderColor: "var(--theme-border)",
              }}
            >
              <img
                src={instance.qrCode}
                alt="QR Code para conectar WhatsApp"
                className="w-32 h-32"
              />
            </div>
            <p
              className="text-sm text-center"
              style={{ color: "var(--theme-secondary)" }}
            >
              Abra o WhatsApp no seu celular e escaneie este código
            </p>
          </div>
        )}

        {/* Loading State */}
        {statusInfo.showLoader && (
          <div className="mb-4 flex flex-col items-center space-y-3">
            <div
              className="p-8 rounded-lg shadow-sm border flex items-center justify-center"
              style={{
                backgroundColor: "var(--theme-background)",
                borderColor: "var(--theme-border)",
              }}
            >
              <Loading size="md" />
            </div>
            <p
              className="text-sm text-center"
              style={{ color: "var(--theme-secondary)" }}
            >
              {statusInfo.text}
            </p>
          </div>
        )}

        {/* Stats (when connected) */}
        {statusInfo.showStats && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--theme-background)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-center space-x-2">
                <Users
                  className="w-4 h-4"
                  style={{ color: "var(--theme-primary)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--theme-secondary)" }}
                >
                  Contatos
                </span>
              </div>
              <p
                className="text-lg font-semibold mt-1"
                style={{ color: "var(--theme-foreground)" }}
              >
                {instance.contactsCount || 0}
              </p>
            </div>
            <div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--theme-background)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-center space-x-2">
                <MessageCircle
                  className="w-4 h-4"
                  style={{ color: "var(--theme-success)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--theme-secondary)" }}
                >
                  Chats
                </span>
              </div>
              <p
                className="text-lg font-semibold mt-1"
                style={{ color: "var(--theme-foreground)" }}
              >
                {instance.chatsCount || 0}
              </p>
            </div>
          </div>
        )}

        {/* Instance Details */}
        <div
          className="space-y-2 text-sm mb-4"
          style={{ color: "var(--theme-secondary)" }}
        >
          <div>
            <span className="font-medium">Integração:</span>{" "}
            <span style={{ color: "var(--theme-foreground)" }}>
              {instance.integration || "WHATSAPP-BAILEYS"}
            </span>
          </div>
          {instance.connectionState && (
            <div>
              <span className="font-medium">Estado:</span>{" "}
              <span style={{ color: "var(--theme-foreground)" }}>
                {instance.connectionState}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => onSettings?.(instance.name)}
            size="sm"
            variant="ghost"
            className="flex items-center space-x-1"
          >
            <Settings className="w-4 h-4" />
            <span>Config</span>
          </Button>

          {instance.status === "connected" ? (
            <Button
              onClick={() => onDisconnect?.(instance.name)}
              size="sm"
              variant="secondary"
              className="flex items-center space-x-1"
            >
              <Pause className="w-4 h-4" />
              <span>Desconectar</span>
            </Button>
          ) : (
            <Button
              onClick={() => onConnect?.(instance.name)}
              size="sm"
              variant="secondary"
              className="flex items-center space-x-1"
              disabled={instance.isGeneratingQR || instance.isConnecting}
            >
              <Link className="w-4 h-4" />
              <span>Conectar</span>
            </Button>
          )}

          {/* ✅ 2. Botão Config */}

          {/* ✅ 3. Botão Excluir (apenas se não estiver escondido) */}
          {!hideDeleteButton && (
            <Button
              onClick={() => onDelete?.(instance.name)}
              size="sm"
              variant="danger"
              className="flex items-center space-x-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Excluir</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
