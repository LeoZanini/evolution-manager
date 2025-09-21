import { default as React } from 'react';

interface ConnectionStatusProps {
    status: "connected" | "disconnected" | "connecting";
    instanceName?: string;
    lastUpdate?: Date;
    onReconnect?: () => void;
}
export declare const ConnectionStatus: React.FC<ConnectionStatusProps>;
export {};
