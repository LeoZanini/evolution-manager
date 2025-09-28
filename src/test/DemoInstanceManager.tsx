import { useState } from "react";
import { Link } from "react-router-dom";
import { InstanceCard } from "../components/InstanceCard";
import { Button } from "../components/ui/Button";
import { Plus, RefreshCw, Palette, Settings } from "lucide-react";
import { ThemeSwitch } from "../components/ui/ThemeSwitch";
import { ThemeCustomizer } from "../components/ThemeCustomizer";
import { useTheme } from "../hooks/useTheme";

interface DemoInstanceManagerProps {
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
}

// Instâncias de teste
const testInstances = [
  {
    id: "1",
    name: "whatsapp-demo-1",
    status: "connected" as const,
    integration: "WHATSAPP-BAILEYS",
    connectionState: "open",
    contactsCount: 1203,
    chatsCount: 89,
  },
  {
    id: "2",
    name: "whatsapp-demo-2",
    status: "disconnected" as const,
    integration: "WHATSAPP-BAILEYS",
    connectionState: "close",
  },
  {
    id: "3",
    name: "whatsapp-demo-3",
    status: "connecting" as const,
    integration: "WHATSAPP-BAILEYS",
    connectionState: "connecting",
  },
];

export function DemoInstanceManager({
  showThemeToggle = false,
  showThemeCustomizer = false,
}: DemoInstanceManagerProps = {}) {
  const { theme, toggleTheme } = useTheme();
  const [showThemeCustomizerModal, setShowThemeCustomizerModal] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Instâncias WhatsApp Demo ({testInstances.length})
          </h2>

          <div className="flex gap-4 flex-wrap items-center">
            <Link to="/controller/whatsapp-demo-1">
              <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Testar Controller
              </Button>
            </Link>

            {showThemeCustomizer && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThemeCustomizerModal(true)}
              >
                <Palette className="w-4 h-4 mr-2" />
                Personalizar Tema
              </Button>
            )}

            {showThemeToggle && (
              <ThemeSwitch
                checked={theme.name === "dark" || theme.isDark}
                onCheckedChange={toggleTheme}
              />
            )}

            <Button variant="secondary" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>

            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Instância
            </Button>
          </div>
        </div>

        {/* Instances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testInstances.map((instance) => (
            <InstanceCard
              key={instance.id}
              instance={instance}
              onConnect={(name) => console.log(`Conectando: ${name}`)}
              onDelete={(name) => console.log(`Deletando: ${name}`)}
              onSettings={(name) => console.log(`Configurando: ${name}`)}
            />
          ))}
        </div>

        {/* Theme Customizer Modal */}
        <ThemeCustomizer
          isOpen={showThemeCustomizerModal}
          onClose={() => setShowThemeCustomizerModal(false)}
        />
      </div>
    </div>
  );
}
