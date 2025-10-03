interface TestResult {
  name: string;
  status: "PASSOU" | "FALHOU";
  result?: any;
  error?: string;
}

interface ApiConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const BASE_URL =
  import.meta.env.VITE_EVOLUTION_BASE_URL ||
  "https://evolution.kodama.solutions";
const API_KEY =
  import.meta.env.VITE_EVOLUTION_API_KEY || "c770209f03d6c959088734dd153c9b16";

const apiClient = {
  async request(endpoint: string, options: ApiConfig = {}): Promise<any> {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
        ...options.headers,
      },
      ...options,
    };

    console.log(`🔄 Fazendo requisição: ${config.method} ${url}`);

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ Erro ${response.status}:`, data);
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      console.log(`✅ Sucesso:`, data);
      return data;
    } catch (error) {
      console.error(`💥 Erro na requisição:`, error);
      throw error;
    }
  },
};

export async function testIntegration(): Promise<TestResult[]> {
  console.log("🧪 Iniciando testes de integração...\n");

  const tests = [
    {
      name: "Listar instâncias",
      test: () => apiClient.request("/instance/fetchInstances"),
    },
    {
      name: "Criar instância de teste",
      test: () =>
        apiClient.request("/instance/create", {
          method: "POST",
          body: JSON.stringify({
            instanceName: `test-${Date.now()}`,
            integration: "WHATSAPP-BAILEYS",
          }),
        }),
    },
    {
      name: "Buscar status de uma instância",
      test: async () => {
        // Primeiro lista as instâncias
        const instances = await apiClient.request("/instance/fetchInstances");
        if (instances && instances.length > 0) {
          const instanceName = instances[0].name; // Mudou de instances[0].instance.instanceName para instances[0].name
          return apiClient.request(`/instance/connectionState/${instanceName}`);
        }
        throw new Error("Nenhuma instância encontrada para testar");
      },
    },
  ];

  const results: TestResult[] = [];

  for (const test of tests) {
    console.log(`📋 Teste: ${test.name}`);
    try {
      const result = await test.test();
      results.push({ name: test.name, status: "PASSOU", result });
      console.log(`✅ ${test.name} - PASSOU\n`);
    } catch (error) {
      results.push({
        name: test.name,
        status: "FALHOU",
        error: (error as Error).message,
      });
      console.log(`❌ ${test.name} - FALHOU: ${(error as Error).message}\n`);
    }
  }

  console.log("📊 Resumo dos testes:");
  results.forEach((result) => {
    const emoji = result.status === "PASSOU" ? "✅" : "❌";
    console.log(`${emoji} ${result.name}: ${result.status}`);
    if (result.error) {
      console.log(`   Erro: ${result.error}`);
    }
  });

  const passed = results.filter((r) => r.status === "PASSOU").length;
  const total = results.length;
  console.log(`\n🎯 Resultado final: ${passed}/${total} testes passaram`);

  return results;
}

// Disponibiliza no window para uso no console do navegador
if (typeof window !== "undefined") {
  (window as any).testIntegration = testIntegration;
  console.log(
    "🔧 Testes disponíveis! Execute window.testIntegration() no console."
  );
}
