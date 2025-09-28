import { default as React, ReactNode } from 'react';

export interface CustomTheme {
    name: string;
    isDark: boolean;
    colors: {
        background: string;
        foreground: string;
        primary: string;
        secondary: string;
        accent: string;
        success: string;
        warning: string;
        danger: string;
        border: string;
        muted: string;
        text?: string;
    };
}
export interface ThemeContextType {
    theme: CustomTheme;
    toggleTheme: () => void;
    setCustomTheme: (theme: CustomTheme) => void;
    resetToDefaultTheme: () => void;
    isCustomTheme: boolean;
    isDarkMode: boolean;
}
export declare const ThemeContext: React.Context<ThemeContextType | undefined>;
interface ThemeProviderProps {
    children: ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
