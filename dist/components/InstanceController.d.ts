import { default as React } from 'react';

interface InstanceControllerProps {
    baseUrl: string;
    apiKey: string;
    instanceId: string;
    showControls?: boolean;
    showStatus?: boolean;
    showSettings?: boolean;
    showThemeToggle?: boolean;
    showThemeCustomizer?: boolean;
    onInstanceCreated?: (instanceName: string) => void;
    onInstanceDeleted?: (instanceName: string) => void;
    onInstanceConnected?: (instanceName: string) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const InstanceController: React.FC<InstanceControllerProps>;
export {};
