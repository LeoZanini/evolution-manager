import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Monitor,
} from "lucide-react";
import clsx from "clsx";

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
}

export const InstanceCard: React.FC<InstanceCardProps> = ({
  instance,
  onConnect,
  onDisconnect,
  onDelete,
  onSettings,
}) => {
  const getStatusInfo = () => {
    if (instance.isGeneratingQR) {
      return {
        text: "Gerando QR Code...",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        badge: "bg-blue-500",
        showLoader: true,
      };
    }

    if (instance.qrCode) {
      return {
        text: "Escaneie com seu celular",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800",
        badge: "bg-yellow-500",
        showQR: true,
      };
    }

    if (instance.isConnecting) {
      return {
        text: "Conectando...",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        border: "border-orange-200 dark:border-orange-800",
        badge: "bg-orange-500",
        showLoader: true,
      };
    }

    switch (instance.status) {
      case "connected":
        return {
          text: "Conectado",
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          badge: "bg-green-500",
          showStats: true,
        };
      case "connecting":
        return {
          text: "Conectando",
          bg: "bg-orange-50 dark:bg-orange-900/20",
          border: "border-orange-200 dark:border-orange-800",
          badge: "bg-orange-500",
          showLoader: true,
        };
      default:
        return {
          text: "Desconectado",
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
          badge: "bg-red-500",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card
      className={clsx(
        "transition-all duration-200",
        statusInfo.bg,
        statusInfo.border
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className={clsx("w-3 h-3 rounded-full", statusInfo.badge)} />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {instance.name}
          </h3>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {statusInfo.text}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 pt-0">
        {/* QR Code Section */}
        {statusInfo.showQR && instance.qrCode && (
          <div className="mb-4 flex flex-col items-center space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <img
                src={instance.qrCode}
                alt="QR Code para conectar WhatsApp"
                className="w-32 h-32"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Abra o WhatsApp no seu celular e escaneie este código
            </p>
          </div>
        )}

        {/* Loading State */}
        {statusInfo.showLoader && (
          <div className="mb-4 flex flex-col items-center space-y-3">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <Loading size="md" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {statusInfo.text}
            </p>
          </div>
        )}

        {/* Stats (when connected) */}
        {statusInfo.showStats && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Contatos
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                {instance.contactsCount || 0}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Chats
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                {instance.chatsCount || 0}
              </p>
            </div>
          </div>
        )}

        {/* Instance Details */}
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div>
            <span className="font-medium">Integração:</span>{" "}
            <span className="text-gray-900 dark:text-white">
              {instance.integration || "WHATSAPP-BAILEYS"}
            </span>
          </div>
          {instance.connectionState && (
            <div>
              <span className="font-medium">Estado:</span>{" "}
              <span className="text-gray-900 dark:text-white">
                {instance.connectionState}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
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

          <RouterLink to={`/controller/${instance.name}`}>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center space-x-1"
            >
              <Monitor className="w-4 h-4" />
              <span>Controller</span>
            </Button>
          </RouterLink>

          <Button
            onClick={() => onSettings?.(instance.name)}
            size="sm"
            variant="ghost"
            className="flex items-center space-x-1"
          >
            <Settings className="w-4 h-4" />
            <span>Config</span>
          </Button>

          <Button
            onClick={() => onDelete?.(instance.name)}
            size="sm"
            variant="danger"
            className="flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Excluir</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
