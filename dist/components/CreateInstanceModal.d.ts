import { default as React } from 'react';
interface CreateInstanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => Promise<void>;
    defaultName?: string;
}
export declare const CreateInstanceModal: React.FC<CreateInstanceModalProps>;
export {};
