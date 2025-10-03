export interface InstanceData {
  id: string;
  name: string;
  status: string;
  [key: string]: any;
}

export interface EvolutionApiStatus {
  status: number;
  message: string;
  version: string;
  clientName: string;
  manager: string;
  documentation: string;
  whatsappWebVersion: string;
}

export interface InstanceSettings {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
  wavoipToken?: string;
}

export interface ChatwootIntegration {
  id: string;
  enabled: boolean;
  accountId: string;
  token: string;
  url: string;
  nameInbox: string;
  signMsg: boolean;
  signDelimiter?: string;
  number?: string;
  reopenConversation: boolean;
  conversationPending: boolean;
  mergeBrazilContacts: boolean;
  importContacts: boolean;
  importMessages: boolean;
  daysLimitImportMessages: number;
  organization: string;
  logo: string;
  ignoreJids: string[];
  createdAt: string;
  updatedAt: string;
  instanceId: string;
}

export interface WhatsAppInstance {
  id: string;
  name: string;
  connectionStatus: "open" | "close" | "connecting";
  ownerJid?: string;
  profileName?: string;
  profilePicUrl?: string;
  integration: "WHATSAPP-BAILEYS" | "WHATSAPP-WEB-JS";
  number?: string;
  businessId?: string;
  token: string;
  clientName: string;
  disconnectionReasonCode?: number;
  disconnectionObject?: string;
  disconnectionAt?: string;
  createdAt: string;
  updatedAt: string;
  Chatwoot?: ChatwootIntegration;
  Proxy?: any;
  Rabbitmq?: any;
  Nats?: any;
  Sqs?: any;
  Websocket?: any;
  Setting: {
    id: string;
    rejectCall: boolean;
    msgCall: string;
    groupsIgnore: boolean;
    alwaysOnline: boolean;
    readMessages: boolean;
    readStatus: boolean;
    syncFullHistory: boolean;
    wavoipToken: string;
    createdAt: string;
    updatedAt: string;
    instanceId: string;
  };
  _count: {
    Message: number;
    Contact: number;
    Chat: number;
  };
}

export interface CreateInstanceResponse {
  instance: {
    instanceName: string;
    instanceId: string;
    integration: string;
    webhookWaBusiness?: string;
    accessTokenWaBusiness: string;
    status: string;
  };
  hash: string;
  webhook: Record<string, any>;
  websocket: Record<string, any>;
  rabbitmq: Record<string, any>;
  nats: Record<string, any>;
  sqs: Record<string, any>;
  settings: InstanceSettings;
}

export interface ConnectionResponse {
  pairingCode?: string;
  code?: string;
  base64?: string;
  count?: number;
  instance?: {
    instanceName: string;
    state: string;
  };
}

export interface MessageResponse {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: Record<string, any>;
  messageTimestamp: number;
  status: string;
}

export interface ChatMessage {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: Record<string, any>;
  messageTimestamp: number;
  status?: string;
  pushName?: string;
}

export interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  participants?: Array<{
    id: string;
    admin?: string;
  }>;
  lastMessage?: ChatMessage;
  unreadCount: number;
}

export interface Contact {
  id: string;
  pushName?: string;
  profilePicUrl?: string;
  isMyContact: boolean;
  isWAContact: boolean;
}

export interface WebhookConfig {
  url: string;
  events?: string[];
}

export interface MediaMessage {
  number: string;
  mediatype: "image" | "video" | "audio" | "document";
  media: string;
  caption?: string;
}

export interface TextMessage {
  number: string;
  text: string;
}

export interface MarkAsReadRequest {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}

export type IntegrationType = "WHATSAPP-BAILEYS" | "WHATSAPP-WEB-JS";
export type MediaType = "image" | "video" | "audio" | "document";

export declare class EvolutionManager {
  readonly baseUrl: string;
  readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string);

  // Instance Management
  getInstance(instanceName: string): Promise<WhatsAppInstance>;
  createInstance(
    instanceName: string,
    integration?: IntegrationType
  ): Promise<CreateInstanceResponse>;
  listInstances(): Promise<WhatsAppInstance[]>;
  connectInstance(instanceName: string): Promise<ConnectionResponse>;
  disconnectInstance(instanceName: string): Promise<any>;
  deleteInstance(instanceName: string): Promise<any>;
  getInstanceStatus(instanceName: string): Promise<any>;

  // Messaging
  sendMessage(
    instanceName: string,
    number: string,
    message: string
  ): Promise<MessageResponse>;
  sendMedia(
    instanceName: string,
    number: string,
    mediaUrl: string,
    mediaType?: MediaType,
    caption?: string
  ): Promise<MessageResponse>;
  markAsRead(
    instanceName: string,
    remoteJid: string,
    fromMe?: boolean,
    id?: string
  ): Promise<any>;

  // Chat Management
  getChatMessages(
    instanceName: string,
    remoteJid: string,
    limit?: number
  ): Promise<ChatMessage[]>;
  getChats(instanceName: string): Promise<Chat[]>;
  getContacts(instanceName: string): Promise<Contact[]>;

  // Settings & Configuration
  setInstanceSettings(
    instanceName: string,
    settings: InstanceSettings
  ): Promise<any>;
  getInstanceSettings(instanceName: string): Promise<InstanceSettings>;
  setWebhook(
    instanceName: string,
    webhookUrl: string,
    events?: string[]
  ): Promise<any>;

  // Utilities
  getApiStatus(): Promise<EvolutionApiStatus>;
  getProfile(instanceName: string): Promise<any>;
}

export default EvolutionManager;
