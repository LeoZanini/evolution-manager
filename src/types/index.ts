// Theme types
export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    primary: string;
  };
  borderRadius: string;
}

// Evolution Manager types
export interface Instance {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "connecting";
  webhook?: string;
  createdAt: Date;
  lastConnection?: Date;
}

export interface Message {
  id: string;
  from: string;
  senderName?: string;
  content: string;
  type: "text" | "image" | "video" | "audio" | "document";
  timestamp: Date;
  instanceId: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  isOnline: boolean;
  profilePic?: string;
}

export interface EvolutionManagerConfig {
  baseUrl: string;
  apiKey: string;
}

// Re-export types from EvolutionManager
export type {
  InstanceData,
  MessageData,
  ContactData,
  ChatData,
  InstanceSettings,
  WebhookConfig,
  ApiResponse,
  MediaPayload,
  TextMessagePayload,
  MarkAsReadPayload,
} from "../hooks/EvolutionManager";

export type { UseEvolutionManagerReturn } from "../hooks/useEvolutionManager";
