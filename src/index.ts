// Providers
export { ThemeProvider } from "./providers/ThemeProvider";

// Hooks
export { useEvolutionManager } from "./hooks/useEvolutionManager";
export { useTheme } from "./hooks/useTheme";

// Evolution Manager Class
export { default as EvolutionManager } from "./hooks/EvolutionManager";

// Components
export { InstanceCard } from "./components/InstanceCard";
export { ConnectionStatus } from "./components/ConnectionStatus";
export { MessageList } from "./components/MessageList";
export { ContactList } from "./components/ContactList";
export { QRCodeDisplay } from "./components/QRCodeDisplay";
export { Button } from "./components/ui/Button";
export { Input } from "./components/ui/Input";
export { Card } from "./components/ui/Card";
export { Badge } from "./components/ui/Badge";
export { Modal } from "./components/ui/Modal";
export { Loading } from "./components/ui/Loading";

// Types
export type {
  Theme,
  ThemeColors,
  Instance,
  Message,
  Contact,
  EvolutionManagerConfig,
  // Evolution Manager API types
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
  UseEvolutionManagerReturn,
} from "./types";

// Themes
export { defaultTheme, darkTheme } from "./styles/theme";
