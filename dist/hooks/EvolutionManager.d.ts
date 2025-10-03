export interface InstanceData {
    name: string;
    status: "connected" | "disconnected" | "connecting";
    webhook?: string;
    integration: string;
    connectionState?: string;
    contactsCount?: number;
    chatsCount?: number;
    messagesCount?: number;
    ownerJid?: string;
    profileName?: string;
    profilePicUrl?: string;
    deviceInfo?: {
        platform?: string;
        deviceManufacturer?: string;
        deviceModel?: string;
        osVersion?: string;
        waVersion?: string;
    };
}
export interface MessageData {
    id: string;
    from: string;
    to: string;
    content: string;
    type: "text" | "image" | "video" | "audio" | "document";
    timestamp: string;
    fromMe: boolean;
}
export interface ContactData {
    id: string;
    name: string;
    phone: string;
    isOnline: boolean;
    profilePic?: string;
}
export interface ChatData {
    id: string;
    name: string;
    lastMessage?: MessageData;
    unreadCount: number;
}
export interface InstanceSettings {
    rejectCall?: boolean;
    msgCall?: string;
    groupsIgnore?: boolean;
    alwaysOnline?: boolean;
    readMessages?: boolean;
    readStatus?: boolean;
    syncFullHistory?: boolean;
}
export interface WebhookConfig {
    url: string;
    events: string[];
}
export interface ApiResponse<T = any> {
    status: string;
    message?: string;
    data?: T;
}
export interface MediaPayload {
    number: string;
    mediatype: "image" | "video" | "audio" | "document";
    media: string;
    caption?: string;
}
export interface TextMessagePayload {
    number: string;
    text: string;
}
export interface MarkAsReadPayload {
    remoteJid: string;
    fromMe: boolean;
    id: string;
}
export default class EvolutionManager {
    private baseUrl;
    private client;
    constructor(baseUrl: string, apiKey: string);
    /**
     * Get a specific instance by name
     */
    getInstance(instanceName: string): Promise<InstanceData>;
    /**
     * Create a new WhatsApp instance
     */
    createInstance(instanceName: string, integration?: string): Promise<ApiResponse>;
    /**
     * List all instances with additional data
     */
    listInstances(includeStats?: boolean): Promise<InstanceData[]>;
    /**
     * Fetch a single instance by name with full details
     */
    fetchSingleInstance(instanceName: string): Promise<InstanceData | null>;
    /**
     * Connect an instance and get QR code
     */
    connectInstance(instanceName: string): Promise<ApiResponse>;
    /**
     * Get contacts count for an instance
     */
    getContactsCount(instanceName: string): Promise<number>;
    /**
     * Get chats count for an instance
     */
    getChatsCount(instanceName: string): Promise<number>;
    /**
     * Get messages count for an instance (all chats)
     */
    getMessagesCount(instanceName: string): Promise<number>;
    /**
     * Disconnect/logout an instance
     */
    disconnectInstance(instanceName: string): Promise<ApiResponse>;
    /**
     * Delete an instance
     */
    deleteInstance(instanceName: string): Promise<ApiResponse>;
    /**
     * Get instance connection status with device info
     */
    getInstanceStatus(instanceName: string): Promise<ApiResponse>;
    /**
     * Get instance profile information (device info)
     */
    getInstanceProfile(instanceName: string): Promise<ApiResponse>;
    /**
     * Send a text message
     */
    sendMessage(instanceName: string, number: string, message: string): Promise<ApiResponse>;
    /**
     * Send media (image, video, audio, document)
     */
    sendMedia(instanceName: string, number: string, mediaUrl: string, mediaType?: "image" | "video" | "audio" | "document", caption?: string): Promise<ApiResponse>;
    /**
     * Get chat messages
     */
    getChatMessages(instanceName: string, remoteJid: string, limit?: number): Promise<MessageData[]>;
    /**
     * Get all chats
     */
    getChats(instanceName: string): Promise<ChatData[]>;
    /**
     * Get contacts
     */
    getContacts(instanceName: string): Promise<ContactData[]>;
    /**
     * Set instance settings
     */
    setInstanceSettings(instanceName: string, settings: InstanceSettings): Promise<ApiResponse>;
    /**
     * Get instance settings
     */
    getInstanceSettings(instanceName: string): Promise<InstanceSettings>;
    /**
     * Set webhook URL
     */
    setWebhook(instanceName: string, webhookUrl: string, events?: string[]): Promise<ApiResponse>;
    /**
     * Get API status
     */
    getApiStatus(): Promise<ApiResponse>;
    /**
     * Get instance profile
     */
    getProfile(instanceName: string): Promise<ApiResponse>;
    /**
     * Mark message as read
     */
    markAsRead(instanceName: string, remoteJid: string, fromMe: boolean | undefined, id: string): Promise<ApiResponse>;
    get(instanceName: string): Promise<InstanceData>;
    create(instanceName: string, integration?: string): Promise<ApiResponse>;
    list(): Promise<InstanceData[]>;
    connect(instanceName: string): Promise<ApiResponse>;
    disconnect(instanceName: string): Promise<ApiResponse>;
    getQRCode(instanceName: string): Promise<ApiResponse>;
    getStatus(): Promise<ApiResponse>;
}
