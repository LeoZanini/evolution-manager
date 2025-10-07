import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { SkeletonInstanceCard } from "./ui/Skeleton";
import { CreateInstanceModal } from "./CreateInstanceModal";
import { SettingsModal } from "./SettingsModal";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { ThemeSwitch } from "./ui/ThemeSwitch";
import { Plus, Settings, Palette } from "lucide-react";
import clsx from "clsx";
import { InstanceCard } from "./InstanceCard";
import {
  InstanceState,
  useEvolutionManager,
} from "../hooks/useEvolutionManager";
import { useTheme } from "../hooks/useTheme";

interface InstanceControllerProps {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
  showControls?: boolean;
  refreshMethod?: "polling" | "webhook";
  showStatus?: boolean;
  showSettings?: boolean;
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
  hideDeleteButton?: boolean;
  onInstanceCreated?: (name: string) => void;
  onInstanceDeleted?: (name: string) => void;
  onInstanceConnected?: (name: string) => void;
  onInstanceDisconnected?: (name: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const InstanceController: React.FC<InstanceControllerProps> = ({
  baseUrl,
  apiKey,
  instanceName,
  showSettings = true,
  showThemeToggle = false,
  showThemeCustomizer = false,
  hideDeleteButton = true,
  refreshMethod = "polling", // "polling" | "webhook"
  className = "w-full md:w-1/2 flex justify-center items-center p-4 h-screen md:h-auto",
  style,
}) => {
  const {
    instances,
    subscribe,
    getInstanceState,
    getInstanceData,
    connectInstanceWithState,
    createInstanceWithState,
    deleteInstanceWithState,
    disconnectInstanceWithState,
    refreshInstances,
    registerWebhookCallback,
    getInstanceStatus,
  } = useEvolutionManager({ baseUrl, apiKey });

  const { theme, toggleTheme } = useTheme();
  const [instanceState, setInstanceState] = useState<InstanceState>(
    InstanceState.UNKNOWN
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showThemeCustomizerModal, setShowThemeCustomizerModal] =
    useState(false);

  const currentInstance = instances.find(
    (instance) => instance.name === instanceName
  );

  useEffect(() => {
    const unregisterWebhook = registerWebhookCallback(instanceName);

    const initialState = getInstanceState(instanceName);

    if (initialState !== InstanceState.UNKNOWN) {
      setInstanceState(initialState);
    }

    const unsubscribe = subscribe(
      instanceName,
      ({ state }: { state: InstanceState; data?: any }) => {
        if (state === InstanceState.UNKNOWN) {
          return;
        }

        if (state !== instanceState) {
          setInstanceState(state);
        }
      }
    );

    refreshInstances().catch((error) => {
      console.error(`[InstanceController] ❌ Erro no refreshInstances:`, error);
    });

    return () => {
      unsubscribe();
      if (unregisterWebhook) {
        unregisterWebhook();
      }
    };
  }, [
    instanceName,
    subscribe,
    getInstanceState,
    refreshInstances,
    registerWebhookCallback,
  ]);

  // Auto-conecta quando a instância é criada
  useEffect(() => {
    if (instanceState === InstanceState.CREATED) {
      const timeoutId = setTimeout(() => {
        handleConnect();
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [instanceState]);

  // Detecta quando a instância se conecta
  useEffect(() => {
    if (instanceState === InstanceState.CONNECTED) {
      // Instância conectada com sucesso
    }
  }, [instanceState, instanceName]);

  // Polling para verificar status da instância
  useEffect(() => {
    if (
      refreshMethod === "polling" &&
      instanceState === InstanceState.QR_GENERATED
    ) {
      let intervalId: NodeJS.Timeout;

      const checkInstanceStatus = async () => {
        try {
          const response = (await getInstanceStatus(instanceName)) as {
            instance?: { instanceName: string; state: string };
          };
          const status = response.instance?.state;

          switch (status) {
            case "open":
              setInstanceState(InstanceState.CONNECTED);
              clearInterval(intervalId);
              break;
            case "close":
              setInstanceState(InstanceState.DISCONNECTED);
              break;
            case "connecting":
              // Mantém QR_GENERATED - não muda estado
              break;
            default:
              setInstanceState(InstanceState.UNKNOWN);
              break;
          }
        } catch (error) {
          console.error(
            `[InstanceController] ❌ POLLING: Erro na requisição:`,
            error
          );
          setInstanceState(InstanceState.ERROR);
          clearInterval(intervalId);
        }
      };

      // Primeira verificação imediata
      checkInstanceStatus();

      // Inicia polling contínuo
      intervalId = setInterval(() => {
        checkInstanceStatus();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [refreshMethod, instanceName, getInstanceStatus, instanceState]);

  const handleConnect = () => {
    connectInstanceWithState(instanceName).catch(console.error);
  };

  const handleDisconnect = () => {
    disconnectInstanceWithState(instanceName).catch(console.error);
  };

  const handleDelete = () => {
    deleteInstanceWithState(instanceName).catch(console.error);
  };

  const handleCreate = async (newInstanceName: string) => {
    await createInstanceWithState(newInstanceName);
    setShowCreateForm(false);
  };

  const stateComponentMap: Record<InstanceState, React.ReactNode> = {
    [InstanceState.INITIALIZING]: (
      <SkeletonInstanceCard message="Inicializando..." />
    ),
    [InstanceState.CREATING]: (
      <SkeletonInstanceCard message="Criando instância..." />
    ),
    [InstanceState.DISCONNECTING]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "disconnected",
          ...(currentInstance || {}),
        }}
        onConnect={handleConnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.DELETING]: (
      <SkeletonInstanceCard message="Deletando instância..." />
    ),
    [InstanceState.GENERATING_QR]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "connecting",
          isGeneratingQR: true,
          ...(currentInstance || {}),
        }}
        onDisconnect={handleDisconnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.CREATED]: (
      <div className="text-center">
        <p className="mb-4" style={{ color: "var(--theme-success, #10b981)" }}>
          Instância '{instanceName}' criada com sucesso!
        </p>
        <p className="text-sm" style={{ color: "var(--theme-foreground)" }}>
          Conectando automaticamente...
        </p>
      </div>
    ),
    [InstanceState.DELETED]: (
      <div className="text-center">
        <p
          className="mb-4"
          style={{ color: "var(--theme-secondary, #6b7280)" }}
        >
          Instância '{instanceName}' foi deletada.
        </p>
      </div>
    ),
    [InstanceState.CONNECTED]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "connected",
          ...(currentInstance || {}),
        }}
        onDisconnect={handleDisconnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.QR_GENERATED]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "disconnected",
          qrCode: (() => {
            const qrCode =
              getInstanceData(instanceName).data?.qrCode || undefined;
            return qrCode;
          })(), // Pega o QR code diretamente da instância
          ...(currentInstance || {}),
        }}
        onConnect={handleConnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.DISCONNECTED]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "disconnected",
          ...(currentInstance || {}),
        }}
        onConnect={handleConnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.ERROR]: (
      <div className="text-center">
        <p className="mb-4" style={{ color: "var(--theme-danger, #ef4444)" }}>
          Ocorreu um erro com a instância '{instanceName}'.
        </p>
        <Button onClick={handleConnect}>
          <Plus className="mr-2" /> Tentar Novamente
        </Button>
      </div>
    ),
    [InstanceState.UNKNOWN]: (
      <div className="text-center">
        <p className="mb-4" style={{ color: "var(--theme-foreground)" }}>
          Instância '{instanceName}' não encontrada.
        </p>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2" /> Criar Instância
        </Button>
      </div>
    ),
  };

  const renderContent = () => {
    return (
      stateComponentMap[instanceState] ||
      stateComponentMap[InstanceState.UNKNOWN]
    );
  };

  return (
    <div className={clsx("relative", className)} style={style}>
      {(showSettings || showThemeCustomizer || showThemeToggle) && (
        <div className="flex justify-center mb-4">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border"
            style={{
              backgroundColor: "var(--theme-background)",
              borderColor: "var(--theme-border)",
            }}
          >
            {showSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettingsModal(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}
            {showThemeCustomizer && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThemeCustomizerModal(true)}
              >
                <Palette className="w-4 h-4" />
              </Button>
            )}
            {showThemeToggle && (
              <ThemeSwitch
                checked={theme.isDark}
                onCheckedChange={toggleTheme}
              />
            )}
          </div>
        </div>
      )}

      {renderContent()}

      {showCreateForm && (
        <CreateInstanceModal
          isOpen={true}
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          instanceName={instanceName}
          settings={{
            rejectCall: false,
            msgCall: "",
            groupsIgnore: false,
            alwaysOnline: false,
            readMessages: false,
            readStatus: false,
          }}
          onSettingsChange={() => {}}
          onSave={() => {}}
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
