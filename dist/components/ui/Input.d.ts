import { default as React } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
}
export declare const Input: React.FC<InputProps>;
export {};
