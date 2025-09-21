import { default as React } from 'react';
import { Instance } from '../types';

interface InstanceCardProps {
    instance: Instance;
    onConnect?: (instanceName: string) => void;
    onDisconnect?: (instanceName: string) => void;
    onDelete?: (instanceName: string) => void;
    onViewQR?: (instanceName: string) => void;
}
export declare const InstanceCard: React.FC<InstanceCardProps>;
export {};
