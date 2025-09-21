import { default as React } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outlined" | "elevated";
    padding?: "sm" | "md" | "lg";
}
export declare const Card: React.FC<CardProps>;
export {};
