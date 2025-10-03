import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { SkeletonInstanceCard } from "./ui/Skeleton";
import { CreateInstanceModal } from "./CreateInstanceModal";
import { SettingsModal } from "./SettingsModal";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { ThemeSwitch } from "./ui/ThemeSwitch";
import { Plus, Settings, Palette } from "lucide-react";
import clsx from "clsx";
import { QRCodeModal } from "./QRCodeModal";
import { InstanceCard } from "./InstanceCard"; // Importar o InstanceCard
import {
  InstanceState,
  useEvolutionManager,
} from "../hooks/useEvolutionManager";

interface InstanceControllerProps {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
  showControls?: boolean;
  showStatus?: boolean;
  showSettings?: boolean;
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
  hideDeleteButton?: boolean; // ✅ Nova prop
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
  hideDeleteButton = true, // ✅ Default = true (escondido)
  className = "w-full md:w-1/2 flex justify-center items-center p-4 h-screen md:h-auto",
  style,
}) => {
  const {
    instances, // ✅ Adicionando instances
    subscribe,
    getInstanceState,
    connectInstanceWithState,
    createInstance,
    deleteInstanceWithState,
    disconnectInstanceWithState,
    refreshInstances,
  } = useEvolutionManager({ baseUrl, apiKey });

  const [instanceState, setInstanceState] = useState<InstanceState>(
    InstanceState.UNKNOWN
  );
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isQrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showThemeCustomizerModal, setShowThemeCustomizerModal] =
    useState(false);

  // ✅ Pegar dados reais da instância da API
  const currentInstance = instances.find(
    (instance) => instance.name === instanceName
  );

  useEffect(() => {
    console.log(
      `[InstanceController] 🔄 Inicializando para instância: ${instanceName}`
    );

    // Hydrate the initial state, but don't trigger any actions yet.
    const initialState = getInstanceState(instanceName);
    console.log(
      `[InstanceController] 📊 Estado inicial obtido: ${initialState}`
    );

    if (initialState !== InstanceState.UNKNOWN) {
      console.log(
        `[InstanceController] ✅ Definindo estado inicial: ${initialState}`
      );
      setInstanceState(initialState);
    }

    const unsubscribe = subscribe(
      instanceName,
      ({ state, data }: { state: InstanceState; data?: any }) => {
        console.log(`[InstanceController] 📢 Recebida atualização de estado:`, {
          instanceName,
          newState: state,
          data,
          previousState: instanceState,
        });

        if (state === InstanceState.UNKNOWN) {
          console.log(`[InstanceController] ⚠️ Ignorando estado UNKNOWN`);
          return;
        }

        console.log(
          `[InstanceController] 🔄 Atualizando estado de ${instanceState} para ${state}`
        );
        setInstanceState(state);

        if (state === InstanceState.QR_GENERATED && data?.qrCode) {
          console.log(
            `[InstanceController] 📱 QR Code recebido, abrindo modal`
          );
          setQrCode(data.qrCode);
          setQrCodeModalOpen(true);
        } else {
          setQrCodeModalOpen(false);
        }
      }
    );

    // Initial load to get the real status from the API
    console.log(`[InstanceController] 🚀 Executando refreshInstances inicial`);
    refreshInstances().catch((error) => {
      console.error(`[InstanceController] ❌ Erro no refreshInstances:`, error);
    });

    return () => {
      console.log(
        `[InstanceController] 🧹 Limpando subscription para ${instanceName}`
      );
      unsubscribe();
    };
  }, [instanceName, subscribe, getInstanceState, refreshInstances]);

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
    await createInstance(newInstanceName);
    setShowCreateForm(false);
  };

  const stateComponentMap: Record<InstanceState, React.ReactNode> = {
    [InstanceState.INITIALIZING]: (
      <SkeletonInstanceCard message="Inicializando..." />
    ),
    [InstanceState.CREATING]: (
      <SkeletonInstanceCard message="Criando instância..." />
    ),
    [InstanceState.CONNECTING]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "connecting",
          ...(currentInstance || {}), // ✅ Incluir dados reais da API
        }}
        onDisconnect={handleDisconnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.DISCONNECTING]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "disconnected",
          ...(currentInstance || {}), // ✅ Incluir dados reais da API
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
          isGeneratingQR: true, // ✅ Flag para mostrar animação QR
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
        <Button onClick={handleConnect}>
          <Plus className="mr-2" /> Conectar
        </Button>
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
          ...(currentInstance || {}), // ✅ Incluir dados reais da API
        }}
        onDisconnect={handleDisconnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
        hideDeleteButton={hideDeleteButton}
      />
    ),
    [InstanceState.QR_GENERATED]: (
      <>
        <InstanceCard
          instance={{
            name: instanceName,
            status: "disconnected",
            qrCode: qrCode || undefined,
            ...(currentInstance || {}), // ✅ Incluir dados reais da API
          }}
          onConnect={handleConnect}
          onDelete={handleDelete}
          onSettings={() => setShowSettingsModal(true)}
          hideDeleteButton={hideDeleteButton}
        />
        {qrCode && (
          <QRCodeModal
            isOpen={isQrCodeModalOpen}
            onClose={() => setQrCodeModalOpen(false)}
            qrCode={qrCode}
            instanceName={instanceName}
          />
        )}
      </>
    ),
    [InstanceState.DISCONNECTED]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "disconnected",
          ...(currentInstance || {}), // ✅ Incluir dados reais da API
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
      {/* ✅ Barra de configurações no topo como card pequeno */}
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
                checked={false}
                onCheckedChange={() => {
                  /* no-op for now */
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
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
          onSettingsChange={(s) => console.log("Settings change", s)}
          onSave={() => console.log("Save settings")}
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
