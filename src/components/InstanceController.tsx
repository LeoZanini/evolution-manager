import React, { useState, useEffect } from "react";
import { useEvolutionManager } from "../hooks/useEvolutionManager";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Loading } from "./ui/Loading";
import { Badge } from "./ui/Badge";
import { ConnectionStatus } from "./ConnectionStatus";
import { CreateInstanceModal } from "./CreateInstanceModal";
import { QRCodeModal } from "./QRCodeModal";
import { SettingsModal } from "./SettingsModal";
import { InstanceSettings } from "../types";

interface InstanceControllerProps {
  baseUrl: string;
  apiKey: string;
  instanceId: string;
  showControls?: boolean;
  showStatus?: boolean;
  showSettings?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onInstanceCreated?: (instanceName: string) => void;
  onInstanceDeleted?: (instanceName: string) => void;
  onInstanceConnected?: (instanceName: string) => void;
  className?: string;
  style?: React.CSSProperties;
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

export const InstanceController: React.FC<InstanceControllerProps> = ({
  baseUrl,
  apiKey,
  instanceId,
  showControls = true,
  showStatus = true,
  showSettings = true,
  autoRefresh = true,
  refreshInterval = 10000,
  onInstanceCreated,
  onInstanceDeleted,
  onInstanceConnected,
  className,
  style,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
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
  } = useEvolutionManager({
    baseUrl,
    apiKey,
  });

  // Encontrar a instância específica
  const currentInstance = instances.find(
    (instance) => instance.name === instanceId
  );

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshInstances();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInstances, autoRefresh, refreshInterval]);

  // Refresh inicial
  useEffect(() => {
    refreshInstances();
  }, [instanceId, refreshInstances]);

  const handleCreateInstance = async (instanceName: string) => {
    try {
      await createInstance(instanceName || instanceId, "WHATSAPP-BAILEYS");
      await refreshInstances();
      onInstanceCreated?.(instanceName || instanceId);
    } catch (err) {
      console.error("Erro ao criar instância:", err);
    }
  };

  const handleConnectInstance = async () => {
    if (!instanceId) return;

    try {
      const result = await connectInstance(instanceId);
      const qrCodeResult = result as unknown as QRCodeResponse;
      const qrCode =
        qrCodeResult?.data?.qrcode ||
        qrCodeResult?.data?.base64 ||
        qrCodeResult?.qrcode ||
        qrCodeResult?.base64 ||
        qrCodeResult?.qr;

      if (qrCode) {
        setQRCodeData(qrCode);
        setShowQRCode(true);
        onInstanceConnected?.(instanceId);
      }
    } catch (err) {
      console.error("Erro ao conectar instância:", err);
    }
  };

  const handleDeleteInstance = async () => {
    if (!instanceId) return;

    if (
      window.confirm(
        `Tem certeza que deseja deletar a instância "${instanceId}"?`
      )
    ) {
      try {
        await deleteInstance(instanceId);
        await refreshInstances();
        onInstanceDeleted?.(instanceId);
      } catch (err) {
        console.error("Erro ao deletar instância:", err);
      }
    }
  };

  const handleConfigureInstance = async () => {
    try {
      if (manager && manager.setInstanceSettings && instanceId) {
        await manager.setInstanceSettings(instanceId, instanceSettings);
        setShowSettingsModal(false);
        alert("Configurações salvas com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao configurar instância:", err);
      alert("Erro ao salvar configurações");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Conectado";
      case "connecting":
        return "Conectando";
      case "disconnected":
        return "Desconectado";
      default:
        return "Desconhecido";
    }
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg ${className}`}
        style={style}
      >
        <Loading size="lg" />
      </div>
    );
  }

  // Se a instância não existe, mostrar opção de criar
  if (!currentInstance) {
    return (
      <div className={className} style={style}>
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Instância "{instanceId}" não encontrada
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Esta instância não existe. Deseja criá-la?
          </p>

          <div className="flex gap-2 justify-center">
            <Button variant="primary" onClick={() => setShowCreateForm(true)}>
              ➕ Criar Instância
            </Button>
            <Button variant="ghost" onClick={refreshInstances}>
              🔄 Atualizar
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center">
              <span className="text-danger-600 dark:text-danger-400 text-sm">
                ❌ {error}
              </span>
              <Button variant="ghost" size="sm" onClick={clearError}>
                ✕
              </Button>
            </div>
          )}

          {/* Modal de Criação */}
          <CreateInstanceModal
            isOpen={showCreateForm}
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreateInstance}
            defaultName={instanceId}
          />
        </Card>
      </div>
    );
  }

  // Se a instância existe, mostrar o card de controle
  return (
    <div className={className} style={style}>
      <Card className="p-6">
        {/* Header da Instância */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {currentInstance.name}
            </h3>

            {showStatus && (
              <Badge
                variant={
                  currentInstance.status === "connected"
                    ? "success"
                    : currentInstance.status === "connecting"
                    ? "warning"
                    : "danger"
                }
              >
                {getStatusText(currentInstance.status || "disconnected")}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={refreshInstances}
            disabled={loading}
          >
            🔄
          </Button>
        </div>

        {/* Status de Conexão Detalhado */}
        {showStatus && (
          <div className="mb-4">
            <ConnectionStatus
              status={currentInstance.status || "disconnected"}
              instanceName={currentInstance.name}
              lastUpdate={new Date()}
              onReconnect={handleConnectInstance}
            />
          </div>
        )}

        {/* Controles */}
        {showControls && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleConnectInstance}
              disabled={loading}
            >
              🔗 Conectar
            </Button>

            {showSettings && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowSettingsModal(true)}
                disabled={loading}
              >
                ⚙️ Configurar
              </Button>
            )}

            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteInstance}
              disabled={loading}
            >
              🗑️ Deletar
            </Button>
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex justify-between">
            <span>Integração:</span>
            <span>{currentInstance.integration || "WHATSAPP-BAILEYS"}</span>
          </div>

          <div className="flex justify-between mt-1">
            <span>Última atualização:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center">
            <span className="text-danger-600 dark:text-danger-400 text-sm">
              ❌ {error}
            </span>
            <Button variant="ghost" size="sm" onClick={clearError}>
              ✕
            </Button>
          </div>
        )}
      </Card>

      {/* Modals */}
      {showQRCode && qrCodeData && (
        <QRCodeModal
          isOpen={showQRCode}
          instanceName={instanceId}
          qrCode={qrCodeData}
          onClose={() => {
            setShowQRCode(false);
            setQRCodeData(null);
          }}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          isOpen={showSettingsModal}
          instanceName={instanceId}
          settings={instanceSettings}
          onSettingsChange={setInstanceSettings}
          onSave={handleConfigureInstance}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
};
