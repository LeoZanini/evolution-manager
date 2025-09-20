# Evolution Manager

Wrapper moderno para Evolution API que permite gerenciar instâncias do WhatsApp de forma simples e eficiente em aplicações Node.js e Next.js.

## 📦 Instalação

```bash
npm install evolution-manager
# ou
yarn add evolution-manager
```

## 🚀 Uso Básico

### Node.js / CommonJS

```javascript
const EvolutionManager = require('evolution-manager');

const manager = new EvolutionManager('https://api.evolution.com', 'your-api-key');

// Listar instâncias
const instances = await manager.list();

// Buscar uma instância específica
const instance = await manager.get('minha-instancia');

// Criar nova instância
const newInstance = await manager.create('nova-instancia');
```

### ES Modules / TypeScript

```typescript
import EvolutionManager from 'evolution-manager';

const manager = new EvolutionManager('https://api.evolution.com', 'your-api-key');

// Com tipos TypeScript
const instances: InstanceData[] = await manager.list();
const instance: InstanceData = await manager.get('minha-instancia');
const newInstance: CreateInstanceResponse = await manager.create('nova-instancia');
```

## 🔥 Uso em Next.js

### 1. Em API Routes

Crie uma API route no Next.js (`pages/api/instances/index.js` ou `app/api/instances/route.js`):

```javascript
// pages/api/instances/index.js
import { NextEvolutionAPI } from 'evolution-manager/nextjs';

const evolutionAPI = new NextEvolutionAPI(
  process.env.EVOLUTION_API_URL,
  process.env.EVOLUTION_API_KEY
);

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return evolutionAPI.listInstances(req, res);
    case 'POST':
      return evolutionAPI.createInstance(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
```

Para App Router (Next.js 13+):

```javascript
// app/api/instances/route.js
import { NextEvolutionAPI } from 'evolution-manager/nextjs';

const evolutionAPI = new NextEvolutionAPI(
  process.env.EVOLUTION_API_URL,
  process.env.EVOLUTION_API_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const instanceName = searchParams.get('instanceName');
  
  if (instanceName) {
    return evolutionAPI.getInstance({ query: { instanceName } }, { status: (code) => ({ json: (data) => Response.json(data, { status: code }) }) });
  }
  
  return evolutionAPI.listInstances({}, { status: (code) => ({ json: (data) => Response.json(data, { status: code }) }) });
}

export async function POST(request) {
  const body = await request.json();
  return evolutionAPI.createInstance({ body }, { status: (code) => ({ json: (data) => Response.json(data, { status: code }) }) });
}
```

### 2. Usando o Hook React

No seu componente React:

```jsx
// components/InstanceManager.jsx
import { useEvolutionManager } from 'evolution-manager/hooks';
import { useState } from 'react';

export default function InstanceManager() {
  const [instanceName, setInstanceName] = useState('');
  const {
    loading,
    error,
    getInstance,
    createInstance,
    listInstances
  } = useEvolutionManager(
    process.env.NEXT_PUBLIC_EVOLUTION_API_URL,
    process.env.NEXT_PUBLIC_EVOLUTION_API_KEY
  );

  const handleGetInstance = async () => {
    const instance = await getInstance(instanceName);
    console.log('Instance:', instance);
  };

  const handleCreateInstance = async () => {
    const newInstance = await createInstance(instanceName);
    console.log('Created:', newInstance);
  };

  const handleListInstances = async () => {
    const instances = await listInstances();
    console.log('All instances:', instances);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Instâncias</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
          placeholder="Nome da instância"
          className="border p-2 mr-2"
        />
      </div>

      <div className="space-x-2">
        <button 
          onClick={handleGetInstance}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar Instância
        </button>
        
        <button 
          onClick={handleCreateInstance}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Criar Instância
        </button>
        
        <button 
          onClick={handleListInstances}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Listar Todas
        </button>
      </div>
    </div>
  );
}
```

### 3. Via API Routes (Recomendado para Produção)

Para manter as credenciais seguras no servidor:

```javascript
// lib/evolutionClient.js (Server-side)
import EvolutionManager from 'evolution-manager';

export const evolutionManager = new EvolutionManager(
  process.env.EVOLUTION_API_URL,
  process.env.EVOLUTION_API_KEY
);
```

```jsx
// components/InstanceList.jsx (Client-side)
import { useState, useEffect } from 'react';

export default function InstanceList() {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/instances');
      const data = await response.json();
      
      if (data.success) {
        setInstances(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createInstance = async (name) => {
    try {
      const response = await fetch('/api/instances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instanceName: name }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchInstances(); // Atualiza a lista
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Carregando instâncias...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Instâncias WhatsApp</h2>
      <ul>
        {instances.map((instance) => (
          <li key={instance.id}>
            {instance.name} - {instance.status}
          </li>
        ))}
      </ul>
      
      <button onClick={() => createInstance('nova-instancia')}>
        Criar Nova Instância
      </button>
    </div>
  );
}
```

## 🔧 Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do seu projeto Next.js:

```env
# Para uso server-side (API Routes)
EVOLUTION_API_URL=https://sua-api-evolution.com
EVOLUTION_API_KEY=sua-chave-api

# Para uso client-side (apenas se necessário)
NEXT_PUBLIC_EVOLUTION_API_URL=https://sua-api-evolution.com
NEXT_PUBLIC_EVOLUTION_API_KEY=sua-chave-api
```

⚠️ **Importante**: Mantenha suas credenciais no servidor sempre que possível. Use as variáveis `NEXT_PUBLIC_*` apenas quando absolutamente necessário.

## 📋 API Reference

### EvolutionManager

#### Constructor
```typescript
new EvolutionManager(baseUrl: string, apiKey: string)
```

#### Métodos
- `get(instanceName: string): Promise<InstanceData>` - Busca uma instância específica
- `create(instanceName: string): Promise<CreateInstanceResponse>` - Cria uma nova instância
- `list(): Promise<InstanceData[]>` - Lista todas as instâncias

### useEvolutionManager Hook

```typescript
const {
  manager,      // Instância do EvolutionManager
  loading,      // Estado de carregamento
  error,        // Último erro ocorrido
  getInstance,  // Função para buscar instância
  createInstance, // Função para criar instância
  listInstances   // Função para listar instâncias
} = useEvolutionManager(baseUrl, apiKey);
```

### NextEvolutionAPI

Wrapper para API Routes do Next.js com tratamento automático de erros e respostas padronizadas.

## 🧪 Testes

Execute os testes:

```bash
npm test
```

## 📄 Licença

MIT

## 🤝 Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

## 📞 Suporte

Para suporte, abra uma issue no [GitHub](https://github.com/LeoZanini/evolution-manager/issues).
