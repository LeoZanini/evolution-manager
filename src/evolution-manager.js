import axios from "axios";

/**
 * Evolution API Manager - Modern ES Module wrapper for Evolution API
 */
export class EvolutionManager {
  constructor(baseUrl, apiKey) {
    if (!baseUrl || !apiKey) {
      throw new Error("baseUrl and apiKey are required");
    }

    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this.apiKey = apiKey;

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
  async getInstance(instanceName) {
    try {
      const response = await this.client.get("/instance/fetchInstances");
      const instances = response.data;
      const instance = instances.find((inst) => inst.name === instanceName);
      if (!instance) {
        throw new Error(`Instance '${instanceName}' not found`);
      }
      return instance;
    } catch (error) {
      throw new Error(`Failed to get instance: ${error.message}`);
    }
  }

  /**
   * Create a new WhatsApp instance
   */
  async createInstance(instanceName, integration = "WHATSAPP-BAILEYS") {
    try {
      const response = await this.client.post("/instance/create", {
        instanceName,
        integration,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create instance: ${error.message}`);
    }
  }

  /**
   * List all instances
   */
  async listInstances() {
    try {
      const response = await this.client.get("/instance/fetchInstances");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to list instances: ${error.message}`);
    }
  }

  /**
   * Connect an instance and get QR code
   */
  async connectInstance(instanceName) {
    try {
      const response = await this.client.get(
        `/instance/connect/${instanceName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to connect instance: ${error.message}`);
    }
  }

  /**
   * Disconnect/logout an instance
   */
  async disconnectInstance(instanceName) {
    try {
      const response = await this.client.delete(
        `/instance/logout/${instanceName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to disconnect instance: ${error.message}`);
    }
  }

  /**
   * Delete an instance
   */
  async deleteInstance(instanceName) {
    try {
      const response = await this.client.delete(
        `/instance/delete/${instanceName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete instance: ${error.message}`);
    }
  }

  /**
   * Get instance connection status
   */
  async getInstanceStatus(instanceName) {
    try {
      const response = await this.client.get(
        `/instance/connectionState/${instanceName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get instance status: ${error.message}`);
    }
  }

  /**
   * Send a text message
   */
  async sendMessage(instanceName, number, message) {
    try {
      const response = await this.client.post(
        `/message/sendText/${instanceName}`,
        {
          number,
          text: message,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  /**
   * Send media (image, video, audio, document)
   */
  async sendMedia(
    instanceName,
    number,
    mediaUrl,
    mediaType = "image",
    caption = ""
  ) {
    try {
      const endpoint = `/message/sendMedia/${instanceName}`;
      const payload = {
        number,
        mediatype: mediaType,
        media: mediaUrl,
      };

      if (caption) {
        payload.caption = caption;
      }

      const response = await this.client.post(endpoint, payload);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send media: ${error.message}`);
    }
  }

  /**
   * Get chat messages
   */
  async getChatMessages(instanceName, remoteJid, limit = 50) {
    try {
      const response = await this.client.get(
        `/chat/findMessages/${instanceName}`,
        {
          params: { remoteJid, limit },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get messages: ${error.message}`);
    }
  }

  /**
   * Get all chats
   */
  async getChats(instanceName) {
    try {
      const response = await this.client.get(`/chat/findChats/${instanceName}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get chats: ${error.message}`);
    }
  }

  /**
   * Get contacts
   */
  async getContacts(instanceName) {
    try {
      const response = await this.client.get(
        `/chat/findContacts/${instanceName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get contacts: ${error.message}`);
    }
  }

  /**
   * Set instance settings
   */
  async setInstanceSettings(instanceName, settings) {
    try {
      const response = await this.client.post(
        `/settings/set/${instanceName}`,
        settings
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to set settings: ${error.message}`);
    }
  }

  /**
   * Get instance settings
   */
  async getInstanceSettings(instanceName) {
    try {
      const response = await this.client.get(`/settings/find/${instanceName}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get settings: ${error.message}`);
    }
  }

  /**
   * Set webhook URL
   */
  async setWebhook(instanceName, webhookUrl, events = []) {
    try {
      const response = await this.client.post(`/webhook/set/${instanceName}`, {
        url: webhookUrl,
        events,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to set webhook: ${error.message}`);
    }
  }

  /**
   * Get API status
   */
  async getApiStatus() {
    try {
      const response = await this.client.get("/");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get API status: ${error.message}`);
    }
  }

  /**
   * Get instance profile
   */
  async getProfile(instanceName) {
    try {
      const response = await this.client.get(
        `/chat/fetchProfile/${instanceName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get profile: ${error.message}`);
    }
  }

  /**
   * Mark message as read
   */
  async markAsRead(instanceName, remoteJid, fromMe = false, id) {
    try {
      const response = await this.client.post(
        `/chat/markMessageAsRead/${instanceName}`,
        {
          remoteJid,
          fromMe,
          id,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to mark as read: ${error.message}`);
    }
  }

  // Legacy method names for backward compatibility
  async get(instanceName) {
    return this.getInstance(instanceName);
  }

  async create(instanceName, integration) {
    return this.createInstance(instanceName, integration);
  }

  async list() {
    return this.listInstances();
  }

  async connect(instanceName) {
    return this.connectInstance(instanceName);
  }

  async disconnect(instanceName) {
    return this.disconnectInstance(instanceName);
  }

  async getQRCode(instanceName) {
    return this.connectInstance(instanceName);
  }

  async getStatus() {
    return this.getApiStatus();
  }
}

export default EvolutionManager;
