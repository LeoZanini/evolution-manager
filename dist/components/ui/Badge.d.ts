import { default as React } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
}
export declare const Badge: React.FC<BadgeProps>;
export {};
