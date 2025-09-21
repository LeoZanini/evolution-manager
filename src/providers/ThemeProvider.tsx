import React, { createContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Theme } from "../types";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
  toggleTheme,
}) => {
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
