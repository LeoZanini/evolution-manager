# Evolution Manager Library

Modern React component library for Evolution API with theming support.

## Installation

```bash
npm install evolution-manager-library
```

## Quick Start

```tsx
import { InstanceManager, ThemeProvider } from 'evolution-manager-library';
import 'evolution-manager-library/styles';

function App() {
  return (
    <ThemeProvider>
      <InstanceManager
        baseUrl="https://your-api.com"
        apiKey="your-api-key"
        showThemeToggle={true}
        showThemeCustomizer={true}
      />
    </ThemeProvider>
  );
}
```

## Components

### InstanceManager
Complete instance management interface with multiple instances support.

### InstanceController
Single instance controller for focused management.

### UI Components
- Button, Input, Card, Badge, Modal, Loading
- ThemeProvider for custom theming
- ThemeCustomizer for live theme editing

## Props

### InstanceManager Props
- `baseUrl`: Evolution API base URL
- `apiKey`: Your Evolution API key  
- `showThemeToggle?: boolean` - Show dark/light toggle
- `showThemeCustomizer?: boolean` - Show theme customizer
- `maxInstances?: number` - Maximum instances limit
- `autoRefresh?: boolean` - Auto refresh instances
- `refreshInterval?: number` - Refresh interval in ms

### InstanceController Props  
- `baseUrl`: Evolution API base URL
- `apiKey`: Your Evolution API key
- `instanceId`: Target instance ID
- `showThemeToggle?: boolean` - Show dark/light toggle  
- `showThemeCustomizer?: boolean` - Show theme customizer
- `showSettings?: boolean` - Show settings button
- `autoRefresh?: boolean` - Auto refresh instance

## Theming

The library includes a powerful theming system:

```tsx
import { ThemeProvider, useTheme } from 'evolution-manager-library';

// Custom theme
const myTheme = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb', 
    secondary: '#6b7280',
    // ... more colors
  }
};

function App() {
  return (
    <ThemeProvider defaultTheme={myTheme}>
      {/* Your components */}
    </ThemeProvider>
  );
}
```

## License

MIT © Leo Zanini