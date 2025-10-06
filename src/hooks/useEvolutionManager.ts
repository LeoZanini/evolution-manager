import { useState, useEffect, useCallback, useRef } from "react";
import EvolutionManager, {
  InstanceData,
  MessageData,
  ContactData,
  ChatData,
  ApiResponse,
} from "./EvolutionManager";

export enum InstanceState {
  INITIALIZING = "INITIALIZING", // Estado inicial antes de qualquer ação
  CREATING = "CREATING", // A criação da instância foi solicitada
  CREATED = "CREATED", // A instância foi criada, mas está desconectada
  GENERATING_QR = "GENERATING_QR", // Gerando o QR code
  QR_GENERATED = "QR_GENERATED", // QR code gerado e pronto para ser escaneado
  CONNECTED = "CONNECTED", // A instância está conectada e operacional
  DISCONNECTING = "DISCONNECTING", // A desconexão foi solicitada
  DISCONNECTED = "DISCONNECTED", // A instância está desconectada
  DELETING = "DELETING", // A exclusão da instância foi solicitada
  DELETED = "DELETED", // A instância foi excluída
  ERROR = "ERROR", // Ocorreu um erro em alguma operação
  UNKNOWN = "UNKNOWN", // Estado desconhecido ou não foi possível determinar
}

export interface EvolutionManagerConfig {
  baseUrl: string;
  apiKey: string;
}

export interface UseEvolutionManagerReturn {
  manager: EvolutionManager | null;
  instances: InstanceData[];
  messages: MessageData[];
  contacts: ContactData[];
  chats: ChatData[];
  loading: boolean;
  error: string | null;
  // Instance methods
  createInstance: (name: string, integration?: string) => Promise<ApiResponse>;
  deleteInstance: (name: string) => Promise<ApiResponse>;
  connectInstance: (name: string) => Promise<ApiResponse>;
  disconnectInstance: (name: string) => Promise<ApiResponse>;
  getInstanceStatus: (name: string) => Promise<ApiResponse>;
  fetchSingleInstance: (name: string) => Promise<InstanceData | null>;
  // State Management
  getInstanceData: (instanceName: string) => {
    state: InstanceState;
    data?: any;
  };
  getInstanceState: (instanceName: string) => InstanceState;
  subscribe: (
    instanceName: string,
    callback: (payload: { state: InstanceState; data?: any }) => void
  ) => () => void;
  // Instance methods with state
  createInstanceWithState: (
    name: string,
    integration?: string
  ) => Promise<void>;
  connectInstanceWithState: (name: string) => Promise<void>;
  disconnectInstanceWithState: (name: string) => Promise<void>;
  deleteInstanceWithState: (name: string) => Promise<void>;
  // Message methods
  sendMessage: (
    instanceName: string,
    number: string,
    message: string
  ) => Promise<ApiResponse>;
  sendMedia: (
    instanceName: string,
    number: string,
    mediaUrl: string,
    mediaType?: "image" | "video" | "audio" | "document",
    caption?: string
  ) => Promise<ApiResponse>;
  getChatMessages: (
    instanceName: string,
    remoteJid: string,
    limit?: number
  ) => Promise<MessageData[]>;
  markAsRead: (
    instanceName: string,
    remoteJid: string,
    fromMe: boolean,
    id: string
  ) => Promise<ApiResponse>;
  // Data fetching methods
  refreshInstances: () => Promise<void>;
  refreshContacts: (instanceName: string) => Promise<void>;
  refreshChats: (instanceName: string) => Promise<void>;
  refreshMessages: (
    instanceName: string,
    remoteJid: string,
    limit?: number
  ) => Promise<void>;
  // Utility methods
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useEvolutionManager = (
  config: EvolutionManagerConfig
): UseEvolutionManagerReturn => {
  const [manager, setManager] = useState<EvolutionManager | null>(null);
  const [instances, setInstances] = useState<InstanceData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [chats, setChats] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Centralized state management
  const instanceStates = useRef<Map<string, InstanceState>>(new Map());
  const instanceData = useRef<Map<string, { qrCode?: string }>>(new Map()); // Store additional data like QR codes
  const subscribers = useRef<
    Map<string, ((payload: { state: InstanceState; data?: any }) => void)[]>
  >(new Map());

  const notifySubscribers = (
    instanceName: string,
    state: InstanceState,
    data?: any
  ) => {
    const instanceSubscribers = subscribers.current.get(instanceName);
    if (instanceSubscribers) {
      instanceSubscribers.forEach((callback) => {
        callback({ state, data });
      });
    }
  };

  const getInstanceData = useCallback(
    (instanceName: string): { state: InstanceState; data?: any } => {
      const state =
        instanceStates.current.get(instanceName) || InstanceState.UNKNOWN;
      const data = instanceData.current.get(instanceName);
      return { state, data };
    },
    []
  );

  const setInstanceState = useCallback(
    (instanceName: string, state: InstanceState, data?: any) => {
      instanceStates.current.set(instanceName, state);
      if (data) {
        const currentData = instanceData.current.get(instanceName) || {};
        instanceData.current.set(instanceName, { ...currentData, ...data });
      }

      notifySubscribers(instanceName, state, data);
    },
    []
  );

  const getInstanceState = useCallback(
    (instanceName: string): InstanceState => {
      return instanceStates.current.get(instanceName) || InstanceState.UNKNOWN;
    },
    []
  );

  const subscribe = useCallback(
    (
      instanceName: string,
      callback: (payload: { state: InstanceState; data?: any }) => void
    ) => {
      const instanceSubscribers = subscribers.current.get(instanceName) || [];
      instanceSubscribers.push(callback);
      subscribers.current.set(instanceName, instanceSubscribers);
      // Retorna uma função de unsubscribe
      return () => {
        const currentSubscribers = subscribers.current.get(instanceName) || [];
        const newSubscribers = currentSubscribers.filter(
          (cb) => cb !== callback
        );
        subscribers.current.set(instanceName, newSubscribers);
      };
    },
    []
  );

  // Polling logic

  // Initialize manager
  useEffect(() => {
    if (config.baseUrl && config.apiKey) {
      try {
        const evolutionManager = new EvolutionManager(
          config.baseUrl,
          config.apiKey
        );
        setManager(evolutionManager);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
    }
  }, [config.baseUrl, config.apiKey]);

  // Error handling helper
  const handleError = useCallback((err: any) => {
    setError(err.message || "An error occurred");
    setLoading(false);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Data fetching methods
  const refreshInstances = useCallback(async (): Promise<void> => {
    if (!manager) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const instancesData = await manager.listInstances();
      setInstances(instancesData);
      instancesData.forEach((instance: InstanceData) => {
        const currentState = getInstanceState(instance.name);
        const apiState = (instance as any).connectionStatus || instance.status;
        let targetState: InstanceState;

        if (apiState === "open" || apiState === "connected") {
          targetState = InstanceState.CONNECTED;
        } else if (apiState === "close" || apiState === "disconnected") {
          targetState =
            currentState === InstanceState.CREATING ||
            currentState === InstanceState.CREATED
              ? InstanceState.CREATED
              : InstanceState.DISCONNECTED;
        } else if (apiState === "connecting") {
          targetState = InstanceState.QR_GENERATED;
        } else {
          targetState = InstanceState.UNKNOWN;
        }
        // Only update if the state is different and not in a transient state
        const transientStates = [
          InstanceState.DISCONNECTING,
          InstanceState.DELETING,
          InstanceState.GENERATING_QR,
        ];

        const shouldUpdate =
          currentState !== targetState &&
          !transientStates.includes(currentState);

        if (shouldUpdate) {
          setInstanceState(instance.name, targetState);
        }
      });
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [manager, handleError, getInstanceState, setInstanceState]);

  const createInstanceWithState = useCallback(
    async (name: string, integration?: string) => {
      if (!manager) throw new Error("Manager not initialized");
      setInstanceState(name, InstanceState.CREATING);
      try {
        await manager.createInstance(name, integration);
        setInstanceState(name, InstanceState.CREATED);
        await refreshInstances();
      } catch (err: any) {
        setInstanceState(name, InstanceState.ERROR);
        handleError(err);
      }
    },
    [manager, setInstanceState, handleError, refreshInstances]
  );

  const connectInstanceWithState = useCallback(
    async (name: string) => {
      if (!manager) throw new Error("Manager not initialized");
      setInstanceState(name, InstanceState.GENERATING_QR);
      try {
        const response = await manager.connectInstance(name);
        console.log(
          `[useEvolutionManager] 🔍 Resposta da API para ${name}:`,
          response
        );

        // Verifica se tem o base64 ou code para gerar QR
        if ((response as any).base64) {
          const qrCode = (response as any).base64;
          console.log(
            `[useEvolutionManager] ✅ QR Code (base64) encontrado para ${name}:`,
            qrCode.substring(0, 50) + "..."
          );
          setInstanceState(name, InstanceState.QR_GENERATED, { qrCode });
        } else if ((response as any).code) {
          const qrCode = (response as any).code;
          console.log(
            `[useEvolutionManager] ✅ QR Code (text) encontrado para ${name}:`,
            qrCode
          );
          setInstanceState(name, InstanceState.QR_GENERATED, { qrCode });
        } else if (response.data?.code) {
          const qrCode = response.data.code;
          console.log(
            `[useEvolutionManager] ✅ QR Code encontrado para ${name}:`,
            qrCode
          );
          setInstanceState(name, InstanceState.QR_GENERATED, { qrCode });
        } else if (response.data?.qrcode?.base64) {
          // Fallback para o formato antigo
          const qrCode = response.data.qrcode.base64;
          console.log(
            `[useEvolutionManager] ✅ QR Code (formato antigo) encontrado para ${name}:`,
            qrCode
          );
          setInstanceState(name, InstanceState.QR_GENERATED, { qrCode });
        } else {
          // Se não veio QR code, continua gerando ou tenta novamente
          console.warn(
            `[useEvolutionManager] ❌ QR Code não retornado para ${name}, resposta completa:`,
            response
          );
          // Mantém em GENERATING_QR e continua polling
        } // Start polling after connection attempt
      } catch (err: any) {
        setInstanceState(name, InstanceState.ERROR);
        handleError(err);
      }
    },
    [manager, setInstanceState, handleError]
  );

  const disconnectInstanceWithState = useCallback(
    async (name: string) => {
      if (!manager) throw new Error("Manager not initialized");
      setInstanceState(name, InstanceState.DISCONNECTING);
      try {
        await manager.disconnectInstance(name);
        setInstanceState(name, InstanceState.DISCONNECTED);
        await refreshInstances();
      } catch (err: any) {
        setInstanceState(name, InstanceState.ERROR);
        handleError(err);
      }
    },
    [manager, setInstanceState, handleError, refreshInstances]
  );

  const deleteInstanceWithState = useCallback(
    async (name: string) => {
      if (!manager) throw new Error("Manager not initialized");
      setInstanceState(name, InstanceState.DELETING);
      try {
        await manager.deleteInstance(name);
        setInstanceState(name, InstanceState.DELETED);
        instanceStates.current.delete(name);
        instanceData.current.delete(name); // Also clear instance data
        subscribers.current.delete(name);
        await refreshInstances();
      } catch (err: any) {
        setInstanceState(name, InstanceState.ERROR);
        handleError(err);
      }
    },
    [manager, setInstanceState, handleError, refreshInstances]
  );

  // Instance methods
  const createInstance = useCallback(
    async (name: string, integration?: string): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.createInstance(name, integration);
        await refreshInstances();
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, refreshInstances, handleError]
  );

  const deleteInstance = useCallback(
    async (name: string): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.deleteInstance(name);
        await refreshInstances();
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, refreshInstances, handleError]
  );

  const connectInstance = useCallback(
    async (name: string): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.connectInstance(name);
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  const disconnectInstance = useCallback(
    async (name: string): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.disconnectInstance(name);
        await refreshInstances();
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, refreshInstances, handleError]
  );

  const getInstanceStatus = useCallback(
    async (name: string): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setError(null);
        const result = await manager.getInstanceStatus(name);
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      }
    },
    [manager, handleError]
  );
  const fetchSingleInstance = useCallback(
    async (name: string): Promise<InstanceData | null> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setError(null);
        const result = await manager.getInstance(name);
        return result;
      } catch (err: any) {
        handleError(err);
        return null; // Add this line
      }
    },
    [manager, handleError]
  );

  // Message methods
  const sendMessage = useCallback(
    async (
      instanceName: string,
      number: string,
      message: string
    ): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.sendMessage(instanceName, number, message);
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  const sendMedia = useCallback(
    async (
      instanceName: string,
      number: string,
      mediaUrl: string,
      mediaType?: "image" | "video" | "audio" | "document",
      caption?: string
    ): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.sendMedia(
          instanceName,
          number,
          mediaUrl,
          mediaType,
          caption
        );
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  const getChatMessages = useCallback(
    async (
      instanceName: string,
      remoteJid: string,
      limit: number = 50
    ): Promise<MessageData[]> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const messagesData = await manager.getChatMessages(
          instanceName,
          remoteJid,
          limit
        );
        setMessages(messagesData);
        return messagesData;
      } catch (err: any) {
        handleError(err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  const markAsRead = useCallback(
    async (
      instanceName: string,
      remoteJid: string,
      fromMe: boolean,
      id: string
    ): Promise<ApiResponse> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setLoading(true);
        setError(null);
        const result = await manager.markAsRead(
          instanceName,
          remoteJid,
          fromMe,
          id
        );
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  // Data fetching methods

  const refreshContacts = useCallback(
    async (instanceName: string): Promise<void> => {
      if (!manager) return;

      try {
        setLoading(true);
        setError(null);
        const contactsData = await manager.getContacts(instanceName);
        setContacts(contactsData);
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  const refreshChats = useCallback(
    async (instanceName: string): Promise<void> => {
      if (!manager) return;

      try {
        setLoading(true);
        setError(null);
        const chatsData = await manager.getChats(instanceName);
        setChats(chatsData);
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  const refreshMessages = useCallback(
    async (
      instanceName: string,
      remoteJid: string,
      limit: number = 50
    ): Promise<void> => {
      if (!manager) return;

      try {
        setLoading(true);
        setError(null);
        const messagesData = await manager.getChatMessages(
          instanceName,
          remoteJid,
          limit
        );
        setMessages(messagesData);
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [manager, handleError]
  );

  // Auto-refresh instances when manager is ready
  useEffect(() => {
    if (manager) {
      refreshInstances();
    }
  }, [manager, refreshInstances]);

  return {
    manager,
    instances,
    messages,
    contacts,
    chats,
    loading,
    error,
    // Instance methods
    createInstance,
    deleteInstance,
    connectInstance,
    disconnectInstance,
    getInstanceStatus,
    fetchSingleInstance,
    // State Management
    getInstanceData,
    getInstanceState,
    subscribe,
    // Instance methods with state
    createInstanceWithState,
    connectInstanceWithState,
    disconnectInstanceWithState,
    deleteInstanceWithState,
    // Message methods
    sendMessage,
    sendMedia,
    getChatMessages,
    markAsRead,
    // Data fetching methods
    refreshInstances,
    refreshContacts,
    refreshChats,
    refreshMessages,
    // Utility methods
    clearError,
    setLoading,
  };
};
