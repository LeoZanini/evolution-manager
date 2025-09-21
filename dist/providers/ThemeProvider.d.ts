import { default as React, ReactNode } from 'react';

export interface ThemeContextType {
    theme: {
        name: string;
        colors: {
            background: string;
            text: string;
            primary: string;
            secondary: string;
            success: string;
            warning: string;
            danger: string;
        };
    };
    toggleTheme: () => void;
}
export declare const ThemeContext: React.Context<ThemeContextType | undefined>;
interface ThemeProviderProps {
    children: ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
