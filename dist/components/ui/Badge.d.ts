import { default as React } from 'react';

interface BadgeProps {
    variant?: "success" | "warning" | "danger" | "default";
    children: React.ReactNode;
    className?: string;
}
export declare const Badge: React.FC<BadgeProps>;
export {};
