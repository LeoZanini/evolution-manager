import axios, { AxiosInstance, AxiosResponse } from "axios";

// Interfaces para os tipos de dados da API
export interface InstanceData {
  name: string;
  status: "connected" | "disconnected" | "connecting";
  webhook?: string;
  integration: string;
  connectionState?: string;
  contactsCount?: number;
  chatsCount?: number;
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
  private baseUrl: string;
  private client: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    if (!baseUrl || !apiKey) {
      throw new Error("baseUrl and apiKey are required");
    }

    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Get a specific instance by name
   */
  async getInstance(instanceName: string): Promise<InstanceData> {
    try {
      const response: AxiosResponse<InstanceData[]> = await this.client.get(
        "/instance/fetchInstances"
      );
      const instances = response.data;
      const instance = instances.find((inst) => inst.name === instanceName);
      if (!instance) {
        throw new Error(`Instance '${instanceName}' not found`);
      }
      return instance;
    } catch (error: any) {
      throw new Error(`Failed to get instance: ${error.message}`);
    }
  }

  /**
   * Create a new WhatsApp instance
   */
  async createInstance(
    instanceName: string,
    integration: string = "WHATSAPP-BAILEYS"
  ): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.post(
        "/instance/create",
        {
          instanceName,
          integration,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create instance: ${error.message}`);
    }
  }

  /**
   * List all instances with additional data
   */
  async listInstances(includeStats: boolean = false): Promise<InstanceData[]> {
    try {
      const response: AxiosResponse<InstanceData[]> = await this.client.get(
        "/instance/fetchInstances"
      );

      const instances = response.data;

      if (includeStats) {
        // Buscar contatos e conversas para cada instância conectada
        const instancesWithStats = await Promise.all(
          instances.map(async (instance) => {
            if (instance.status === "connected") {
              try {
                const [contactsCount, chatsCount] = await Promise.all([
                  this.getContactsCount(instance.name),
                  this.getChatsCount(instance.name),
                ]);
                return {
                  ...instance,
                  contactsCount,
                  chatsCount,
                };
              } catch (error) {
                console.warn(
                  `Failed to get stats for ${instance.name}:`,
                  error
                );
                return instance;
              }
            }
            return instance;
          })
        );
        return instancesWithStats;
      }

      return instances;
    } catch (error: any) {
      throw new Error(`Failed to list instances: ${error.message}`);
    }
  }

  /**
   * Connect an instance and get QR code
   */
  async connectInstance(instanceName: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.get(
        `/instance/connect/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to connect instance: ${error.message}`);
    }
  }

  /**
   * Get contacts count for an instance
   */
  async getContactsCount(instanceName: string): Promise<number> {
    try {
      const response = await this.client.get(
        `/chat/findContacts/${instanceName}`
      );
      return Array.isArray(response.data) ? response.data.length : 0;
    } catch (error: any) {
      console.warn(
        `Failed to get contacts count for ${instanceName}:`,
        error.message
      );
      return 0;
    }
  }

  /**
   * Get chats count for an instance
   */
  async getChatsCount(instanceName: string): Promise<number> {
    try {
      const response = await this.client.get(`/chat/findChats/${instanceName}`);
      return Array.isArray(response.data) ? response.data.length : 0;
    } catch (error: any) {
      console.warn(
        `Failed to get chats count for ${instanceName}:`,
        error.message
      );
      return 0;
    }
  }

  /**
   * Disconnect/logout an instance
   */
  async disconnectInstance(instanceName: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.delete(
        `/instance/logout/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to disconnect instance: ${error.message}`);
    }
  }

  /**
   * Delete an instance
   */
  async deleteInstance(instanceName: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.delete(
        `/instance/delete/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to delete instance: ${error.message}`);
    }
  }

  /**
   * Get instance connection status
   */
  async getInstanceStatus(instanceName: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.get(
        `/instance/connectionState/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get instance status: ${error.message}`);
    }
  }

  /**
   * Send a text message
   */
  async sendMessage(
    instanceName: string,
    number: string,
    message: string
  ): Promise<ApiResponse> {
    try {
      const payload: TextMessagePayload = {
        number,
        text: message,
      };
      const response: AxiosResponse<ApiResponse> = await this.client.post(
        `/message/sendText/${instanceName}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  /**
   * Send media (image, video, audio, document)
   */
  async sendMedia(
    instanceName: string,
    number: string,
    mediaUrl: string,
    mediaType: "image" | "video" | "audio" | "document" = "image",
    caption: string = ""
  ): Promise<ApiResponse> {
    try {
      const endpoint = `/message/sendMedia/${instanceName}`;
      const payload: MediaPayload = {
        number,
        mediatype: mediaType,
        media: mediaUrl,
      };

      if (caption) {
        payload.caption = caption;
      }

      const response: AxiosResponse<ApiResponse> = await this.client.post(
        endpoint,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to send media: ${error.message}`);
    }
  }

  /**
   * Get chat messages
   */
  async getChatMessages(
    instanceName: string,
    remoteJid: string,
    limit: number = 50
  ): Promise<MessageData[]> {
    try {
      const response: AxiosResponse<MessageData[]> = await this.client.get(
        `/chat/findMessages/${instanceName}`,
        {
          params: { remoteJid, limit },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get messages: ${error.message}`);
    }
  }

  /**
   * Get all chats
   */
  async getChats(instanceName: string): Promise<ChatData[]> {
    try {
      const response: AxiosResponse<ChatData[]> = await this.client.get(
        `/chat/findChats/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get chats: ${error.message}`);
    }
  }

  /**
   * Get contacts
   */
  async getContacts(instanceName: string): Promise<ContactData[]> {
    try {
      const response: AxiosResponse<ContactData[]> = await this.client.get(
        `/chat/findContacts/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get contacts: ${error.message}`);
    }
  }

  /**
   * Set instance settings
   */
  async setInstanceSettings(
    instanceName: string,
    settings: InstanceSettings
  ): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.post(
        `/settings/set/${instanceName}`,
        settings
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to set settings: ${error.message}`);
    }
  }

  /**
   * Get instance settings
   */
  async getInstanceSettings(instanceName: string): Promise<InstanceSettings> {
    try {
      const response: AxiosResponse<InstanceSettings> = await this.client.get(
        `/settings/find/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get settings: ${error.message}`);
    }
  }

  /**
   * Set webhook URL
   */
  async setWebhook(
    instanceName: string,
    webhookUrl: string,
    events: string[] = []
  ): Promise<ApiResponse> {
    try {
      const payload: WebhookConfig = {
        url: webhookUrl,
        events,
      };
      const response: AxiosResponse<ApiResponse> = await this.client.post(
        `/webhook/set/${instanceName}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to set webhook: ${error.message}`);
    }
  }

  /**
   * Get API status
   */
  async getApiStatus(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.get("/");
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get API status: ${error.message}`);
    }
  }

  /**
   * Get instance profile
   */
  async getProfile(instanceName: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.get(
        `/chat/fetchProfile/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get profile: ${error.message}`);
    }
  }

  /**
   * Mark message as read
   */
  async markAsRead(
    instanceName: string,
    remoteJid: string,
    fromMe: boolean = false,
    id: string
  ): Promise<ApiResponse> {
    try {
      const payload: MarkAsReadPayload = {
        remoteJid,
        fromMe,
        id,
      };
      const response: AxiosResponse<ApiResponse> = await this.client.post(
        `/chat/markMessageAsRead/${instanceName}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to mark as read: ${error.message}`);
    }
  }

  // Legacy method names for backward compatibility
  async get(instanceName: string): Promise<InstanceData> {
    return this.getInstance(instanceName);
  }

  async create(
    instanceName: string,
    integration?: string
  ): Promise<ApiResponse> {
    return this.createInstance(instanceName, integration);
  }

  async list(): Promise<InstanceData[]> {
    return this.listInstances();
  }

  async connect(instanceName: string): Promise<ApiResponse> {
    return this.connectInstance(instanceName);
  }

  async disconnect(instanceName: string): Promise<ApiResponse> {
    return this.disconnectInstance(instanceName);
  }

  async getQRCode(instanceName: string): Promise<ApiResponse> {
    return this.connectInstance(instanceName);
  }

  async getStatus(): Promise<ApiResponse> {
    return this.getApiStatus();
  }
}
