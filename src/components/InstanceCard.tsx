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
  hideDeleteButton?: boolean;
  theme?: "light" | "dark";
  qrCodeSize?: number;
}

export const InstanceCard: React.FC<InstanceCardProps> = ({
  instance,
  onConnect,
  onDisconnect,
  onDelete,
  onSettings,
  hideDeleteButton = true,
  theme = "light",
  qrCodeSize = 64,
}) => {
  const isDark = theme === "dark";
  const getStatusInfo = () => {
    // Cores fixas para status - não dependem do theme
    const statusColors = {
      primary: "#3b82f6", // azul
      success: "#10b981", // verde
      warning: "#f59e0b", // amarelo
      danger: "#ef4444", // vermelho
    };

    if (instance.isGeneratingQR) {
      return {
        text: "Gerando QR Code...",
        badgeColor: statusColors.primary,
        textColor: statusColors.primary,
        showLoader: true,
      };
    }

    if (instance.qrCode) {
      return {
        text: "Escaneie com seu celular",
        badgeColor: statusColors.warning,
        textColor: statusColors.warning,
        showQR: true,
      };
    }

    if (instance.isConnecting) {
      return {
        text: "Conectando...",
        badgeColor: statusColors.warning,
        textColor: statusColors.warning,
        showLoader: true,
      };
    }

    switch (instance.status) {
      case "connected":
        return {
          text: "Conectado",
          badgeColor: statusColors.success,
          textColor: statusColors.success,
          showStats: true,
        };
      case "connecting":
        return {
          text: "Conectando",
          badgeColor: statusColors.warning,
          textColor: statusColors.warning,
          showLoader: true,
        };
      default:
        return {
          text: "Desconectado",
          badgeColor: statusColors.danger,
          textColor: statusColors.danger,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card
      className="transition-all duration-200"
      style={{
        backgroundColor: `var(--theme-background${
          isDark ? "-dark" : "-light"
        })`,
        borderColor: `var(--theme-border${isDark ? "-dark" : "-light"})`,
        color: `var(--theme-foreground${isDark ? "-dark" : "-light"})`,
      }}
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
            style={{
              color: `var(--theme-foreground${isDark ? "-dark" : "-light"})`,
            }}
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
                backgroundColor: `var(--theme-background${
                  isDark ? "-dark" : "-light"
                })`,
                borderColor: `var(--theme-border${
                  isDark ? "-dark" : "-light"
                })`,
              }}
            >
              <img
                src={instance.qrCode}
                alt="QR Code para conectar WhatsApp"
                className={`size-${qrCodeSize}`}
              />
            </div>
            <p
              className="text-sm text-center"
              style={{
                color: `var(--theme-secondary${isDark ? "-dark" : "-light"})`,
              }}
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
                backgroundColor: `var(--theme-background${
                  isDark ? "-dark" : "-light"
                })`,
                borderColor: `var(--theme-border${
                  isDark ? "-dark" : "-light"
                })`,
              }}
            >
              <Loading size="md" />
            </div>
            <p
              className="text-sm text-center"
              style={{
                color: `var(--theme-secondary${isDark ? "-dark" : "-light"})`,
              }}
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
                backgroundColor: `var(--theme-background${
                  isDark ? "-dark" : "-light"
                })`,
                borderColor: `var(--theme-border${
                  isDark ? "-dark" : "-light"
                })`,
              }}
            >
              <div className="flex items-center space-x-2">
                <Users
                  className="w-4 h-4"
                  style={{
                    color: "#3b82f6", // azul fixo
                  }}
                />
                <span
                  className="text-sm"
                  style={{
                    color: `var(--theme-secondary${
                      isDark ? "-dark" : "-light"
                    })`,
                  }}
                >
                  Contatos
                </span>
              </div>
              <p
                className="text-lg font-semibold mt-1"
                style={{
                  color: `var(--theme-foreground${
                    isDark ? "-dark" : "-light"
                  })`,
                }}
              >
                {instance.contactsCount || 0}
              </p>
            </div>
            <div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: `var(--theme-background${
                  isDark ? "-dark" : "-light"
                })`,
                borderColor: `var(--theme-border${
                  isDark ? "-dark" : "-light"
                })`,
              }}
            >
              <div className="flex items-center space-x-2">
                <MessageCircle
                  className="w-4 h-4"
                  style={{
                    color: "#10b981", // verde fixo
                  }}
                />
                <span
                  className="text-sm"
                  style={{
                    color: `var(--theme-secondary${
                      isDark ? "-dark" : "-light"
                    })`,
                  }}
                >
                  Chats
                </span>
              </div>
              <p
                className="text-lg font-semibold mt-1"
                style={{
                  color: `var(--theme-foreground${
                    isDark ? "-dark" : "-light"
                  })`,
                }}
              >
                {instance.chatsCount || 0}
              </p>
            </div>
          </div>
        )}

        {/* Instance Details */}
        <div
          className="space-y-2 text-sm mb-4"
          style={{
            color: `var(--theme-secondary${isDark ? "-dark" : "-light"})`,
          }}
        >
          {instance.ownerJid && (
            <div>
              <span className="font-medium">Telefone:</span>{" "}
              <span
                style={{
                  color: `var(--theme-foreground${
                    isDark ? "-dark" : "-light"
                  })`,
                }}
              >
                {instance.ownerJid.replace("@s.whatsapp.net", "")}
              </span>
            </div>
          )}
          <div>
            <span className="font-medium">Integração:</span>{" "}
            <span
              style={{
                color: `var(--theme-foreground${isDark ? "-dark" : "-light"})`,
              }}
            >
              {instance.integration || "WHATSAPP-BAILEYS"}
            </span>
          </div>
          {instance.connectionState && (
            <div>
              <span className="font-medium">Estado:</span>{" "}
              <span
                style={{
                  color: `var(--theme-foreground${
                    isDark ? "-dark" : "-light"
                  })`,
                }}
              >
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
