# Evolution Manager

[![npm version](https://badge.fury.io/js/evolution-manager.svg)](https://badge.fury.io/js/evolution-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)

Biblioteca React moderna para gerenciar instâncias WhatsApp através da [Evolution API](https://doc.evolution-api.com) com suporte completo ao TypeScript, componentes UI e sistema de temas.

## ✨ Features

- 🚀 **ES Modules**: Módulos ES6 puros
- 🔷 **TypeScript**: Tipagem completa incluída
- ⚛️ **React Components**: Componentes prontos para uso
- 🎨 **Sistema de Temas**: Tema claro/escuro incluído
- 📱 **WhatsApp API Completa**: Wrapper completo para Evolution API
- 🎯 **Sintaxe Moderna**: Usa as últimas features do JavaScript
- 🔐 **Seguro**: Autenticação por API key integrada
- 📦 **Leve**: Poucas dependências essenciais
- 🔄 **Compatível**: Nomes de métodos legados suportados

## 📦 Instalação

```bash
npm install evolution-manager
# ou
yarn add evolution-manager
```

## 🚀 Quick Start

### Uso como Classe Standalone

```typescript
import { EvolutionManager } from "evolution-manager";

const manager = new EvolutionManager(
  "https://your-evolution-api.com",
  "your-api-key"
);

// Criar uma nova instância WhatsApp
const instance = await manager.createInstance("my-whatsapp");

// Conectar e obter QR code
const qrCode = await manager.connectInstance("my-whatsapp");
console.log("QR Code:", qrCode.base64);

// Enviar mensagem
await manager.sendMessage("my-whatsapp", "5511999999999", "Olá Mundo!");
```

### Uso como Hook React

```tsx
import React from "react";
import {
  useEvolutionManager,
  ThemeProvider,
  InstanceCard,
  defaultTheme,
} from "evolution-manager";

function App() {
  const {
    instances,
    loading,
    error,
    createInstance,
    connectInstance,
    sendMessage,
  } = useEvolutionManager({
    baseUrl: "https://your-evolution-api.com",
    apiKey: "your-api-key",
  });

  return (
    <ThemeProvider theme={defaultTheme} toggleTheme={() => {}}>
      <div>
        {instances.map((instance) => (
          <InstanceCard
            key={instance.name}
            instance={instance}
            onConnect={connectInstance}
            onDelete={(name) => console.log("Delete", name)}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}
```

## 🎨 Componentes UI Disponíveis

### Componentes Principais

```tsx
import {
  InstanceCard, // Card de gerenciamento de instância
  ConnectionStatus, // Status de conexão
  QRCodeDisplay, // Exibição de QR Code
  MessageList, // Lista de mensagens
  ContactList, // Lista de contatos
} from "evolution-manager";
```

### Componentes Base

```tsx
import {
  Button,    // Botão estilizado
  Input,     // Input com label
  Card,      // Container estilizado
  Badge,     // Badge de status
  Modal,     // Modal responsivo
  Loading,   // Indicador de carregamento
} from "evolution-manager";

// Exemplo de uso
<Button variant="primary" size="md" onClick={handleClick}>
  Conectar Instância
</Button>

<Input
  label="Nome da Instância"
  placeholder="Digite o nome..."
  helperText="Escolha um nome único"
  error={hasError}
/>
```

## 🎭 Sistema de Temas

### Temas Incluídos

```tsx
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  useTheme,
} from "evolution-manager";

function App() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setCurrentTheme((current) =>
      current === defaultTheme ? darkTheme : defaultTheme
    );
  };

  return (
    <ThemeProvider theme={currentTheme} toggleTheme={toggleTheme}>
      <MyComponents />
    </ThemeProvider>
  );
}

function MyComponents() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ background: theme.colors.background }}>
      <Button onClick={toggleTheme}>Alternar Tema</Button>
    </div>
  );
}
```

### Tema Personalizado

```tsx
import { Theme } from "evolution-manager";

const customTheme: Theme = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#f3f4f6",
    secondaryHover: "#e5e7eb",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#d1d5db",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  fonts: {
    primary: "Inter, sans-serif",
  },
  borderRadius: "12px",
};
```

## 📚 API Reference - Classe EvolutionManager

### Gerenciamento de Instâncias

```typescript
// Criar nova instância
const instance = await manager.createInstance(
  "instanceName",
  "WHATSAPP-BAILEYS"
);

// Listar todas as instâncias
const instances = await manager.listInstances();

// Obter instância específica
const instance = await manager.getInstance("instanceName");

// Conectar instância (obter QR code)
const qrCode = await manager.connectInstance("instanceName");

// Desconectar instância
await manager.disconnectInstance("instanceName");

// Deletar instância
await manager.deleteInstance("instanceName");

// Obter status da instância
const status = await manager.getInstanceStatus("instanceName");
```

### Mensagens

```typescript
// Enviar mensagem de texto
await manager.sendMessage("instanceName", "5511999999999", "Olá!");

// Enviar mídia (imagem, vídeo, áudio, documento)
await manager.sendMedia(
  "instanceName",
  "5511999999999",
  "https://example.com/image.jpg",
  "image",
  "Legenda"
);

// Marcar mensagem como lida
await manager.markAsRead(
  "instanceName",
  "5511999999999@s.whatsapp.net",
  false,
  "messageId"
);
```

### Gerenciamento de Chats

```typescript
// Obter mensagens do chat
const messages = await manager.getChatMessages(
  "instanceName",
  "5511999999999@s.whatsapp.net",
  50
);

// Obter todos os chats
const chats = await manager.getChats("instanceName");

// Obter contatos
const contacts = await manager.getContacts("instanceName");
```

## 🎣 Hook useEvolutionManager

```typescript
const {
  manager, // Instância da classe EvolutionManager
  instances, // Array de instâncias
  messages, // Array de mensagens
  contacts, // Array de contatos
  chats, // Array de chats
  loading, // Estado de carregamento
  error, // Erro atual

  // Métodos de instância
  createInstance,
  deleteInstance,
  connectInstance,
  disconnectInstance,
  getInstanceStatus,

  // Métodos de mensagem
  sendMessage,
  sendMedia,
  getChatMessages,
  markAsRead,

  // Métodos de atualização
  refreshInstances,
  refreshContacts,
  refreshChats,
  refreshMessages,

  // Utilitários
  clearError,
  setLoading,
} = useEvolutionManager({
  baseUrl: "https://your-evolution-api.com",
  apiKey: "your-api-key",
});
```

## 🔧 Opções de Configuração

### Configurações da Instância

```typescript
const settings = {
  rejectCall: boolean, // Auto-rejeitar chamadas
  msgCall: string, // Mensagem ao rejeitar chamadas
  groupsIgnore: boolean, // Ignorar mensagens de grupo
  alwaysOnline: boolean, // Sempre mostrar como online
  readMessages: boolean, // Auto-ler mensagens
  readStatus: boolean, // Auto-ler atualizações de status
  syncFullHistory: boolean, // Sincronizar histórico completo
};
```

### Tipos de Mídia

- `image` - Imagens JPEG, PNG, GIF
- `video` - Vídeos MP4, AVI, MOV
- `audio` - Arquivos de áudio MP3, WAV, OGG
- `document` - Documentos PDF, DOC, XLS

### Tipos de Integração

- `WHATSAPP-BAILEYS` (padrão) - Usando biblioteca Baileys
- `WHATSAPP-WEB-JS` - Usando whatsapp-web.js

## 📝 Suporte ao TypeScript

Definições TypeScript completas incluídas:

```typescript
import {
  EvolutionManager,
  InstanceData,
  MessageData,
  ContactData,
  ChatData,
  ApiResponse,
  UseEvolutionManagerReturn,
  Theme,
  ThemeColors,
} from "evolution-manager";

const manager: EvolutionManager = new EvolutionManager(baseUrl, apiKey);
const instances: InstanceData[] = await manager.listInstances();
```

### Tipos Disponíveis

- `EvolutionManager` - Classe principal
- `InstanceData` - Estrutura de instância
- `MessageData` - Dados de mensagem
- `ContactData` - Dados de contato
- `ChatData` - Dados de chat
- `ApiResponse` - Resposta da API
- `InstanceSettings` - Opções de configuração
- `Theme` - Estrutura do tema
- `UseEvolutionManagerReturn` - Retorno do hook

## 🎨 Exemplos de Componentes

### Card de Instância Completo

```tsx
import { InstanceCard, ConnectionStatus } from "evolution-manager";

function MyInstanceManager() {
  const { instances, connectInstance, deleteInstance } = useEvolutionManager({
    baseUrl: process.env.REACT_APP_API_URL,
    apiKey: process.env.REACT_APP_API_KEY,
  });

  return (
    <div>
      {instances.map((instance) => (
        <div key={instance.name}>
          <InstanceCard
            instance={instance}
            onConnect={connectInstance}
            onDisconnect={(name) => console.log("Disconnect", name)}
            onDelete={deleteInstance}
            onViewQR={() => setShowQR(true)}
          />
          <ConnectionStatus
            status={instance.status}
            instanceName={instance.name}
            lastUpdate={instance.lastConnection}
            onReconnect={() => connectInstance(instance.name)}
          />
        </div>
      ))}
    </div>
  );
}
```

### Chat Interface

```tsx
import { MessageList, ContactList } from "evolution-manager";

function ChatInterface() {
  const { messages, contacts, refreshMessages, sendMessage } =
    useEvolutionManager(config);

  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <ContactList contacts={contacts} onContactClick={setSelectedContact} />

      {selectedContact && (
        <MessageList
          messages={messages}
          onMessageClick={(msg) => console.log(msg)}
        />
      )}
    </div>
  );
}
```

## 🧪 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run build:lib    # Build da biblioteca
npm run preview      # Preview do build

# Testes
npm run test         # Executa testes
npm run type-check   # Verificação de tipos

# Storybook
npm run storybook    # Inicia Storybook
npm run build-storybook # Build do Storybook
```

### Visualizar Demo

```bash
npm run dev          # http://localhost:5173/
# ou
npm run build && npm run preview  # http://localhost:4173/
```

## 🌍 Suporte a Ambientes

- **Node.js**: 16.0.0+ (Suporte a ES Modules obrigatório)
- **React**: 18.0.0+
- **Navegadores**: Navegadores modernos com suporte a ES6 modules
- **TypeScript**: 5.0+

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

1. Fork o repositório
2. Crie sua branch de feature: `git checkout -b feature/feature-incrivel`
3. Commit suas mudanças: `git commit -m 'Add feature incrível'`
4. Push para a branch: `git push origin feature/feature-incrivel`
5. Abra um Pull Request

## 📞 Suporte

- [Documentação da Evolution API](https://doc.evolution-api.com)
- [GitHub Issues](https://github.com/LeoZanini/evolution-manager/issues)
- [Discord da Comunidade](https://discord.gg/evolution-api)

## 🔗 Projetos Relacionados

- [Evolution API](https://github.com/EvolutionAPI/evolution-api) - Projeto principal da Evolution API
- [Baileys](https://github.com/WhiskeySockets/Baileys) - Biblioteca WhatsApp Web API

---

Feito com ❤️ por [Leo Zanini](https://github.com/LeoZanini)
