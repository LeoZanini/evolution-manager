import React from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { getStatusStyles, getStatusText } from "../utils/statusUtils";
import { InstanceData } from "../types";
import clsx from "clsx";

interface InstanceCardProps {
  instance: InstanceData;
  onConnect?: (instanceName: string) => void;
  onDisconnect?: (instanceName: string) => void;
  onDelete?: (instanceName: string) => void;
  onViewQR?: (instanceName: string) => void;
  onSettings?: (instanceName: string) => void;
}

export const InstanceCard: React.FC<InstanceCardProps> = ({
  instance,
  onConnect,
  onDisconnect,
  onDelete,
  onViewQR,
  onSettings,
}) => {
  const statusStyles = getStatusStyles(instance.status || "disconnected");
  const statusText = getStatusText(instance.status || "disconnected");

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      case "disconnected":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card className="relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {instance.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {instance.integration || "WHATSAPP-BAILEYS"}
          </p>
        </div>

        <Badge variant={getBadgeVariant(instance.status || "disconnected")}>
          {statusText}
        </Badge>
      </div>

      {/* Status Indicator */}
      <div
        className={clsx(
          "flex items-center gap-2 p-3 rounded-lg mb-4",
          statusStyles.bg,
          statusStyles.border,
          "border"
        )}
      >
        <div className={clsx("w-2 h-2 rounded-full", statusStyles.badge)} />
        <span className={clsx("text-sm", statusStyles.text)}>{statusText}</span>
      </div>

      {/* Instance Info */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Integração:</span>
          <span className="text-gray-900 dark:text-white">
            {instance.integration || "WHATSAPP-BAILEYS"}
          </span>
        </div>

        {instance.connectionState && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Estado:</span>
            <span className="text-gray-900 dark:text-white">
              {instance.connectionState}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {instance.status === "disconnected" && onConnect && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onConnect(instance.name)}
          >
            🔗 Conectar
          </Button>
        )}

        {instance.status === "connected" && onDisconnect && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onDisconnect(instance.name)}
          >
            ⏸️ Desconectar
          </Button>
        )}

        {onViewQR && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewQR(instance.name)}
          >
            📱 QR Code
          </Button>
        )}

        {onSettings && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSettings(instance.name)}
          >
            ⚙️ Config
          </Button>
        )}

        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(instance.name)}
            className="ml-auto"
          >
            🗑️ Deletar
          </Button>
        )}
      </div>
    </Card>
  );
};
