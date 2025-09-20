# Evolution Manager LZ

[![npm version](https://badge.fury.io/js/evolution-manager-lz.svg)](https://badge.fury.io/js/evolution-manager-lz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern ES Module wrapper for [Evolution API](https://doc.evolution-api.com) to manage WhatsApp instances with full TypeScript support.

## ✨ Features

- 🚀 **ES Modules**: Pure ES6 modules, no CommonJS
- 🔷 **TypeScript**: Complete type definitions included
- 📱 **Full WhatsApp API**: Complete wrapper for Evolution API
- 🎯 **Modern Syntax**: Uses latest JavaScript features
- 🔐 **Secure**: Built-in API key authentication
- 📦 **Lightweight**: Zero dependencies except axios
- 🔄 **Backward Compatible**: Legacy method names supported

## 📦 Installation

```bash
npm install evolution-manager-lz
```

## 🚀 Quick Start

```javascript
import { EvolutionManager } from "evolution-manager-lz";

const manager = new EvolutionManager(
  "https://your-evolution-api.com",
  "your-api-key"
);

// Create a new WhatsApp instance
const instance = await manager.createInstance("my-whatsapp");

// Connect and get QR code
const qrCode = await manager.connectInstance("my-whatsapp");
console.log("QR Code:", qrCode.base64);

// Send a message
await manager.sendMessage("my-whatsapp", "5511999999999", "Hello World!");
```

## 📚 API Reference

### Instance Management

```javascript
// Create a new instance
const instance = await manager.createInstance(
  "instanceName",
  "WHATSAPP-BAILEYS"
);

// List all instances
const instances = await manager.listInstances();

// Get specific instance
const instance = await manager.getInstance("instanceName");

// Connect instance (get QR code)
const qrCode = await manager.connectInstance("instanceName");

// Disconnect instance
await manager.disconnectInstance("instanceName");

// Delete instance
await manager.deleteInstance("instanceName");

// Get instance status
const status = await manager.getInstanceStatus("instanceName");
```

### Messaging

```javascript
// Send text message
await manager.sendMessage("instanceName", "5511999999999", "Hello!");

// Send media (image, video, audio, document)
await manager.sendMedia(
  "instanceName",
  "5511999999999",
  "https://example.com/image.jpg",
  "image",
  "Caption"
);

// Mark message as read
await manager.markAsRead(
  "instanceName",
  "5511999999999@s.whatsapp.net",
  false,
  "messageId"
);
```

### Chat Management

```javascript
// Get chat messages
const messages = await manager.getChatMessages(
  "instanceName",
  "5511999999999@s.whatsapp.net",
  50
);

// Get all chats
const chats = await manager.getChats("instanceName");

// Get contacts
const contacts = await manager.getContacts("instanceName");
```

### Settings & Configuration

```javascript
// Set instance settings
await manager.setInstanceSettings("instanceName", {
  rejectCall: true,
  alwaysOnline: true,
  readMessages: true,
  readStatus: true,
});

// Get instance settings
const settings = await manager.getInstanceSettings("instanceName");

// Set webhook
await manager.setWebhook("instanceName", "https://your-webhook.com/webhook", [
  "message",
  "status",
]);
```

### Utilities

```javascript
// Get API status
const status = await manager.getApiStatus();

// Get instance profile
const profile = await manager.getProfile("instanceName");
```

## 🔧 Configuration Options

### Instance Settings

```javascript
const settings = {
  rejectCall: boolean, // Auto-reject calls
  msgCall: string, // Message when rejecting calls
  groupsIgnore: boolean, // Ignore group messages
  alwaysOnline: boolean, // Always show as online
  readMessages: boolean, // Auto-read messages
  readStatus: boolean, // Auto-read status updates
  syncFullHistory: boolean, // Sync full chat history
  wavoipToken: string, // VoIP token
};
```

### Media Types

- `image` - JPEG, PNG, GIF images
- `video` - MP4, AVI, MOV videos
- `audio` - MP3, WAV, OGG audio files
- `document` - PDF, DOC, XLS documents

### Integration Types

- `WHATSAPP-BAILEYS` (default) - Using Baileys library
- `WHATSAPP-WEB-JS` - Using whatsapp-web.js library

## 🔄 Legacy Compatibility

For backward compatibility, legacy method names are still supported:

```javascript
// Legacy methods (still work)
const instances = await manager.list();
const instance = await manager.get("instanceName");
const newInstance = await manager.create("instanceName");
const qrCode = await manager.connect("instanceName");
await manager.disconnect("instanceName");
const status = await manager.getStatus();
```

## 📝 TypeScript Support

Full TypeScript definitions are included:

```typescript
import {
  EvolutionManager,
  WhatsAppInstance,
  CreateInstanceResponse,
} from "evolution-manager-lz";

const manager: EvolutionManager = new EvolutionManager(baseUrl, apiKey);
const instances: WhatsAppInstance[] = await manager.listInstances();
const newInstance: CreateInstanceResponse = await manager.createInstance(
  "test"
);
```

### Available Types

- `EvolutionManager` - Main class
- `WhatsAppInstance` - Instance object structure
- `CreateInstanceResponse` - Response from instance creation
- `ConnectionResponse` - QR code and connection data
- `MessageResponse` - Message send response
- `InstanceSettings` - Configuration options
- `EvolutionApiStatus` - API status response

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Test with your own Evolution API:

```javascript
// test-final.js
import { EvolutionManager } from "./src/evolution-manager.js";

const manager = new EvolutionManager("https://your-api.com", "your-key");
const instances = await manager.listInstances();
console.log(instances);
```

## 🌍 Environment Support

- **Node.js**: 16.0.0+ (ES Modules support required)
- **Browsers**: Modern browsers with ES6 module support
- **TypeScript**: 4.0+

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

- [Evolution API Documentation](https://doc.evolution-api.com)
- [GitHub Issues](https://github.com/LeoZanini/evolution-manager/issues)
- [Discord Community](https://discord.gg/evolution-api)

## 🔗 Related Projects

- [Evolution API](https://github.com/EvolutionAPI/evolution-api) - The main Evolution API project
- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API library

---

Made with ❤️ by [Leo Zanini](https://github.com/LeoZanini)
