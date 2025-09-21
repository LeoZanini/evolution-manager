import React, { useEffect, useState } from "react";
import { useEvolutionManager } from "../hooks/useEvolutionManager";
import { useTheme } from "../hooks/useTheme";
import { InstanceCard } from "./InstanceCard";
import { CreateInstanceModal } from "./CreateInstanceModal";
import { QRCodeModal } from "./QRCodeModal";
import { SettingsModal } from "./SettingsModal";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Loading } from "./ui/Loading";
import type { InstanceData, InstanceSettings } from "../types";

interface InstanceManagerProps {
  baseUrl: string;
  apiKey: string;
  refreshInterval?: number;
  autoRefresh?: boolean;
  showCreateButton?: boolean;
  showThemeToggle?: boolean;
  maxInstances?: number;
  className?: string;
  style?: React.CSSProperties;
  onInstanceCreated?: (name: string) => void;
  onInstanceDeleted?: (name: string) => void;
  onInstanceConnected?: (name: string) => void;
}

interface QRCodeResponse {
  data?: {
    qrcode?: string;
    base64?: string;
  };
  qrcode?: string;
  base64?: string;
  qr?: string;
}

export function InstanceManager({
  baseUrl,
  apiKey,
  refreshInterval = 10000,
  autoRefresh = true,
  showCreateButton = true,
  showThemeToggle = false,
  maxInstances,
  className,
  style,
  onInstanceCreated,
  onInstanceDeleted,
  onInstanceConnected,
}: InstanceManagerProps) {
  const { theme, toggleTheme } = useTheme();
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

  const {
    manager,
    instances,
    loading,
    error,
    createInstance,
    deleteInstance,
    connectInstance,
    refreshInstances,
    clearError,
  } = useEvolutionManager({ baseUrl, apiKey });

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshInstances();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInstances, autoRefresh, refreshInterval]);

  const handleCreateInstance = async (instanceName: string) => {
    try {
      await createInstance(instanceName, "WHATSAPP-BAILEYS");
      await refreshInstances();
      onInstanceCreated?.(instanceName);
    } catch (err) {
      console.error("Erro ao criar instância:", err);
    }
  };

  const handleConnectInstance = async (instanceName: string) => {
    try {
      const result = await connectInstance(instanceName);
      const qrCodeResult = result as unknown as QRCodeResponse;
      const qrCode =
        qrCodeResult?.data?.qrcode ||
        qrCodeResult?.data?.base64 ||
        qrCodeResult?.qrcode ||
        qrCodeResult?.base64 ||
        qrCodeResult?.qr;

      if (qrCode) {
        setQRCodeData(qrCode);
        setShowQRCode(instanceName);
        onInstanceConnected?.(instanceName);
      }
    } catch (err) {
      console.error("Erro ao conectar instância:", err);
    }
  };

  const handleDeleteInstance = async (instanceName: string) => {
    if (
      window.confirm(
        `Tem certeza que deseja deletar a instância "${instanceName}"?`
      )
    ) {
      try {
        await deleteInstance(instanceName);
        await refreshInstances();
        onInstanceDeleted?.(instanceName);
      } catch (err) {
        console.error("Erro ao deletar instância:", err);
      }
    }
  };

  const handleConfigureInstance = async (instanceName: string) => {
    try {
      if (manager && manager.setInstanceSettings) {
        await manager.setInstanceSettings(instanceName, instanceSettings);
        setShowSettings(null);
        alert("Configurações salvas com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao configurar instância:", err);
      alert("Erro ao salvar configurações");
    }
  };

  const canCreateMore = !maxInstances || instances.length < maxInstances;

  if (loading && instances.length === 0) {
    return (
      <div
        className={`flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-900 ${className}`}
        style={style}
      >
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 p-4 ${className}`}
      style={style}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Instâncias WhatsApp ({instances.length}
            {maxInstances && `/${maxInstances}`})
          </h2>

          <div className="flex gap-2 flex-wrap">
            {showThemeToggle && (
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme.name === "light" ? "🌙" : "☀️"}
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={refreshInstances}>
              🔄 Atualizar
            </Button>
            {showCreateButton && canCreateMore && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowCreateForm(true)}
              >
                ➕ Nova Instância
              </Button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 bg-danger-50 dark:bg-danger-500/10 border border-danger-500">
            <div className="flex justify-between items-center">
              <span className="text-danger-600 dark:text-danger-400">
                ❌ {error}
              </span>
              <Button variant="ghost" size="sm" onClick={clearError}>
                ✕
              </Button>
            </div>
          </Card>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center my-4">
            <Loading size="md" />
          </div>
        )}

        {/* Max Instances Warning */}
        {maxInstances && instances.length >= maxInstances && (
          <Card className="mb-6 bg-warning-50 dark:bg-warning-500/10 border border-warning-500">
            <span className="text-warning-600 dark:text-warning-400">
              ⚠️ Limite máximo de {maxInstances} instâncias atingido
            </span>
          </Card>
        )}

        {/* Instances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instances.map((instance: InstanceData) => (
            <InstanceCard
              key={instance.name}
              instance={instance}
              onConnect={() => handleConnectInstance(instance.name)}
              onDelete={() => handleDeleteInstance(instance.name)}
              onViewQR={() => setShowQRCode(instance.name)}
              onSettings={() => setShowSettings(instance.name)}
            />
          ))}
        </div>

        {/* Empty State */}
        {instances.length === 0 && !loading && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma instância encontrada
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Crie sua primeira instância WhatsApp para começar
            </p>
            {showCreateButton && (
              <Button variant="primary" onClick={() => setShowCreateForm(true)}>
                Criar Primeira Instância
              </Button>
            )}
          </Card>
        )}

        {/* Modals */}
        <CreateInstanceModal
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateInstance}
        />

        {showQRCode && qrCodeData && (
          <QRCodeModal
            isOpen={!!showQRCode}
            instanceName={showQRCode}
            qrCode={qrCodeData}
            onClose={() => {
              setShowQRCode(null);
              setQRCodeData(null);
            }}
          />
        )}

        {showSettings && (
          <SettingsModal
            isOpen={!!showSettings}
            instanceName={showSettings}
            settings={instanceSettings}
            onSettingsChange={setInstanceSettings}
            onSave={() => handleConfigureInstance(showSettings)}
            onClose={() => setShowSettings(null)}
          />
        )}
      </div>
    </div>
  );
}
