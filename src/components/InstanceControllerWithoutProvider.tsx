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

interface InstanceControllerWithoutProviderProps {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
  theme?: "light" | "dark" | "system";
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
  onThemeChange?: (theme: "light" | "dark") => void;
  className?: string;
  style?: React.CSSProperties;
}

export const InstanceControllerWithoutProvider: React.FC<
  InstanceControllerWithoutProviderProps
> = ({
  baseUrl,
  apiKey,
  instanceName,
  theme = "light",
  showSettings = true,
  showThemeToggle = false,
  showThemeCustomizer = false,
  hideDeleteButton = true,
  refreshMethod = "polling",
  onThemeChange,
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

  const [instanceState, setInstanceState] = useState<InstanceState>(
    InstanceState.UNKNOWN
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showThemeCustomizerModal, setShowThemeCustomizerModal] =
    useState(false);

  // Aplica tema CSS quando muda
  useEffect(() => {
    const isDark = theme === "dark";
    const root = document.documentElement;

    // Aplica CSS variables baseado no tema
    if (isDark) {
      root.style.setProperty("--theme-background", "#1f2937");
      root.style.setProperty("--theme-foreground", "#f9fafb");
      root.style.setProperty("--theme-primary", "#60a5fa");
      root.style.setProperty("--theme-secondary", "#9ca3af");
      root.style.setProperty("--theme-border", "#374151");
      root.style.setProperty("--theme-surface", "#111827");
      root.style.setProperty("--theme-success", "#34d399");
      root.style.setProperty("--theme-danger", "#f87171");
      root.style.setProperty("--theme-warning", "#fbbf24");
      root.style.setProperty("--theme-text", "#f9fafb");
      root.style.setProperty("--theme-textSecondary", "#9ca3af");
    } else {
      root.style.setProperty("--theme-background", "#ffffff");
      root.style.setProperty("--theme-foreground", "#1f2937");
      root.style.setProperty("--theme-primary", "#3b82f6");
      root.style.setProperty("--theme-secondary", "#6b7280");
      root.style.setProperty("--theme-border", "#e5e7eb");
      root.style.setProperty("--theme-surface", "#f3f4f6");
      root.style.setProperty("--theme-success", "#10b981");
      root.style.setProperty("--theme-danger", "#ef4444");
      root.style.setProperty("--theme-warning", "#f59e0b");
      root.style.setProperty("--theme-text", "#1f2937");
      root.style.setProperty("--theme-textSecondary", "#6b7280");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    onThemeChange?.(newTheme);
  };

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

      checkInstanceStatus();
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
          })(),
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
                checked={theme === "dark"}
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
