import { default as React } from 'react';

interface QRCodeDisplayProps {
    qrCode?: string;
    isLoading?: boolean;
    onRefresh?: () => void;
    instanceName?: string;
}
export declare const QRCodeDisplay: React.FC<QRCodeDisplayProps>;
export {};
