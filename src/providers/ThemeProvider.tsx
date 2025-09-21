import React, { createContext, ReactNode, useState, useEffect } from "react";

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

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const lightTheme = {
  name: "light",
  colors: {
    background: "#ffffff",
    text: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
};

const darkTheme = {
  name: "dark",
  colors: {
    background: "#1f2937",
    text: "#f9fafb",
    primary: "#60a5fa",
    secondary: "#9ca3af",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);

    // Apply theme to document
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
