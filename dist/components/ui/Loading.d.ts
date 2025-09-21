import { default as React } from 'react';

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    variant?: "spinner" | "dots" | "pulse";
    text?: string;
}
export declare const Loading: React.FC<LoadingProps>;
export {};
