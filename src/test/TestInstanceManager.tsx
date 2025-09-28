import { useState } from "react";
import { InstanceCard } from "../components/InstanceCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Loading } from "../components/ui/Loading";
import { CreateInstanceModal } from "../components/CreateInstanceModal";
import { QRCodeModal } from "../components/QRCodeModal";
import { SettingsModal } from "../components/SettingsModal";
import { ThemeCustomizer } from "../components/ThemeCustomizer";
import { Plus, RefreshCw, Palette } from "lucide-react";
import { ThemeSwitch } from "../components/ui/ThemeSwitch";
import { useTheme } from "../hooks/useTheme";
import type { InstanceSettings } from "../types";

interface MockInstance {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "connecting";
  integration: string;
  connectionState?: string;
  qrCode?: string;
  contactsCount?: number;
  chatsCount?: number;
  [key: string]: any;
}

interface TestInstanceManagerProps {
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
}

export function TestInstanceManager({
  showThemeToggle = false,
  showThemeCustomizer = false,
}: TestInstanceManagerProps = {}) {
  const { theme, toggleTheme } = useTheme();
  const [showThemeCustomizerModal, setShowThemeCustomizerModal] =
    useState(false);
  const [instances, setInstances] = useState<MockInstance[]>([
    {
      id: "1",
      name: "whatsapp-test-1",
      status: "connected" as const,
      integration: "WHATSAPP-BAILEYS",
      connectionState: "open",
      contactsCount: 247,
      chatsCount: 52,
    },
    {
      id: "2",
      name: "whatsapp-test-2",
      status: "disconnected" as const,
      integration: "WHATSAPP-BAILEYS",
      connectionState: "close",
    },
    {
      id: "3",
      name: "whatsapp-test-3",
      status: "connecting" as const,
      integration: "WHATSAPP-BAILEYS",
      connectionState: "connecting",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<string | null>(null);

  const [instanceSettings, setInstanceSettings] = useState<InstanceSettings>({
    rejectCall: false,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: false,
    alwaysOnline: false,
    readMessages: false,
    readStatus: false,
    syncFullHistory: false,
  });

  // Simulação de loading com delay
  const simulateLoading = async (duration: number = 2000) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, duration));
    setLoading(false);
  };

  // Mock functions
  const handleCreateInstance = async (instanceName: string) => {
    await simulateLoading(1500);

    const newInstance: MockInstance = {
      id: Date.now().toString(),
      name: instanceName,
      status: "disconnected",
      integration: "WHATSAPP-BAILEYS",
      connectionState: "close",
    };

    setInstances((prev) => [...prev, newInstance]);
    setShowCreateForm(false);
  };

  const handleConnectInstance = async (instanceName: string) => {
    await simulateLoading(3000);

    // Simular geração de QR Code
    const mockQRCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`;

    setQRCodeData(mockQRCode);
    setShowQRCode(instanceName);

    // Simular conexão após 5 segundos
    setTimeout(() => {
      setInstances((prev) =>
        prev.map((inst) =>
          inst.name === instanceName
            ? { ...inst, status: "connected" as const, connectionState: "open" }
            : inst
        )
      );
      setShowQRCode(null);
      setQRCodeData(null);
    }, 5000);
  };

  const handleDisconnectInstance = async (instanceName: string) => {
    await simulateLoading(1000);

    setInstances((prev) =>
      prev.map((inst) =>
        inst.name === instanceName
          ? {
              ...inst,
              status: "disconnected" as const,
              connectionState: "close",
            }
          : inst
      )
    );
  };

  const handleDeleteInstance = async (instanceName: string) => {
    await simulateLoading(1500);

    setInstances((prev) => prev.filter((inst) => inst.name !== instanceName));
  };

  const handleRefresh = async () => {
    await simulateLoading(1000);

    // Simular mudanças de status aleatórias
    setInstances((prev) =>
      prev.map((inst) => {
        const statuses: ("connected" | "disconnected" | "connecting")[] = [
          "connected",
          "disconnected",
          "connecting",
        ];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];
        return {
          ...inst,
          status: randomStatus,
          connectionState:
            randomStatus === "connected"
              ? "open"
              : randomStatus === "connecting"
              ? "connecting"
              : "close",
        };
      })
    );
  };

  const handleSettingsUpdate = async (settings: InstanceSettings) => {
    await simulateLoading(800);

    setInstanceSettings(settings);
    setShowSettings(null);
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{ backgroundColor: "var(--theme-muted)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🧪 Test Environment - Instâncias WhatsApp ({instances.length})
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Ambiente de teste com dados mockados para experimentar
              funcionalidades
            </p>
          </div>

          <div className="flex gap-4 flex-wrap items-center">
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

            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowCreateForm(true)}
              disabled={loading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Instância
            </Button>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-3">
              <Loading size="sm" />
              <span className="text-gray-900 dark:text-white">
                Processando...
              </span>
            </div>
          </div>
        )}

        {/* Instances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {instances.map((instance) => (
            <InstanceCard
              key={instance.id}
              instance={instance}
              onConnect={() => handleConnectInstance(instance.id)}
              onDisconnect={() => handleDisconnectInstance(instance.id)}
              onDelete={() => handleDeleteInstance(instance.id)}
              onSettings={() => setShowSettings(instance.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {instances.length === 0 && !loading && (
          <Card className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma instância de teste
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Crie sua primeira instância de teste para experimentar
            </p>
            <Button variant="primary" onClick={() => setShowCreateForm(true)}>
              Criar Primeira Instância
            </Button>
          </Card>
        )}

        {/* Test Info Panel */}
        <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            🧪 Modo de Teste Ativo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Funcionalidades Mockadas:
              </h4>
              <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Criação de instâncias (1.5s delay)</li>
                <li>• Conexão/QR Code (3s + auto-connect em 5s)</li>
                <li>• Desconexão (1s delay)</li>
                <li>• Exclusão (1.5s delay)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Recursos de Teste:
              </h4>
              <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Tema personalizável com preview live</li>
                <li>• Status aleatórios no refresh</li>
                <li>• Configurações persistentes</li>
                <li>• Animações de carregamento</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Modals */}
        <CreateInstanceModal
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateInstance}
        />

        <QRCodeModal
          isOpen={!!showQRCode}
          onClose={() => {
            setShowQRCode(null);
            setQRCodeData(null);
          }}
          qrCode={qrCodeData || ""}
          instanceName={showQRCode || ""}
        />

        <SettingsModal
          isOpen={!!showSettings}
          onClose={() => setShowSettings(null)}
          settings={instanceSettings}
          onSettingsChange={setInstanceSettings}
          onSave={() => {
            handleSettingsUpdate(instanceSettings);
          }}
          instanceName={showSettings || ""}
        />

        <ThemeCustomizer
          isOpen={showThemeCustomizerModal}
          onClose={() => setShowThemeCustomizerModal(false)}
        />
      </div>
    </div>
  );
}
