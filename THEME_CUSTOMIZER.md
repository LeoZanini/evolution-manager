# Theme Customizer - Evolution Manager

## Visão Geral

O Evolution Manager agora inclui um sistema completo de personalização de temas que permite aos desenvolvedores:

- Testar temas personalizados em tempo real
- Exportar código para implementação permanente
- Controlar a visibilidade das funcionalidades via props
- Separar temas personalizados para modo claro e escuro

## Como Usar

### 1. Habilitando o Theme Customizer

```tsx
import { InstanceManager } from "evolution-manager";

function App() {
  return (
    <InstanceManager
      baseUrl="https://api.evolutionapi.com"
      apiKey="your-api-key"
      showThemeToggle={true} // Mostra o switch dark/light
      showThemeCustomizer={true} // Mostra o botão "Personalizar"
      showCreateButton={true} // Mostra botão criar instância
    />
  );
}
```

### 2. Props Disponíveis

| Prop                  | Tipo      | Padrão  | Descrição                                     |
| --------------------- | --------- | ------- | --------------------------------------------- |
| `showThemeToggle`     | `boolean` | `false` | Exibe o switch para alternar entre dark/light |
| `showThemeCustomizer` | `boolean` | `false` | Exibe o botão "Personalizar Tema"             |
| `showCreateButton`    | `boolean` | `true`  | Exibe o botão para criar instâncias           |

### 3. Fluxo de Desenvolvimento

#### Passo 1: Experimentação

1. Ative `showThemeCustomizer={true}` durante desenvolvimento
2. Clique em "Personalizar Tema" para abrir o editor
3. Ajuste cores em tempo real
4. Visualize mudanças instantaneamente

#### Passo 2: Exportação

1. Após finalizar o tema, clique em "Exportar Tema"
2. Copie o código gerado
3. Use para implementação permanente

#### Passo 3: Implementação

```tsx
// Exemplo de tema exportado
const defaultLightTheme: CustomTheme = {
  name: "custom-light",
  isDark: false,
  colors: {
    background: "#ffffff",
    foreground: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    border: "#e5e7eb",
    muted: "#f3f4f6",
  },
};

// Implemente via ThemeProvider customizado
<ThemeProvider defaultTheme={defaultLightTheme}>
  <InstanceManager
    showThemeCustomizer={false} // Desative em produção
    // ... outras props
  />
</ThemeProvider>;
```

### 4. Funcionalidades do Theme Customizer

#### Editor Visual

- **Seletor de cores**: Color picker visual para cada propriedade
- **Input de código**: Digite valores hex diretamente
- **Preview em tempo real**: Veja mudanças instantaneamente
- **Toggle dark/light**: Alterne entre modos para testar ambos

#### Sistema de Exportação

- **Código gerado**: Estrutura TypeScript pronta para uso
- **Cópia automática**: Um clique para copiar ao clipboard
- **Instruções de uso**: Orientações passo-a-passo
- **Compatibilidade**: Funciona com sistemas de tema existentes

### 5. Exemplo Completo

```tsx
import React from 'react';
import { InstanceManager, ThemeProvider } from 'evolution-manager';

// Tema personalizado (obtido via exportação)
const customLightTheme = {
  name: "brand-light",
  isDark: false,
  colors: {
    background: "#ffffff",
    foreground: "#2d3748",
    primary: "#4299e1",    // Azul da marca
    secondary: "#718096",
    accent: "#9f7aea",     // Roxo da marca
    success: "#48bb78",
    warning: "#ed8936",
    danger: "#f56565",
    border: "#e2e8f0",
    muted: "#f7fafc",
  },
};

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <ThemeProvider defaultTheme={customLightTheme}>
      <InstanceManager
        baseUrl={process.env.REACT_APP_API_URL}
        apiKey={process.env.REACT_APP_API_KEY}

        {/* Funcionalidades disponíveis apenas em desenvolvimento */}
        showThemeToggle={isDevelopment}
        showThemeCustomizer={isDevelopment}

        {/* Funcionalidades de produção */}
        showCreateButton={true}
        maxInstances={50}
        autoRefresh={true}
        refreshInterval={30000}

        onInstanceCreated={(name) => {
          console.log(`Nova instância: ${name}`);
        }}
      />
    </ThemeProvider>
  );
}
```

### 6. Estrutura de Cores Suportadas

```tsx
interface ThemeColors {
  background: string; // Cor de fundo principal
  foreground: string; // Cor do texto principal
  primary: string; // Cor primária (botões, links)
  secondary: string; // Cor secundária
  accent: string; // Cor de destaque/ênfase
  success: string; // Verde para estados de sucesso
  warning: string; // Amarelo para avisos
  danger: string; // Vermelho para erros/perigos
  border: string; // Cor das bordas
  muted: string; // Cor de fundo suave/silenciada
}
```

### 7. Melhores Práticas

#### Durante Desenvolvimento

- Use `showThemeCustomizer={true}` para experimentar
- Teste tanto modo claro quanto escuro
- Verifique contraste e acessibilidade
- Valide em diferentes componentes

#### Para Produção

- Desative `showThemeCustomizer={false}`
- Implemente temas via `ThemeProvider`
- Use variáveis de ambiente para configuração
- Documente paleta de cores para equipe

#### Performance

- Temas são aplicados via CSS custom properties
- Mudanças são instantâneas (sem re-render)
- Persistência automática no localStorage
- Suporte a SSR e hidratação

### 8. Integração com Design System

```tsx
// tokens.ts - Sistema de design
export const brandTokens = {
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#3b82f6",
      900: "#1e3a8a",
    },
  },
};

// theme.ts - Mapeamento para Evolution Manager
const lightTheme: CustomTheme = {
  name: "design-system-light",
  isDark: false,
  colors: {
    primary: brandTokens.colors.primary[500],
    background: brandTokens.colors.primary[50],
    // ... outros mapeamentos
  },
};
```

## Suporte

Para dúvidas sobre implementação ou problemas:

1. Consulte os exemplos em `/demo`
2. Teste no ambiente `/test`
3. Verifique a documentação da API
4. Abra issues no repositório

## Changelog

### v2.0.0

- ✅ Theme customizer visual
- ✅ Sistema de exportação de temas
- ✅ Props condicionais para funcionalidades
- ✅ Suporte a temas separados (light/dark)
- ✅ Persistência via localStorage
- ✅ CSS custom properties
- ✅ TypeScript completo
