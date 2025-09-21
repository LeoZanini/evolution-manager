import { default as React } from 'react';
import { InstanceData } from '../types';

interface InstanceCardProps {
    instance: InstanceData;
    onConnect?: (instanceName: string) => void;
    onDisconnect?: (instanceName: string) => void;
    onDelete?: (instanceName: string) => void;
    onViewQR?: (instanceName: string) => void;
    onSettings?: (instanceName: string) => void;
}
export declare const InstanceCard: React.FC<InstanceCardProps>;
export {};
