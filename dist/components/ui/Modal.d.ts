import { default as React } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}
export declare const Modal: React.FC<ModalProps>;
export {};
