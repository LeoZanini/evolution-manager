import React from "react";
import { Loading } from "./ui/Loading";

interface QRCodeDisplayProps {
  qrCode?: string;
  size?: number;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCode,
  size = 256,
  className = "",
}) => {
  if (!qrCode) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <Loading size="lg" className="mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gerando QR Code...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-block p-4 bg-white rounded-lg shadow-sm ${className}`}
    >
      <img
        src={qrCode}
        alt="QR Code para conectar WhatsApp"
        className="block"
        style={{ width: size, height: size }}
      />
    </div>
  );
};
