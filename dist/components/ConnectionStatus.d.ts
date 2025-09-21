import { default as React } from 'react';

interface ConnectionStatusProps {
    status: string;
    instanceName: string;
    lastUpdate?: Date;
    onReconnect?: () => void;
}
export declare const ConnectionStatus: React.FC<ConnectionStatusProps>;
export {};
