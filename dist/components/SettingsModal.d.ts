import { default as React } from 'react';
import { InstanceSettings } from '../types';
interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    instanceName: string;
    settings: InstanceSettings;
    onSettingsChange: (settings: InstanceSettings) => void;
    onSave: () => void;
}
export declare const SettingsModal: React.FC<SettingsModalProps>;
export {};
