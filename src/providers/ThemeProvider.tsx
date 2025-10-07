import React, { createContext, ReactNode, useState, useEffect } from "react";

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
    // Legacy colors for compatibility
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

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const lightTheme: CustomTheme = {
  name: "light",
  isDark: false,
  colors: {
    background: "#ffffff",
    foreground: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    border: "#e5e7eb",
    muted: "#f3f4f6",
    text: "#1f2937", // Legacy compatibility
  },
};

const darkTheme: CustomTheme = {
  name: "dark",
  isDark: true,
  colors: {
    background: "#1f2937",
    foreground: "#f9fafb",
    primary: "#60a5fa",
    secondary: "#9ca3af",
    accent: "#a78bfa",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    border: "#374151",
    muted: "#111827",
    text: "#f9fafb", // Legacy compatibility
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isCustomTheme, setIsCustomTheme] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("evolution-theme-mode"); // "light" | "dark"
    const savedIsCustom = localStorage.getItem("evolution-theme-is-custom"); // "true" | "false"

    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const currentMode = savedMode || (prefersDark ? "dark" : "light");
    const currentIsCustom = savedIsCustom === "true";

    setIsDark(currentMode === "dark");
    setIsCustomTheme(currentIsCustom);

    // Inicializando tema

    // Aplica o tema correto
    const theme = getThemeForMode(currentMode, currentIsCustom);
    applyThemeToDom(theme);
  }, []);

  // Função para obter o tema correto baseado no modo e se é personalizado
  const getThemeForMode = (mode: string, isCustom: boolean): CustomTheme => {
    if (isCustom) {
      // Tenta carregar tema personalizado
      const savedCustomTheme = localStorage.getItem(
        `evolution-custom-theme-${mode}`
      );
      if (savedCustomTheme) {
        try {
          const parsedTheme = JSON.parse(savedCustomTheme) as CustomTheme;
          return parsedTheme;
        } catch (error) {
          console.error(`Erro ao carregar tema personalizado ${mode}:`, error);
        }
      }
    }

    // Retorna tema padrão
    const defaultTheme = mode === "dark" ? darkTheme : lightTheme;
    return defaultTheme;
  };

  const applyThemeToDom = (theme: CustomTheme) => {
    const root = document.documentElement;

    // Remove all existing theme variables
    const style = root.style;
    for (let i = style.length - 1; i >= 0; i--) {
      const prop = style[i];
      if (prop.startsWith("--theme-")) {
        style.removeProperty(prop);
      }
    }

    // Apply CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Apply dark/light class
    if (theme.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newMode = isDark ? "light" : "dark";
    setIsDark(!isDark);

    // Salva a preferência de modo
    localStorage.setItem("evolution-theme-mode", newMode);

    // Aplica o tema do novo modo (personalizado ou padrão)
    const theme = getThemeForMode(newMode, isCustomTheme);
    applyThemeToDom(theme);
  };

  const handleSetCustomTheme = (theme: CustomTheme) => {
    // Salva como tema personalizado para o modo atual
    const mode = theme.isDark ? "dark" : "light";
    localStorage.setItem(
      `evolution-custom-theme-${mode}`,
      JSON.stringify(theme)
    );
    localStorage.setItem("evolution-theme-is-custom", "true");
    localStorage.setItem("evolution-theme-mode", mode);

    // Atualiza estados
    setIsCustomTheme(true);
    setIsDark(theme.isDark);

    applyThemeToDom(theme);
  };

  const resetToDefaultTheme = () => {
    // Remove flag de tema personalizado
    localStorage.setItem("evolution-theme-is-custom", "false");
    setIsCustomTheme(false);

    // Aplica tema padrão do modo atual
    const mode = isDark ? "dark" : "light";
    const theme = getThemeForMode(mode, false);
    applyThemeToDom(theme);
  };

  // Calcula o tema atual baseado no estado
  const currentTheme = getThemeForMode(
    isDark ? "dark" : "light",
    isCustomTheme
  );

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        toggleTheme,
        setCustomTheme: handleSetCustomTheme,
        resetToDefaultTheme,
        isCustomTheme,
        isDarkMode: isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
