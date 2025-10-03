import React, { useState } from "react";
import { InstanceController } from "../../components/InstanceController";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Plus, TestTube } from "lucide-react";

/**
 * Esta página simula exatamente como o package Evolution Manager
 * seria usado em uma aplicação real - SEM React Router, SEM useParams,
 * SEM dependências externas.
 *
 * Isso replica o cenário onde alguém instala o package via NPM
 * e usa diretamente em seus componentes.
 */

interface TestScenario {
  id: string;
  name: string;
  instanceId: string;
  description: string;
  status: "idle" | "testing" | "connected" | "error";
}

const StandaloneTestPage: React.FC = () => {
  // Configurações da API (normalmente viriam de env ou props)
  const [baseUrl] = useState(
    import.meta.env.VITE_EVOLUTION_BASE_URL ||
      "https://evolution.kodama.solutions/"
  );
  const [apiKey] = useState(
    import.meta.env.VITE_EVOLUTION_API_KEY || "c770209f03d6c959088734dd153c9b16"
  );

  // Estado para testar diferentes cenários
  const [testScenarios, setTestScenarios] = useState<TestScenario[]>([
    {
      id: "test1",
      name: "Teste Básico",
      instanceId: "test-instance-01",
      description: "Teste básico de funcionamento",
      status: "idle",
    },
    {
      id: "test2",
      name: "Teste Polling",
      instanceId: "test-polling-02",
      description: "Teste específico do sistema de polling",
      status: "idle",
    },
  ]);

  // Estado para adicionar novos testes
  const [newInstanceId, setNewInstanceId] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Estado para logs de debug
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const addTestScenario = () => {
    if (!newInstanceId.trim()) return;

    const newScenario: TestScenario = {
      id: `test-${Date.now()}`,
      name: `Teste Custom`,
      instanceId: newInstanceId.trim(),
      description: "Teste personalizado",
      status: "idle",
    };

    setTestScenarios((prev) => [...prev, newScenario]);
    setNewInstanceId("");
    setShowAddForm(false);
    addLog(`Novo cenário adicionado: ${newInstanceId}`);
  };

  const updateScenarioStatus = (
    scenarioId: string,
    status: TestScenario["status"]
  ) => {
    setTestScenarios((prev) =>
      prev.map((scenario) =>
        scenario.id === scenarioId ? { ...scenario, status } : scenario
      )
    );
  };

  const removeScenario = (scenarioId: string) => {
    setTestScenarios((prev) => prev.filter((s) => s.id !== scenarioId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🧪 Evolution Manager - Teste Standalone
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Ambiente de teste que simula uso real do NPM package (sem React
                Router)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                {testScenarios.length} Cenários
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Testes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Controles de Teste */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cenários de Teste
                </h2>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Teste
                </Button>
              </div>

              {/* Formulário para adicionar teste */}
              {showAddForm && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      placeholder="ID da instância (ex: meu-teste-03)"
                      value={newInstanceId}
                      onChange={(e) => setNewInstanceId(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTestScenario()}
                    />
                    <Button onClick={addTestScenario} size="sm">
                      Adicionar
                    </Button>
                  </div>
                </div>
              )}

              {/* Info de Configuração */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Configuração da API
                </h3>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <div>
                    <strong>Base URL:</strong> {baseUrl}
                  </div>
                  <div>
                    <strong>API Key:</strong>{" "}
                    {apiKey ? "***presente***" : "❌ ausente"}
                  </div>
                </div>
              </div>

              {/* Lista de Cenários */}
              <div className="space-y-4">
                {testScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            scenario.status === "connected"
                              ? "bg-green-500"
                              : scenario.status === "testing"
                              ? "bg-yellow-500"
                              : scenario.status === "error"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {scenario.name}
                        </h4>
                        <Badge className="text-xs">{scenario.instanceId}</Badge>
                      </div>
                      <Button
                        onClick={() => removeScenario(scenario.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        ✕
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {scenario.description}
                    </p>

                    {/* Componente InstanceController - USO REAL */}
                    <InstanceController
                      baseUrl={baseUrl}
                      apiKey={apiKey}
                      instanceName={scenario.instanceId}
                      className="w-full"
                      showSettings={true}
                      showThemeToggle={false}
                      showThemeCustomizer={false}
                      onInstanceCreated={(name) => {
                        addLog(`✅ Instância criada: ${name}`);
                        updateScenarioStatus(scenario.id, "connected");
                      }}
                      onInstanceDeleted={(name) => {
                        addLog(`🗑️ Instância deletada: ${name}`);
                        updateScenarioStatus(scenario.id, "idle");
                      }}
                      onInstanceConnected={(name) => {
                        addLog(`🔗 Instância conectada: ${name}`);
                        updateScenarioStatus(scenario.id, "connected");
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Debug & Info */}
          <div className="space-y-6">
            {/* Status Geral */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Status Geral
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total de testes:
                  </span>
                  <span className="font-medium">{testScenarios.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Conectados:
                  </span>
                  <span className="font-medium text-green-600">
                    {
                      testScenarios.filter((s) => s.status === "connected")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Testando:
                  </span>
                  <span className="font-medium text-yellow-600">
                    {testScenarios.filter((s) => s.status === "testing").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Com erro:
                  </span>
                  <span className="font-medium text-red-600">
                    {testScenarios.filter((s) => s.status === "error").length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Logs de Debug */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Debug Logs
                </h3>
                <Button
                  onClick={() => setDebugLogs([])}
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                >
                  Limpar
                </Button>
              </div>
              <div className="bg-gray-900 dark:bg-black rounded p-3 max-h-64 overflow-y-auto">
                {debugLogs.length === 0 ? (
                  <p className="text-gray-500 text-xs">Nenhum log ainda...</p>
                ) : (
                  debugLogs.map((log, index) => (
                    <div
                      key={index}
                      className="text-xs text-green-400 font-mono mb-1"
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Informações Técnicas */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Info Técnica
              </h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div>✅ Sem React Router</div>
                <div>✅ Sem useParams</div>
                <div>✅ Sem rotas dinâmicas</div>
                <div>✅ Uso real do package</div>
                <div>✅ Múltiplas instâncias</div>
                <div>✅ Polling independente</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandaloneTestPage;
