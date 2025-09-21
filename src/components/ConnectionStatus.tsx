import React from "react";
import { Badge } from "./ui/Badge";
import { getStatusStyles, getStatusText } from "../utils/statusUtils";
import clsx from "clsx";

interface ConnectionStatusProps {
  status: string;
  instanceName: string;
  lastUpdate?: Date;
  onReconnect?: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  instanceName,
  lastUpdate,
}) => {
  const statusStyles = getStatusStyles(status);
  const statusText = getStatusText(status);

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
    <div
      className={clsx(
        "flex items-center justify-between p-3 border rounded-lg",
        statusStyles.bg,
        statusStyles.border
      )}
    >
      <div className="flex items-center gap-3">
        <div className={clsx("w-3 h-3 rounded-full", statusStyles.badge)} />

        <div>
          <p className={clsx("text-sm font-medium", statusStyles.text)}>
            {statusText}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {instanceName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={getBadgeVariant(status)}>{statusText}</Badge>

        {lastUpdate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};
