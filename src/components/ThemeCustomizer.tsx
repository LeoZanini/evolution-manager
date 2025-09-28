import React, { useState, useEffect } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ThemeSwitch } from "./ui/ThemeSwitch";
import { Palette, RotateCcw, Download, Copy, Check } from "lucide-react";
import { CustomTheme } from "../providers/ThemeProvider";
import { useTheme } from "../hooks/useTheme";

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultLightTheme: CustomTheme = {
  name: "custom-light",
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
  },
};

const defaultDarkTheme: CustomTheme = {
  name: "custom-dark",
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
  },
};

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    theme: contextTheme,
    setCustomTheme,
    resetToDefaultTheme,
    isCustomTheme,
  } = useTheme();
  const [theme, setTheme] = useState<CustomTheme>(contextTheme);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sincroniza o estado local com o contexto quando o modal abre ou o contexto muda
  useEffect(() => {
    if (isOpen) {
      // Garante que sempre tem um tema válido com todas as propriedades
      const validTheme = {
        ...contextTheme,
        colors: {
          ...contextTheme.colors,
          // Garante que todas as propriedades existem
          text: contextTheme.colors.text || contextTheme.colors.foreground,
        },
      };
      console.log("Carregando tema no customizer:", validTheme);
      setTheme(validTheme);
    }
  }, [isOpen, contextTheme]);

  const handleColorChange = (
    colorKey: keyof CustomTheme["colors"],
    value: string
  ) => {
    setTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
  };

  const handleApplyTheme = () => {
    console.log("Aplicando tema:", theme);

    // Aplica o tema no contexto global
    setCustomTheme({
      ...theme,
      name: `custom-${theme.isDark ? "dark" : "light"}-${Date.now()}`,
    });

    // Força a aplicação das CSS custom properties imediatamente
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Aplica a classe dark/light
    if (theme.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    onClose();
  };
  const handleResetTheme = () => {
    console.log("Resetando para tema padrão");
    resetToDefaultTheme();

    // Atualiza o estado local com o tema padrão
    const defaultTheme = theme.isDark ? defaultDarkTheme : defaultLightTheme;
    setTheme({
      ...defaultTheme,
      name: `default-${theme.isDark ? "dark" : "light"}`,
    });
  };

  const handleToggleDarkMode = (isDark: boolean) => {
    // Sempre aplica as cores do tema padrão quando muda entre light/dark
    const baseTheme = isDark ? defaultDarkTheme : defaultLightTheme;
    console.log("Mudando para modo:", isDark ? "dark" : "light", baseTheme);

    setTheme({
      ...baseTheme,
      isDark,
      name: `default-${isDark ? "dark" : "light"}`,
    });
  };

  const generateThemeCode = () => {
    const themeName = theme.isDark ? "defaultDarkTheme" : "defaultLightTheme";
    return `const ${themeName}: CustomTheme = {
  name: "${theme.name}",
  isDark: ${theme.isDark},
  colors: {
    background: "${theme.colors.background}",
    foreground: "${theme.colors.foreground}",
    primary: "${theme.colors.primary}",
    secondary: "${theme.colors.secondary}",
    accent: "${theme.colors.accent}",
    success: "${theme.colors.success}",
    warning: "${theme.colors.warning}",
    danger: "${theme.colors.danger}",
    border: "${theme.colors.border}",
    muted: "${theme.colors.muted}",
  },
};`;
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateThemeCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleBackFromExport = () => {
    setShowExportModal(false);
    setCopied(false);
  };

  const colorFields = [
    {
      key: "background",
      label: "Fundo",
      description: "Cor de fundo principal",
    },
    {
      key: "foreground",
      label: "Texto",
      description: "Cor do texto principal",
    },
    {
      key: "primary",
      label: "Primária",
      description: "Cor primária (botões, links)",
    },
    { key: "secondary", label: "Secundária", description: "Cor secundária" },
    { key: "accent", label: "Destaque", description: "Cor de destaque" },
    { key: "success", label: "Sucesso", description: "Verde para sucesso" },
    { key: "warning", label: "Aviso", description: "Amarelo para avisos" },
    { key: "danger", label: "Perigo", description: "Vermelho para erros" },
    { key: "border", label: "Borda", description: "Cor das bordas" },
    { key: "muted", label: "Silenciado", description: "Cor de fundo suave" },
  ] as const;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-2 w-full flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Personalizar Tema
          </h2>
        </div>
        {/* Modo Escuro/Claro */}
        <div className="mb-6  bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Modo
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Escolha entre tema claro ou escuro
              </p>
            </div>
            <ThemeSwitch
              checked={theme.isDark}
              onCheckedChange={handleToggleDarkMode}
            />
          </div>
        </div>
        {/* Cores */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {colorFields.map(({ key, label, description }) => (
            <div key={key} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {label}
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={theme.colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-12 h-10 p-1 border-2"
                />
                <Input
                  type="text"
                  value={theme.colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-24 text-xs font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Preview */}
        <div
          className="mb-6 p-4 rounded-lg border-2"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            color: theme.colors.foreground,
          }}
        >
          <h4 className="font-semibold mb-2">Preview do Tema</h4>
          <div className="flex gap-2 flex-wrap">
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Primário
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.colors.secondary }}
            >
              Secundário
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.colors.accent }}
            >
              Destaque
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.colors.success }}
            >
              Sucesso
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.colors.warning }}
            >
              Aviso
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.colors.danger }}
            >
              Perigo
            </button>
          </div>
        </div>{" "}
        {/* Ações */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={handleResetTheme}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {isCustomTheme ? "Voltar ao Padrão" : "Resetar Cores"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Tema
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleApplyTheme}>
              {isCustomTheme ? "Atualizar Tema" : "Criar Tema Personalizado"}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Exportação */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        className="max-w-4xl"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Exportar Tema Personalizado
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Copie o código abaixo e substitua o tema padrão no seu projeto para
            usar este tema personalizado permanentemente.
          </p>

          <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
            <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap font-mono">
              <code>{generateThemeCode()}</code>
            </pre>
            <Button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-2"
              variant="ghost"
              size="sm"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 Como usar:
            </h3>
            <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
              <li>Copie o código acima</li>
              <li>Substitua o tema padrão correspondente no seu projeto</li>
              <li>Ou passe como prop customizada para o EvolutionManager</li>
              <li>Reinicie sua aplicação para ver as mudanças</li>
            </ol>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              onClick={handleBackFromExport}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Voltar ao Editor
            </Button>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowExportModal(false)}
              >
                Fechar
              </Button>
              <Button
                variant="primary"
                onClick={handleCopyCode}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Código
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};
