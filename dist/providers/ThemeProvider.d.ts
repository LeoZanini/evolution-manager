import { default as React, ReactNode } from 'react';
import { Theme } from '../types';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
export declare const ThemeContext: React.Context<ThemeContextType | undefined>;
interface ThemeProviderProps {
    children: ReactNode;
    theme: Theme;
    toggleTheme: () => void;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
