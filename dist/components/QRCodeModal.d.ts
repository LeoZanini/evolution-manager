import { default as React } from 'react';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    instanceName: string;
    qrCode: string;
}
export declare const QRCodeModal: React.FC<QRCodeModalProps>;
export {};
