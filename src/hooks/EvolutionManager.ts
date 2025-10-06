import axios, { AxiosInstance, AxiosResponse } from "axios";

// Interfaces para os tipos de dados da API
export interface InstanceData {
  id?: string;
  name: string;
  status?: "connected" | "disconnected" | "connecting"; // Campo legacy
  connectionStatus?: "open" | "close" | "connecting"; // Campo real da API
  webhook?: string;
  integration?: string;
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
  enabled?: boolean;
  webhookByEvents?: boolean;
  webhookBase64?: boolean;
}

export interface WebhookResponse {
  enabled: boolean;
  url: string;
  events: string[];
  webhookByEvents?: boolean;
  webhookBase64?: boolean;
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
                const [contactsCount, chatsCount, profileInfo] =
                  await Promise.all([
                    this.getContactsCount(instance.name),
                    this.getChatsCount(instance.name),
                    this.getInstanceProfile(instance.name),
                  ]);

                // Extrair informações do perfil/dispositivo
                const deviceData: any = {};
                if (profileInfo.data) {
                  deviceData.ownerJid =
                    profileInfo.data.wuid || profileInfo.data.id;
                  deviceData.profileName =
                    profileInfo.data.name || profileInfo.data.pushName;
                  deviceData.profilePicUrl = profileInfo.data.profilePicUrl;
                }

                return {
                  ...instance,
                  contactsCount,
                  chatsCount,
                  ...deviceData,
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
   * Fetch a single instance by name with full details
   */
  async fetchSingleInstance(
    instanceName: string
  ): Promise<InstanceData | null> {
    try {
      const response: AxiosResponse<any> = await this.client.get(
        `/instance/fetchInstances?instanceName=${instanceName}`
      );

      // A API retorna um array, mas com o filtro por nome, só vem 1
      const instances = Array.isArray(response.data)
        ? response.data
        : [response.data];

      if (instances.length === 0) {
        return null;
      }

      const instance = instances[0];

      // Se a instância estiver conectada, buscar informações adicionais
      if (
        instance.status === "connected" ||
        instance.connectionState === "open"
      ) {
        try {
          const [contactsCount, chatsCount, profileInfo, messagesCount] =
            await Promise.all([
              this.getContactsCount(instanceName),
              this.getChatsCount(instanceName),
              this.getInstanceProfile(instanceName),
              this.getMessagesCount(instanceName),
            ]);

          // Extrair informações do perfil/dispositivo
          const deviceData: any = {};
          if (profileInfo.data) {
            deviceData.ownerJid = profileInfo.data.wuid || profileInfo.data.id;
            deviceData.profileName =
              profileInfo.data.name || profileInfo.data.pushName;
            deviceData.profilePicUrl = profileInfo.data.profilePicUrl;
          }

          return {
            ...instance,
            contactsCount,
            chatsCount,
            messagesCount,
            ...deviceData,
          };
        } catch (error) {
          console.warn(`Failed to get full stats for ${instanceName}:`, error);
          return instance;
        }
      }

      return instance;
    } catch (error: any) {
      throw new Error(`Failed to fetch instance: ${error.message}`);
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
   * Get messages count for an instance (all chats)
   */
  async getMessagesCount(instanceName: string): Promise<number> {
    try {
      const response = await this.client.get(`/chat/findChats/${instanceName}`);
      if (Array.isArray(response.data)) {
        // Soma o total de mensagens de todos os chats
        return response.data.reduce((total: number, chat: any) => {
          return total + (chat.messagesCount || 0);
        }, 0);
      }
      return 0;
    } catch (error: any) {
      console.warn(
        `Failed to get messages count for ${instanceName}:`,
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
   * Get instance connection status with device info
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
   * Get instance profile information (device info)
   */
  async getInstanceProfile(instanceName: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.client.get(
        `/chat/whatsappProfile/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      console.warn(
        `Failed to get instance profile for ${instanceName}:`,
        error.message
      );
      return { status: "error", message: error.message };
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
    events: string[] = ["CONNECTION_UPDATE", "QRCODE_UPDATED"]
  ): Promise<ApiResponse> {
    try {
      const payload: WebhookConfig = {
        enabled: true,
        url: webhookUrl,
        webhookByEvents: true,
        webhookBase64: true,
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

  /**
   * Get webhook configuration for instance
   */
  async getWebhook(instanceName: string): Promise<WebhookResponse | null> {
    try {
      const response: AxiosResponse<WebhookResponse> = await this.client.get(
        `/webhook/find/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      // Se der erro 404, significa que não tem webhook configurado
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error(`Failed to get webhook: ${error.message}`);
    }
  }
}
