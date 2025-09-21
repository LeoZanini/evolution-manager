import { default as React } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: "default" | "outlined" | "filled";
    inputSize?: "sm" | "md" | "lg";
    error?: boolean;
    label?: string;
    helperText?: string;
}
export declare const Input: React.FC<InputProps>;
export {};
