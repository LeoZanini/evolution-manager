import { useState, useEffect, useCallback } from "react";
import EvolutionManager, {
  InstanceData,
  MessageData,
  ContactData,
  ChatData,
  ApiResponse,
} from "./EvolutionManager";

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
    [manager]
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
    [manager]
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
    [manager]
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
    [manager]
  );

  const fetchSingleInstance = useCallback(
    async (name: string): Promise<InstanceData | null> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setError(null);
        const result = await manager.fetchSingleInstance(name);
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
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
    [manager]
  );

  const sendMedia = useCallback(
    async (
      instanceName: string,
      number: string,
      mediaUrl: string,
      mediaType: "image" | "video" | "audio" | "document" = "image",
      caption: string = ""
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
    [manager]
  );

  const getChatMessages = useCallback(
    async (
      instanceName: string,
      remoteJid: string,
      limit: number = 50
    ): Promise<MessageData[]> => {
      if (!manager) throw new Error("Manager not initialized");

      try {
        setError(null);
        const result = await manager.getChatMessages(
          instanceName,
          remoteJid,
          limit
        );
        return result;
      } catch (err: any) {
        handleError(err);
        throw err;
      }
    },
    [manager]
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
      }
    },
    [manager]
  );

  // Data fetching methods
  const refreshInstances = useCallback(async (): Promise<void> => {
    if (!manager) return;

    try {
      setLoading(true);
      setError(null);
      const instancesData = await manager.listInstances(true); // Sempre buscar com stats
      setInstances(instancesData);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [manager, handleError]);

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
    [manager]
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
    [manager]
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
    [manager]
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
