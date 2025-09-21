import { default as React } from 'react';

interface InstanceManagerProps {
    baseUrl: string;
    apiKey: string;
    refreshInterval?: number;
    autoRefresh?: boolean;
    showCreateButton?: boolean;
    showThemeToggle?: boolean;
    maxInstances?: number;
    className?: string;
    style?: React.CSSProperties;
    onInstanceCreated?: (name: string) => void;
    onInstanceDeleted?: (name: string) => void;
    onInstanceConnected?: (name: string) => void;
}
export declare function InstanceManager({ baseUrl, apiKey, refreshInterval, autoRefresh, showCreateButton, showThemeToggle, maxInstances, className, style, onInstanceCreated, onInstanceDeleted, onInstanceConnected, }: InstanceManagerProps): import("react/jsx-runtime").JSX.Element;
export {};
