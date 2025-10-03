import React, { useState, useCallback, useEffect, useRef } from "react";
import { useEvolutionManager } from "../hooks/useEvolutionManager";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Loading } from "./ui/Loading";
import { SkeletonInstanceCard } from "./ui/Skeleton";
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
import { InstanceData, InstanceSettings } from "../types";

interface InstanceControllerProps {
  baseUrl: string;
  apiKey: string;
  instanceName: string; // 🎯 Mudou de instanceName para instanceName
  showControls?: boolean;
  showStatus?: boolean;
  showSettings?: boolean;
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
  onInstanceCreated?: (instanceName: string) => void;
  onInstanceDeleted?: (instanceName: string) => void;
  onInstanceConnected?: (instanceName: string) => void;
  onInstanceDisconnected?: (instanceName: string) => void; // 🎯 Nova callback
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
  instanceName, // 🎯 Mudou de instanceName para instanceName
  showSettings = true,
  showThemeToggle = false,
  showThemeCustomizer = false,
  onInstanceCreated,
  onInstanceDeleted,
  onInstanceConnected,
  onInstanceDisconnected, // 🎯 Nova callback
  className = "w-full md:w-1/2 flex justify-center items-center p-4 h-screen md:h-auto", // 🎯 Layout responsivo
  style,
}) => {
  // 🎯 Estado da instância específica
  const [currentInstance, setCurrentInstance] = useState<InstanceData | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastStatus, setLastStatus] = useState<string | null>(null);
  const statusPollingRef = useRef<NodeJS.Timeout | null>(null);
  const instanceCacheRef = useRef<string | null>(null);
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

  // 🎯 Estados para controle de polling, cache e animações
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pollingTrigger, setPollingTrigger] = useState<
    "idle" | "creating" | "connecting" | "manual"
  >("idle");
  const [isPollingActive, setIsPollingActive] = useState(false); // 🎯 Para indicador visual futuro
  const [instanceCache, setInstanceCache] = useState<string | null>(null);

  // 🎯 Hook com métodos otimizados
  const {
    manager,
    instances,
    loading,
    error,
    createInstance,
    deleteInstance,
    connectInstance,
    disconnectInstance,
    refreshInstances,
    fetchSingleInstance, // 🎯 Novo método para buscar apenas 1 instância
    getInstanceStatus, // 🎯 Para polling contínuo
    clearError,
  } = useEvolutionManager({
    baseUrl,
    apiKey,
  });

  const { toggleTheme } = useTheme();

  // 🎯 Carregamento inicial da instância
  useEffect(() => {
    if (!instanceName || !manager) return;

    const loadInitialData = async () => {
      try {
        setIsTransitioning(true);
        const instance = await fetchSingleInstance(instanceName);
        if (instance) {
          setCurrentInstance(instance);
          instanceCacheRef.current = JSON.stringify(instance);
          setLastStatus(instance.status || instance.connectionState);
        }
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      } finally {
        setIsTransitioning(false);
      }
    };

    loadInitialData();
  }, [instanceName, manager, fetchSingleInstance]);

  // 🎯 Polling otimizado de status (100ms)
  const startStatusPolling = useCallback(() => {
    if (statusPollingRef.current || !instanceName) return;

    console.log("🟢 Iniciando polling de status rápido...");
    statusPollingRef.current = setInterval(async () => {
      try {
        const status = await getInstanceStatus(instanceName);
        const newStatus =
          status?.data?.state || status?.data?.status || status?.data;

        if (newStatus && newStatus !== lastStatus) {
          console.log(`📱 Status mudou: ${lastStatus} → ${newStatus}`);
          setLastStatus(newStatus);

          // Status mudou - buscar instância completa
          setIsTransitioning(true);
          const fullInstance = await fetchSingleInstance(instanceName);

          if (fullInstance) {
            const newInstanceJson = JSON.stringify(fullInstance);
            if (instanceCacheRef.current !== newInstanceJson) {
              console.log("🔄 Instância atualizada via polling");
              setCurrentInstance(fullInstance);
              instanceCacheRef.current = newInstanceJson;
            }
          }

          setIsTransitioning(false);

          // Parar polling se conectado
          if (newStatus === "open" || newStatus === "connected") {
            stopStatusPolling();
          }
        }
      } catch (error) {
        console.error("Erro no polling de status:", error);
      }
    }, 100); // 100ms para responsividade
  }, [instanceName, getInstanceStatus, fetchSingleInstance, lastStatus]);

  const stopStatusPolling = useCallback(() => {
    if (statusPollingRef.current) {
      console.log("🔴 Parando polling de status");
      clearInterval(statusPollingRef.current);
      statusPollingRef.current = null;
    }
  }, []);

  // 🎯 Cleanup do polling ao desmontar
  useEffect(() => {
    return () => {
      stopStatusPolling();
    };
  }, [stopStatusPolling]);

  // 🎯 Buscar dados da instância específica com delay para UX e cache
  const loadInstanceData = useCallback(
    async (isManualRefresh = false) => {
      if (!instanceName) return;

      if (isManualRefresh) {
        setIsRefreshing(true);
      }

      try {
        const [instanceData] = await Promise.all([
          fetchSingleInstance(instanceName),
          new Promise((resolve) =>
            setTimeout(resolve, isManualRefresh ? 600 : 300)
          ),
        ]);

        // 🎯 Cache: só atualizar se os dados realmente mudaram
        const newInstanceJson = JSON.stringify(instanceData);
        if (instanceCache !== newInstanceJson) {
          console.log("🔄 Dados da instância mudaram, atualizando...");
          setCurrentInstance(instanceData);
          setInstanceCache(newInstanceJson);
        } else {
          console.log("📋 Dados iguais no cache, pulando re-render");
        }

        clearError();
      } catch (error: any) {
        console.error("Erro ao carregar dados da instância:", error);

        if (error?.response?.status === 404 || error?.status === 404) {
          setCurrentInstance(null);
          setInstanceCache(null);
          clearError();
        }

        await new Promise((resolve) =>
          setTimeout(resolve, isManualRefresh ? 600 : 300)
        );
      } finally {
        if (isManualRefresh) {
          setIsRefreshing(false);
        }
      }
    },
    [instanceName, fetchSingleInstance, clearError, instanceCache]
  );

  // 🎯 Polling inteligente com triggers e cache
  useEffect(() => {
    if (!instanceName) return;

    loadInstanceData();

    let interval: NodeJS.Timeout | null = null;

    const startPolling = () => {
      if (interval) return;

      console.log("🟢 Iniciando polling...", { trigger: pollingTrigger });
      setIsPollingActive(true);

      interval = setInterval(async () => {
        try {
          const instanceData = await fetchSingleInstance(instanceName);

          const newInstanceJson = JSON.stringify(instanceData);
          if (instanceCache !== newInstanceJson) {
            console.log("🔄 [Polling] Dados mudaram, atualizando...");
            setCurrentInstance(instanceData);
            setInstanceCache(newInstanceJson);
            clearError();
          }

          const status = await getInstanceStatus(instanceName);
          if (status?.status === "open" && instanceData) {
            console.log("✅ Instância conectada, parando polling");
            stopPolling();
            setPollingTrigger("idle");
          }
        } catch (error: any) {
          if (error?.response?.status === 404 || error?.status === 404) {
            setCurrentInstance(null);
            setInstanceCache(null);
            clearError();
            stopPolling();
            setPollingTrigger("idle");
          } else {
            console.error("Erro no polling da instância:", error);
          }
        }
      }, 2000);
    };

    const stopPolling = () => {
      if (interval) {
        console.log("🔴 Parando polling...");
        clearInterval(interval);
        interval = null;
        setIsPollingActive(false);
      }
    };

    if (
      pollingTrigger === "creating" ||
      pollingTrigger === "connecting" ||
      pollingTrigger === "manual"
    ) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [
    instanceName,
    loadInstanceData,
    fetchSingleInstance,
    getInstanceStatus,
    pollingTrigger,
    instanceCache,
    clearError,
  ]);

  // 🎯 Função de refresh com cache para evitar re-renders desnecessários
  const refreshWithCache = useCallback(async () => {
    const oldInstanceJson = instanceCache;
    await refreshInstances();

    // Só após o refresh, verificar se mudou
    const currentInstanceData = instances.find(
      (instance) => instance.name === instanceName
    );

    const newInstanceJson = JSON.stringify(currentInstanceData);

    if (oldInstanceJson !== newInstanceJson) {
      console.log("🔄 Dados da instância mudaram após refresh");
      setInstanceCache(newInstanceJson);
    } else {
      console.log("📋 Dados iguais no cache após refresh");
    }
  }, [refreshInstances, instances, instanceName, instanceCache]);

  const handleCreateInstance = async (instanceName: string) => {
    if (!manager) {
      console.error("Manager não inicializado ainda. Aguarde...");
      return;
    }

    try {
      setPollingTrigger("creating");

      await Promise.all([
        createInstance(instanceName, "WHATSAPP-BAILEYS"),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);

      await loadInstanceData();
      onInstanceCreated?.(instanceName);
      setShowCreateForm(false);

      setTimeout(() => setPollingTrigger("idle"), 3000);
    } catch (err) {
      console.error("Erro ao criar instância:", err);
      setPollingTrigger("idle");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const handleConnectInstance = async () => {
    if (!instanceName) return;

    try {
      console.log("Iniciando conexão para instância:", instanceName);
      setIsGeneratingQR(true);
      setQRCodeData(null);
      setQrError(null);

      // 🎯 Trigger: Iniciar polling após conectar
      startStatusPolling();

      const result = await connectInstance(instanceName);
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
        onInstanceConnected?.(instanceName);

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

  const handleDisconnectInstance = async () => {
    if (!instanceName) return;

    try {
      console.log("Desconectando instância:", instanceName);
      await disconnectInstance(instanceName);
      await loadInstanceData();
      onInstanceDisconnected?.(instanceName);
      setQRCodeData(null);
      setQrError(null);
    } catch (err) {
      console.error("Erro ao desconectar instância:", err);
    }
  };

  const handleDeleteInstance = async () => {
    if (!instanceName) return;

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

  const handleConfigureInstance = async () => {
    try {
      if (manager && manager.setInstanceSettings && instanceName) {
        await manager.setInstanceSettings(instanceName, instanceSettings);
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
      <div className={className} style={style}>
        <Card className="relative">
          <SkeletonInstanceCard />
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-lg">
            <div className="text-center">
              <Loading size="lg" />
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {!manager
                  ? "Inicializando Evolution Manager..."
                  : "Carregando instância..."}
              </p>
              <div className="mt-2 text-xs text-gray-400">
                BaseURL: {baseUrl} | API Key: {apiKey ? "✓" : "✗"}
                {error && <div className="text-red-400 mt-1">⚠️ {error}</div>}
              </div>
            </div>
          </div>
        </Card>
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
            Instância "{instanceName}" não encontrada
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
              onClick={async () => {
                setIsRefreshing(true);
                await new Promise((resolve) => setTimeout(resolve, 800)); // Simular delay
                await refreshWithCache(); // 🎯 Usar refresh com cache
                setIsRefreshing(false);
              }}
              disabled={!manager || isRefreshing}
              className={clsx(
                "flex items-center gap-2 transition-all duration-300",
                isRefreshing && "animate-pulse"
              )}
            >
              <RefreshCw
                className={clsx("w-4 h-4", isRefreshing && "animate-spin")}
              />
              {isRefreshing ? "Atualizando..." : "Atualizar"}
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
            defaultName={instanceName}
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
          "transition-all duration-300 relative",
          statusInfo.bg,
          statusInfo.border,
          statusInfo.expandCard ? "min-h-[400px]" : "",
          isTransitioning && "opacity-75"
        )}
      >
        {/* Skeleton overlay durante transições */}
        {isTransitioning && (
          <div className="absolute inset-0 z-10 bg-white/60 dark:bg-gray-900/60 rounded-lg">
            <SkeletonInstanceCard />
          </div>
        )}

        {/* Header com nome e status */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center space-x-3">
            <div className={clsx("w-3 h-3 rounded-full", statusInfo.badge)} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {currentInstance.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Indicador de polling ativo */}
            {isPollingActive && (
              <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Polling</span>
              </div>
            )}

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
              onClick={async () => {
                setIsRefreshing(true);
                await new Promise((resolve) => setTimeout(resolve, 600));
                await refreshWithCache(); // 🎯 Usar refresh com cache
                setIsRefreshing(false);
              }}
              size="sm"
              variant="ghost"
              className={clsx(
                "flex items-center justify-center transition-all duration-300",
                isRefreshing && "animate-pulse"
              )}
              disabled={
                loading || isGeneratingQR || isConnecting || isRefreshing
              }
            >
              <RefreshCw
                className={clsx("w-4 h-4", isRefreshing && "animate-spin")}
              />
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
            <>
              {/* Profile Section */}
              {currentInstance.profileName && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                  <div className="flex items-center space-x-3">
                    {currentInstance.profilePicUrl ? (
                      <img
                        src={currentInstance.profilePicUrl}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-green-400"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">
                        {currentInstance.profileName}
                      </h4>
                      {currentInstance.ownerJid && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {currentInstance.ownerJid.replace(
                            "@s.whatsapp.net",
                            ""
                          )}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600 dark:text-green-400">
                        📱 WhatsApp Conectado
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
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
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Chats
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {currentInstance.chatsCount || 0}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Mensagens
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {currentInstance.messagesCount || 0}
                  </p>
                </div>
              </div>

              {/* Device Info */}
              {currentInstance.deviceInfo && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    📱 Informações do Dispositivo
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    {currentInstance.deviceInfo.platform && (
                      <div>
                        <span className="font-medium">Plataforma:</span>{" "}
                        {currentInstance.deviceInfo.platform}
                      </div>
                    )}
                    {currentInstance.deviceInfo.deviceModel && (
                      <div>
                        <span className="font-medium">Modelo:</span>{" "}
                        {currentInstance.deviceInfo.deviceModel}
                      </div>
                    )}
                    {currentInstance.deviceInfo.waVersion && (
                      <div>
                        <span className="font-medium">WhatsApp:</span>{" "}
                        {currentInstance.deviceInfo.waVersion}
                      </div>
                    )}
                    {currentInstance.deviceInfo.osVersion && (
                      <div>
                        <span className="font-medium">SO:</span>{" "}
                        {currentInstance.deviceInfo.osVersion}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Fallback for basic stats */}
          {statusInfo.showStats && !currentInstance.profileName && (
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
                onClick={handleDisconnectInstance}
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
          instanceName={instanceName}
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
