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
} from "@/hooks/useEvolutionManager";

interface InstanceControllerProps {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
  showControls?: boolean;
  showStatus?: boolean;
  showSettings?: boolean;
  showThemeToggle?: boolean;
  showThemeCustomizer?: boolean;
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
  className = "w-full md:w-1/2 flex justify-center items-center p-4 h-screen md:h-auto",
  style,
}) => {
  const {
    subscribe,
    getInstanceState,
    connectInstanceWithState,
    createInstance,
    deleteInstanceWithState,
    disconnectInstanceWithState,
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

  useEffect(() => {
    const initialState = getInstanceState(instanceName);
    setInstanceState(initialState);

    const unsubscribe = subscribe(
      instanceName,
      ({ state, data }: { state: InstanceState; data?: any }) => {
        setInstanceState(state);
        if (state === InstanceState.QR_GENERATED && data?.qrCode) {
          setQrCode(data.qrCode);
          setQrCodeModalOpen(true);
        } else {
          setQrCodeModalOpen(false);
        }
      }
    );

    if (initialState === InstanceState.UNKNOWN) {
      connectInstanceWithState(instanceName).catch(console.error);
    }

    return () => {
      unsubscribe();
    };
  }, [instanceName, subscribe, getInstanceState, connectInstanceWithState]);

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
      <SkeletonInstanceCard message="Conectando..." />
    ),
    [InstanceState.DISCONNECTING]: (
      <SkeletonInstanceCard message="Desconectando..." />
    ),
    [InstanceState.DELETING]: (
      <SkeletonInstanceCard message="Deletando instância..." />
    ),
    [InstanceState.GENERATING_QR]: (
      <SkeletonInstanceCard message="Gerando QR Code..." />
    ),
    [InstanceState.CREATED]: (
      <div className="text-center">
        <p className="mb-4 text-green-500">
          Instância '{instanceName}' criada com sucesso!
        </p>
        <Button onClick={handleConnect}>
          <Plus className="mr-2" /> Conectar
        </Button>
      </div>
    ),
    [InstanceState.DELETED]: (
      <div className="text-center">
        <p className="mb-4 text-gray-500">
          Instância '{instanceName}' foi deletada.
        </p>
      </div>
    ),
    [InstanceState.CONNECTED]: (
      <InstanceCard
        instance={{
          name: instanceName,
          status: "connected",
        }}
        onDisconnect={handleDisconnect}
        onDelete={handleDelete}
        onSettings={() => setShowSettingsModal(true)}
      />
    ),
    [InstanceState.QR_GENERATED]: (
      <>
        <InstanceCard
          instance={{
            name: instanceName,
            status: "disconnected",
            qrCode: qrCode || undefined,
          }}
          onConnect={handleConnect}
          onDelete={handleDelete}
          onSettings={() => setShowSettingsModal(true)}
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
      <div className="text-center">
        <p className="mb-4">Instância '{instanceName}' desconectada.</p>
        <Button onClick={handleConnect}>
          <Plus className="mr-2" /> Conectar Novamente
        </Button>
      </div>
    ),
    [InstanceState.ERROR]: (
      <div className="text-center">
        <p className="mb-4 text-red-500">
          Ocorreu um erro com a instância '{instanceName}'.
        </p>
        <Button onClick={handleConnect}>
          <Plus className="mr-2" /> Tentar Novamente
        </Button>
      </div>
    ),
    [InstanceState.UNKNOWN]: (
      <div className="text-center">
        <p className="mb-4">Instância '{instanceName}' não encontrada.</p>
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
      {renderContent()}

      {showCreateForm && (
        <CreateInstanceModal
          isOpen={true}
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {showSettings && (
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettingsModal(true)}
          >
            <Settings />
          </Button>
          {showThemeCustomizer && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeCustomizerModal(true)}
            >
              <Palette />
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
