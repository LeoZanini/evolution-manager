import { default as EvolutionManager, InstanceData, MessageData, ContactData, ChatData, ApiResponse } from './EvolutionManager';
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
    createInstance: (name: string, integration?: string) => Promise<ApiResponse>;
    deleteInstance: (name: string) => Promise<ApiResponse>;
    connectInstance: (name: string) => Promise<ApiResponse>;
    disconnectInstance: (name: string) => Promise<ApiResponse>;
    getInstanceStatus: (name: string) => Promise<ApiResponse>;
    fetchSingleInstance: (name: string) => Promise<InstanceData | null>;
    sendMessage: (instanceName: string, number: string, message: string) => Promise<ApiResponse>;
    sendMedia: (instanceName: string, number: string, mediaUrl: string, mediaType?: "image" | "video" | "audio" | "document", caption?: string) => Promise<ApiResponse>;
    getChatMessages: (instanceName: string, remoteJid: string, limit?: number) => Promise<MessageData[]>;
    markAsRead: (instanceName: string, remoteJid: string, fromMe: boolean, id: string) => Promise<ApiResponse>;
    refreshInstances: () => Promise<void>;
    refreshContacts: (instanceName: string) => Promise<void>;
    refreshChats: (instanceName: string) => Promise<void>;
    refreshMessages: (instanceName: string, remoteJid: string, limit?: number) => Promise<void>;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}
export declare const useEvolutionManager: (config: EvolutionManagerConfig) => UseEvolutionManagerReturn;
