import React from "react";
import ReactDOM from "react-dom/client";
import { InstanceController } from "./components/InstanceController";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./styles/globals.css";

/**
 * TESTE COMPLETAMENTE STANDALONE
 *
 * Este arquivo simula exatamente como o package seria usado
 * em uma aplicação real - SEM REACT ROUTER, SEM ROTAS DINÂMICAS,
 * SEM DEPENDÊNCIAS EXTERNAS.
 *
 * É assim que alguém usaria após instalar via NPM:
 * npm install evolution-manager
 */

const StandaloneApp: React.FC = () => {
  // Configurações que normalmente viriam de .env ou props
  const baseUrl =
    import.meta.env.VITE_EVOLUTION_BASE_URL ||
    "https://evolution.kodama.solutions/";
  const apiKey =
    import.meta.env.VITE_EVOLUTION_API_KEY ||
    "c770209f03d6c959088734dd153c9b16";

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Simples */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🧪 Teste Standalone Puro
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Uso exato como seria após instalar o NPM package
            </p>
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <div>✅ Sem React Router</div>
              <div>✅ Sem useParams</div>
              <div>✅ Sem rotas dinâmicas</div>
              <div>✅ Múltiplas instâncias simultâneas</div>
            </div>
          </div>

          {/* Grid de Testes - Múltiplas Instâncias */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Teste 1 - Instância Básica */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                📱 Teste 1: Instância Básica
              </h2>
              <InstanceController
                baseUrl={baseUrl}
                apiKey={apiKey}
                instanceName="standalone-test-01"
                className="w-full"
                showSettings={true}
                showThemeToggle={false}
                showThemeCustomizer={false}
                onInstanceCreated={(name: string) => {
                  console.log(`✅ [Teste 1] Instância criada: ${name}`);
                }}
                onInstanceDeleted={(name: string) => {
                  console.log(`🗑️ [Teste 1] Instância deletada: ${name}`);
                }}
                onInstanceConnected={(name: string) => {
                  console.log(`🔗 [Teste 1] Instância conectada: ${name}`);
                }}
              />
            </div>

            {/* Teste 2 - Polling Específico */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                🔄 Teste 2: Polling Focus
              </h2>
              <InstanceController
                baseUrl={baseUrl}
                apiKey={apiKey}
                instanceName="polling-test-02"
                className="w-full"
                showSettings={true}
                showThemeToggle={false}
                showThemeCustomizer={false}
                onInstanceCreated={(name: string) => {
                  console.log(`✅ [Teste 2] Instância criada: ${name}`);
                }}
                onInstanceDeleted={(name: string) => {
                  console.log(`🗑️ [Teste 2] Instância deletada: ${name}`);
                }}
                onInstanceConnected={(name: string) => {
                  console.log(`🔗 [Teste 2] Instância conectada: ${name}`);
                }}
              />
            </div>

            {/* Teste 3 - Transições */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                ⚡ Teste 3: Transições
              </h2>
              <InstanceController
                baseUrl={baseUrl}
                apiKey={apiKey}
                instanceName="transitions-test-03"
                className="w-full"
                showSettings={true}
                showThemeToggle={false}
                showThemeCustomizer={false}
                onInstanceCreated={(name: string) => {
                  console.log(`✅ [Teste 3] Instância criada: ${name}`);
                }}
                onInstanceDeleted={(name: string) => {
                  console.log(`🗑️ [Teste 3] Instância deletada: ${name}`);
                }}
                onInstanceConnected={(name: string) => {
                  console.log(`🔗 [Teste 3] Instância conectada: ${name}`);
                }}
              />
            </div>

            {/* Teste 4 - Stress Test */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                🏋️ Teste 4: Stress Test
              </h2>
              <InstanceController
                baseUrl={baseUrl}
                apiKey={apiKey}
                instanceName="stress-test-04"
                className="w-full"
                showSettings={true}
                showThemeToggle={false}
                showThemeCustomizer={false}
                onInstanceCreated={(name: string) => {
                  console.log(`✅ [Teste 4] Instância criada: ${name}`);
                }}
                onInstanceDeleted={(name: string) => {
                  console.log(`🗑️ [Teste 4] Instância deletada: ${name}`);
                }}
                onInstanceConnected={(name: string) => {
                  console.log(`🔗 [Teste 4] Instância conectada: ${name}`);
                }}
              />
            </div>
          </div>

          {/* Footer com informações */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              🎯 Este ambiente replica EXATAMENTE o uso real do package
            </h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <div>
                <strong>Cenário:</strong> Usuário instala{" "}
                <code>npm install evolution-manager</code>
              </div>
              <div>
                <strong>Uso:</strong> Importa e usa o componente em qualquer
                página React
              </div>
              <div>
                <strong>Comportamento:</strong> Todos os useEffect, polling e
                estados são independentes
              </div>
              <div>
                <strong>API:</strong> Fazendo requisições reais para {baseUrl}
              </div>
              <div>
                <strong>Estado:</strong> Cada instância mantém seu próprio
                estado sem interferência
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Renderizar diretamente - como seria em uma aplicação real
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StandaloneApp />
  </React.StrictMode>
);
