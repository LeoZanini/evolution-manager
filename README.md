# Evolution Manager Library

[![npm version](https://badge.fury.io/js/evolution-manager-library.svg)](https://badge.fury.io/js/evolution-manager-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-18%20passed-brightgreen.svg)]()

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
- 🧰 **Componentes High-Level**: Soluções completas out-of-the-box
- ✅ **Testado**: 18 testes unitários com 100% de cobertura

## 📦 Instalação

```bash
npm install evolution-manager-library
# ou
yarn add evolution-manager-library
```

## 🚀 Quick Start

### 🧰 Componentes High-Level (Recomendado)

#### InstanceManager - Gerenciador Completo de Instâncias

```tsx
import React from "react";
import {
  InstanceManager,
  ThemeProvider,
  defaultTheme,
} from "evolution-manager-library";

function App() {
  return (
    <ThemeProvider theme={defaultTheme} toggleTheme={() => {}}>
      <InstanceManager
        baseUrl="https://your-evolution-api.com"
        apiKey="your-api-key"
        refreshInterval={10000}
        showCreateButton={true}
        maxInstances={5}
        autoRefresh={true}
      />
    </ThemeProvider>
  );
}
```

#### InstanceController - Controle de Instância Específica

```tsx
import React from "react";
import {
  InstanceController,
  ThemeProvider,
  darkTheme,
} from "evolution-manager-library";

function WhatsAppInstance() {
  return (
    <ThemeProvider theme={darkTheme} toggleTheme={() => {}}>
      <InstanceController
        baseUrl="https://your-evolution-api.com"
        apiKey="your-api-key"
        instanceId="minha-instancia"
        showControls={true}
        showStatus={true}
        showSettings={true}
        autoRefresh={true}
        onInstanceCreated={(name) => console.log("Instância criada:", name)}
        onInstanceConnected={(name) => console.log("Conectado:", name)}
        onInstanceDeleted={(name) => console.log("Deletado:", name)}
      />
    </ThemeProvider>
  );
}
```

### 🔧 Uso como Classe Standalone

```typescript
import { EvolutionManager } from "evolution-manager-library";

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

// Listar todas as instâncias
const instances = await manager.listInstances();
console.log("Instâncias ativas:", instances);
```

### 🎣 Uso como Hook React

```tsx
import React from "react";
import {
  useEvolutionManager,
  ThemeProvider,
  InstanceCard,
  defaultTheme,
} from "evolution-manager-library";

function CustomApp() {
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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

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

## 🧰 Componentes Disponíveis

### 🎯 High-Level Components

```tsx
// Gerenciador completo de múltiplas instâncias
<InstanceManager
  baseUrl="https://api.com"
  apiKey="key"
  refreshInterval={10000}      // Intervalo de atualização (ms)
  autoRefresh={true}           // Auto-refresh automático
  showCreateButton={true}      // Mostrar botão de criar
  maxInstances={5}             // Limite máximo de instâncias
/>

// Controlador de instância específica
<InstanceController
  baseUrl="https://api.com"
  apiKey="key"
  instanceId="minha-instancia"
  showControls={true}          // Mostrar controles
  showStatus={true}            // Mostrar status
  autoRefresh={true}
  onInstanceCreated={(name) => {}}
  onInstanceDeleted={(name) => {}}
  onInstanceConnected={(name) => {}}
/>
```

### 📦 Base Components

```tsx
import {
  InstanceCard, // Card de gerenciamento de instância
  ConnectionStatus, // Status de conexão
  QRCodeDisplay, // Exibição de QR Code
  MessageList, // Lista de mensagens
  ContactList, // Lista de contatos
} from "evolution-manager-library";
```

### 🎨 UI Components

```tsx
import {
  Button,    // Botão estilizado
  Input,     // Input com label
  Card,      // Container estilizado
  Badge,     // Badge de status
  Modal,     // Modal responsivo
  Loading,   // Indicador de carregamento
} from "evolution-manager-library";

// Exemplo de uso
<Button variant="primary" size="md" onClick={handleClick}>
  Conectar Instância
</Button>

<Badge variant="success">Conectado</Badge>

<Input
  label="Nome da Instância"
  placeholder="Digite o nome..."
  helperText="Escolha um nome único"
  error={hasError}
/>
```

## 🎭 Sistema de Temas

```tsx
import {
  ThemeProvider,
  defaultTheme,
  darkTheme,
  useTheme,
} from "evolution-manager-library";

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
```

## 📚 API Methods

### Métodos de Instância

```typescript
// Criar nova instância
await manager.createInstance("nome-instancia", "WHATSAPP-BAILEYS");

// Conectar instância (retorna QR code)
const qr = await manager.connectInstance("nome-instancia");

// Listar todas as instâncias
const instances = await manager.listInstances();

// Obter instância específica
const instance = await manager.getInstance("nome-instancia");

// Desconectar instância
await manager.disconnectInstance("nome-instancia");

// Deletar instância
await manager.deleteInstance("nome-instancia");

// Status da instância
const status = await manager.getInstanceStatus("nome-instancia");
```

### Métodos de Mensagem

```typescript
// Enviar mensagem de texto
await manager.sendMessage("instancia", "5511999999999", "Olá!");

// Enviar mídia
await manager.sendMedia(
  "instancia",
  "5511999999999",
  "https://example.com/image.jpg",
  "image",
  "Legenda opcional"
);

// Obter mensagens do chat
const messages = await manager.getChatMessages("instancia", "chat-id", 50);

// Marcar como lido
await manager.markAsRead("instancia", "chat-id", false, "msg-id");
```

### Métodos de Contatos e Chats

```typescript
// Listar contatos
const contacts = await manager.getContacts("instancia");

// Listar chats
const chats = await manager.getChats("instancia");

// Obter perfil da instância
const profile = await manager.getProfile("instancia");
```

## 🔧 Configurações Avançadas

### Configurações da Instância

```typescript
const settings = {
  rejectCall: true, // Auto-rejeitar chamadas
  msgCall: "Não aceito chamadas", // Mensagem ao rejeitar
  groupsIgnore: false, // Ignorar mensagens de grupo
  alwaysOnline: true, // Sempre mostrar como online
  readMessages: true, // Auto-ler mensagens
  readStatus: true, // Auto-ler status
  syncFullHistory: false, // Sincronizar histórico completo
};

await manager.setInstanceSettings("instancia", settings);
```

### Webhook Configuration

```typescript
await manager.setWebhook("instancia", "https://meu-webhook.com/evolution", [
  "messages.upsert",
  "connection.update",
]);
```

## 📝 TypeScript Support

Definições TypeScript completas incluídas:

```typescript
import {
  EvolutionManager,
  InstanceData,
  MessageData,
  ContactData,
  ApiResponse,
} from "evolution-manager-library";

const manager: EvolutionManager = new EvolutionManager(baseUrl, apiKey);
const instances: InstanceData[] = await manager.listInstances();
```

### Tipos Principais

```typescript
interface InstanceData {
  name: string;
  status: "connected" | "disconnected" | "connecting";
  webhook?: string;
  integration: string;
  connectionState?: string;
}

interface MessageData {
  id: string;
  from: string;
  to: string;
  content: string;
  type: "text" | "image" | "video" | "audio" | "document";
  timestamp: string;
  fromMe: boolean;
}

interface ApiResponse<T = any> {
  status: string;
  message?: string;
  data?: T;
}
```

## 🧪 Testes

O projeto possui 18 testes unitários cobrindo todas as funcionalidades principais:

```bash
# Executar testes
npm test

# Executar testes com interface
npm run test:ui

# Executar build de produção
npm run build
```

### Cobertura de Testes

- ✅ Constructor e validações
- ✅ Criação de instâncias
- ✅ Listagem de instâncias
- ✅ Conexão e desconexão
- ✅ Envio de mensagens
- ✅ Envio de mídia
- ✅ Operações CRUD completas
- ✅ Métodos legados
- ✅ Tratamento de erros

## 🌍 Requisitos

- **Node.js**: 16.0.0+ (Suporte a ES Modules obrigatório)
- **React**: 18.0.0+
- **TypeScript**: 5.0+
- **Evolution API**: v2.0+

## 📦 Build e Deploy

```bash
# Build da biblioteca
npm run build

# Build do Storybook
npm run build-storybook

# Verificação de tipos
npm run type-check

# Lint
npm run lint
```

## 🤝 Contribuindo

1. Fork o repositório
2. Crie sua branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- [Evolution API Docs](https://doc.evolution-api.com)
- [GitHub Repository](https://github.com/LeoZanini/evolution-manager)
- [NPM Package](https://www.npmjs.com/package/evolution-manager-library)

---

Feito com ❤️ por [Leo Zanini](https://github.com/LeoZanini)
