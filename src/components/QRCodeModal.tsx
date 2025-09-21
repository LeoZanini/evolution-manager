import React from "react";
import { Modal } from "./ui/Modal";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { QRCodeDisplay } from "./QRCodeDisplay";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  instanceName: string;
  qrCode: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  instanceName,
  qrCode,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="max-w-md p-0 text-center">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Conectar: {instanceName}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Escaneie o QR Code com seu WhatsApp
          </p>

          <div className="mb-6">
            <QRCodeDisplay qrCode={qrCode} />
          </div>

          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </Card>
    </Modal>
  );
};
