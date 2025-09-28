import React, { useState, useEffect } from "react";
import { useEvolutionManager } from "../hooks/useEvolutionManager";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Loading } from "./ui/Loading";
import { CreateInstanceModal } from "./CreateInstanceModal";
import { SettingsModal } from "./SettingsModal";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { ThemeSwitch } from "./ui/ThemeSwitch";
import { useTheme } from "../hooks/useTheme";
import {
  Smartphone,
  Plus,
  RefreshCw,
  Link,
  Settings,
  Trash2,
  Users,
  MessageCircle,
  Pause,
  Palette,
} from "lucide-react";
import clsx from "clsx";
import { InstanceSettings } from "../types";

interface InstanceControllerProps {
  baseUrl: string;
  apiKey: string;
  instanceId: string;
  showControls?: boolean;
  showStatus?: boolean;
  showSettings?: boolean;
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
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
  showSettings = true,
  showThemeToggle = false,
  showThemeCustomizer = false,
  onInstanceCreated,
  onInstanceDeleted,
  onInstanceConnected,
  className = "w-1/2 flex justify-center items-center",
  style,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showThemeCustomizerModal, setShowThemeCustomizerModal] =
    useState<boolean>(false);
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

  const { toggleTheme } = useTheme();

  // Encontrar a instância específica
  const currentInstance = instances.find(
    (instance) => instance.name === instanceId
  );

  // Auto refresh removido: só atualiza se usuário clicar no botão refresh

  // Refresh inicial
  useEffect(() => {
    refreshInstances();
  }, [instanceId, refreshInstances]);

  const handleCreateInstance = async (instanceName: string) => {
    if (!manager) {
      console.error("Manager não inicializado ainda. Aguarde...");
      return;
    }

    try {
      await createInstance(instanceName, "WHATSAPP-BAILEYS");
      await refreshInstances();
      onInstanceCreated?.(instanceName);
      setShowCreateForm(false); // Fechar modal após criar
    } catch (err) {
      console.error("Erro ao criar instância:", err);
    }
  };

  const handleConnectInstance = async () => {
    if (!instanceId) return;

    try {
      console.log("Iniciando conexão para instância:", instanceId);
      setIsGeneratingQR(true);
      setQRCodeData(null);
      setQrError(null);

      const result = await connectInstance(instanceId);
      console.log("Resultado da conexão:", result);

      const qrCodeResult = result as unknown as QRCodeResponse;
      const qrCode =
        qrCodeResult?.data?.qrcode ||
        qrCodeResult?.data?.base64 ||
        qrCodeResult?.qrcode ||
        qrCodeResult?.base64 ||
        qrCodeResult?.qr;

      console.log("QR Code extraído:", qrCode ? "Presente" : "Ausente");
      console.log("QR Code valor:", qrCode?.substring(0, 100) + "...");
      setIsGeneratingQR(false);

      if (qrCode) {
        console.log("Definindo QR Code data...");
        setQRCodeData(qrCode);
        setIsConnecting(false); // Não deve estar conectando ainda, apenas mostrando QR
        console.log("Estados atualizados - QR definido, não conectando ainda");
        onInstanceConnected?.(instanceId);

        // QR Code fica aberto até conectar - sem TTL
      } else {
        console.error("QR Code não foi gerado na resposta:", result);
        // Mostrar erro se QR não foi gerado
      }
    } catch (err) {
      console.error("Erro ao conectar instância:", err);
      setIsGeneratingQR(false);
      setIsConnecting(false);
      setQRCodeData(null);
      setQrError(
        err instanceof Error ? err.message : "Erro desconhecido ao conectar"
      );
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

  const getStatusInfo = () => {
    if (qrError) {
      return {
        text: "Erro na Conexão",
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-800",
        badge: "bg-red-500",
        showError: true,
        expandCard: true,
      };
    }

    if (isGeneratingQR) {
      return {
        text: "Gerando QR Code...",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        badge: "bg-blue-500",
        showLoader: true,
        expandCard: true,
      };
    }

    if (qrCodeData && !isConnecting) {
      return {
        text: "QR Code Gerado - Aguardando Conexão",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800",
        badge: "bg-yellow-500",
        showQR: true,
        expandCard: true,
      };
    }

    if (isConnecting) {
      return {
        text: "Conectando...",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        border: "border-orange-200 dark:border-orange-800",
        badge: "bg-orange-500",
        showLoader: true,
        expandCard: true,
      };
    }

    if (currentInstance?.status === "connected") {
      return {
        text: "Conectado",
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800",
        badge: "bg-green-500",
        showStats: true,
        expandCard: false,
      };
    }

    return {
      text: "Desconectado",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      badge: "bg-red-500",
      expandCard: false,
    };
  }; // Debug logs
  console.log("Debug - Manager state:", {
    manager: !!manager,
    loading,
    error,
    baseUrl,
    apiKey: apiKey ? "Presente" : "Ausente",
  });

  if (loading || !manager) {
    return (
      <div
        className={`flex justify-center items-center min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg ${className}`}
        style={style}
      >
        <div className="text-center">
          <Loading size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {!manager ? "Inicializando Evolution Manager..." : "Carregando..."}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            BaseURL: {baseUrl} | API Key: {apiKey ? "Presente" : "Ausente"}
          </div>
          {error && (
            <div className="mt-2 text-red-500 text-sm">Erro: {error}</div>
          )}
        </div>
      </div>
    );
  }

  // Se a instância não existe, mostrar opção de criar
  if (!currentInstance) {
    return (
      <div className={className} style={style}>
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Smartphone className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Instância "{instanceId}" não encontrada
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Esta instância não existe. Deseja criá-la?
          </p>

          <div className="flex gap-2 justify-center">
            <Button
              variant="primary"
              onClick={() => setShowCreateForm(true)}
              disabled={!manager}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {!manager ? "Inicializando..." : "Criar Instância"}
            </Button>
            <Button
              variant="ghost"
              onClick={refreshInstances}
              disabled={!manager}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Atualizar
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
  const statusInfo = getStatusInfo();

  return (
    <div className={className} style={style}>
      {/* Header Flutuante para Temas */}
      {(showThemeToggle || showThemeCustomizer) && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {showThemeToggle && (
            <ThemeSwitch
              checked={document.documentElement.classList.contains("dark")}
              onCheckedChange={toggleTheme}
            />
          )}
          {showThemeCustomizer && (
            <Button
              onClick={() => setShowThemeCustomizerModal(true)}
              size="sm"
              variant="ghost"
              className="flex items-center justify-center"
            >
              <Palette className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      <Card
        className={clsx(
          "transition-all duration-200",
          statusInfo.bg,
          statusInfo.border,
          statusInfo.expandCard ? "min-h-[400px]" : ""
        )}
      >
        {/* Header com nome e status */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center space-x-3">
            <div className={clsx("w-3 h-3 rounded-full", statusInfo.badge)} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {currentInstance.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              {statusInfo.text}
            </span>

            {/* Settings e Refresh no canto superior direito */}
            {showSettings && (
              <Button
                onClick={() => setShowSettingsModal(true)}
                size="sm"
                variant="ghost"
                className="flex items-center justify-center"
                disabled={loading || isGeneratingQR || isConnecting}
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}

            <Button
              onClick={refreshInstances}
              size="sm"
              variant="ghost"
              className="flex items-center justify-center"
              disabled={loading || isGeneratingQR || isConnecting}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-0">
          {/* QR Code Section */}
          {statusInfo.showQR && qrCodeData && (
            <div className="mb-4 flex flex-col items-center space-y-4">
              <div className="bg-white dark:bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <img
                  src={qrCodeData}
                  alt="QR Code para conectar WhatsApp"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs">
                Escaneie com seu WhatsApp
              </p>
            </div>
          )}

          {/* Loading State */}
          {statusInfo.showLoader && (
            <div className="mb-4 flex flex-col items-center space-y-3">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <Loading size="md" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {statusInfo.text}
              </p>
            </div>
          )}

          {/* Error State */}
          {statusInfo.showError && qrError && (
            <div className="mb-4 flex flex-col items-center space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 flex flex-col items-center">
                <div className="text-red-500 text-4xl mb-2">❌</div>
                <p className="text-red-600 dark:text-red-400 text-center font-medium">
                  {qrError}
                </p>
              </div>
              <Button
                onClick={() => {
                  setQrError(null);
                  handleConnectInstance();
                }}
                size="sm"
                variant="secondary"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </Button>
            </div>
          )}

          {/* Stats (when connected) */}
          {statusInfo.showStats && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Contatos
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {currentInstance.contactsCount || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Chats
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {currentInstance.chatsCount || 0}
                </p>
              </div>
            </div>
          )}

          {/* Instance Details */}
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <div>
              <span className="font-medium">Integração:</span>{" "}
              <span className="text-gray-900 dark:text-white">
                {currentInstance.integration || "WHATSAPP-BAILEYS"}
              </span>
            </div>
            {currentInstance.connectionState && (
              <div>
                <span className="font-medium">Estado:</span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {currentInstance.connectionState}
                </span>
              </div>
            )}
            <div>
              <span className="font-medium">Última atualização:</span>{" "}
              <span className="text-gray-900 dark:text-white">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Action Buttons - Delete e Connect/Disconnect juntos */}
          <div className="flex justify-end items-center gap-2">
            <Button
              onClick={handleDeleteInstance}
              size="sm"
              variant="danger"
              className="flex items-center space-x-1"
              disabled={loading || isGeneratingQR || isConnecting}
            >
              <Trash2 className="w-4 h-4" />
              <span>Excluir</span>
            </Button>

            {/* Conectar/Desconectar */}
            {currentInstance.status === "connected" ? (
              <Button
                onClick={() => console.log("Disconnect not implemented yet")}
                size="sm"
                variant="secondary"
                className="flex items-center space-x-1"
                disabled={loading || isGeneratingQR || isConnecting}
              >
                <Pause className="w-4 h-4" />
                <span>Desconectar</span>
              </Button>
            ) : (
              <Button
                onClick={handleConnectInstance}
                size="sm"
                variant="secondary"
                className="flex items-center space-x-1"
                disabled={loading || isGeneratingQR || isConnecting}
              >
                <Link className="w-4 h-4" />
                <span>Conectar</span>
              </Button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex justify-between items-center">
              <span className="text-red-600 dark:text-red-400 text-sm">
                ❌ {error}
              </span>
              <Button variant="ghost" size="sm" onClick={clearError}>
                ✕
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Modals */}
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

      {showThemeCustomizerModal && (
        <ThemeCustomizer
          isOpen={showThemeCustomizerModal}
          onClose={() => setShowThemeCustomizerModal(false)}
        />
      )}
    </div>
  );
};
