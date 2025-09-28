/**
 * Teste de Integração com API Evolution
 *
 * Este arquivo contém testes para validar se todas as funcionalidades
 * do Evolution Manager estão funcionando corretamente com a API real.
 */

interface APITestConfig {
  baseUrl: string;
  apiKey: string;
}

interface TestResult {
  operation: string;
  success: boolean;
  error?: string;
  duration: number;
}

class EvolutionAPITester {
  private config: APITestConfig;
  private results: TestResult[] = [];

  constructor(config: APITestConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          apikey: this.config.apiKey,
          ...options.headers,
        },
      });

      const duration = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      return { data, duration };
    } catch (error) {
      const duration = Date.now() - startTime;
      throw { error, duration };
    }
  }

  private addResult(
    operation: string,
    success: boolean,
    duration: number,
    error?: string
  ) {
    this.results.push({ operation, success, error, duration });
  }

  async testFetchInstances(): Promise<void> {
    console.log("🧪 Testando: Listar instâncias...");

    try {
      const { duration } = await this.makeRequest("/instance/fetchInstances");
      this.addResult("Fetch Instances", true, duration);
      console.log("✅ Listar instâncias: OK");
    } catch (err: any) {
      this.addResult(
        "Fetch Instances",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Listar instâncias: FALHOU", err.error);
    }
  }

  async testCreateInstance(): Promise<string | null> {
    const instanceName = `test-${Date.now()}`;
    console.log(`🧪 Testando: Criar instância ${instanceName}...`);

    try {
      const { duration } = await this.makeRequest("/instance/create", {
        method: "POST",
        body: JSON.stringify({
          instanceName,
          token: this.config.apiKey,
          qrcode: true,
        }),
      });

      this.addResult("Create Instance", true, duration);
      console.log("✅ Criar instância: OK");
      return instanceName;
    } catch (err: any) {
      this.addResult(
        "Create Instance",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Criar instância: FALHOU", err.error);
      return null;
    }
  }

  async testConnectInstance(instanceName: string): Promise<void> {
    console.log(`🧪 Testando: Conectar instância ${instanceName}...`);

    try {
      const { duration } = await this.makeRequest(
        `/instance/connect/${instanceName}`,
        {
          method: "GET",
        }
      );

      this.addResult("Connect Instance", true, duration);
      console.log("✅ Conectar instância: OK");
    } catch (err: any) {
      this.addResult(
        "Connect Instance",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Conectar instância: FALHOU", err.error);
    }
  }

  async testGetQRCode(instanceName: string): Promise<void> {
    console.log(`🧪 Testando: Obter QR Code ${instanceName}...`);

    try {
      const { duration } = await this.makeRequest(
        `/instance/connect/${instanceName}`,
        {
          method: "GET",
        }
      );

      this.addResult("Get QR Code", true, duration);
      console.log("✅ Obter QR Code: OK");
    } catch (err: any) {
      this.addResult(
        "Get QR Code",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Obter QR Code: FALHOU", err.error);
    }
  }

  async testDisconnectInstance(instanceName: string): Promise<void> {
    console.log(`🧪 Testando: Desconectar instância ${instanceName}...`);

    try {
      const { duration } = await this.makeRequest(
        `/instance/logout/${instanceName}`,
        {
          method: "DELETE",
        }
      );

      this.addResult("Disconnect Instance", true, duration);
      console.log("✅ Desconectar instância: OK");
    } catch (err: any) {
      this.addResult(
        "Disconnect Instance",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Desconectar instância: FALHOU", err.error);
    }
  }

  async testDeleteInstance(instanceName: string): Promise<void> {
    console.log(`🧪 Testando: Deletar instância ${instanceName}...`);

    try {
      const { duration } = await this.makeRequest(
        `/instance/delete/${instanceName}`,
        {
          method: "DELETE",
        }
      );

      this.addResult("Delete Instance", true, duration);
      console.log("✅ Deletar instância: OK");
    } catch (err: any) {
      this.addResult(
        "Delete Instance",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Deletar instância: FALHOU", err.error);
    }
  }

  async testInstanceSettings(instanceName: string): Promise<void> {
    console.log(`🧪 Testando: Configurações da instância ${instanceName}...`);

    const settings = {
      rejectCall: false,
      msgCall: "Chamadas não são permitidas.",
      groupsIgnore: true,
      alwaysOnline: false,
      readMessages: false,
      readStatus: false,
      syncFullHistory: false,
    };

    try {
      const { duration } = await this.makeRequest(
        `/settings/set/${instanceName}`,
        {
          method: "POST",
          body: JSON.stringify(settings),
        }
      );

      this.addResult("Update Settings", true, duration);
      console.log("✅ Configurações da instância: OK");
    } catch (err: any) {
      this.addResult(
        "Update Settings",
        false,
        err.duration || 0,
        err.error?.message || "Erro desconhecido"
      );
      console.error("❌ Configurações da instância: FALHOU", err.error);
    }
  }

  async runCompleteTest(): Promise<void> {
    console.log("🚀 Iniciando teste completo da API Evolution...\n");

    // 1. Listar instâncias
    await this.testFetchInstances();
    await this.delay(1000);

    // 2. Criar nova instância
    const instanceName = await this.testCreateInstance();
    if (!instanceName) return;
    await this.delay(2000);

    // 3. Conectar instância
    await this.testConnectInstance(instanceName);
    await this.delay(1000);

    // 4. Obter QR Code
    await this.testGetQRCode(instanceName);
    await this.delay(1000);

    // 5. Configurações
    await this.testInstanceSettings(instanceName);
    await this.delay(1000);

    // 6. Desconectar
    await this.testDisconnectInstance(instanceName);
    await this.delay(1000);

    // 7. Deletar instância de teste
    await this.testDeleteInstance(instanceName);

    console.log("\n📊 Relatório dos Testes:");
    this.printResults();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private printResults(): void {
    console.log("\n" + "=".repeat(60));
    console.log("RESULTADO DOS TESTES DE INTEGRAÇÃO");
    console.log("=".repeat(60));

    let totalTests = this.results.length;
    let passedTests = this.results.filter((r) => r.success).length;
    let failedTests = totalTests - passedTests;

    this.results.forEach((result) => {
      const status = result.success ? "✅" : "❌";
      const duration = `${result.duration}ms`;
      console.log(
        `${status} ${result.operation.padEnd(20)} ${duration.padStart(8)}`
      );

      if (!result.success && result.error) {
        console.log(`   └─ Erro: ${result.error}`);
      }
    });

    console.log("\n" + "-".repeat(60));
    console.log(
      `📈 Total: ${totalTests} | ✅ Passou: ${passedTests} | ❌ Falhou: ${failedTests}`
    );
    console.log(
      `📊 Taxa de sucesso: ${((passedTests / totalTests) * 100).toFixed(1)}%`
    );

    if (failedTests === 0) {
      console.log(
        "🎉 Todos os testes passaram! API está funcionando perfeitamente."
      );
    } else {
      console.log(
        "⚠️  Alguns testes falharam. Verifique a configuração da API."
      );
    }
  }
}

// Exemplo de uso
export async function runAPITests() {
  const config: APITestConfig = {
    baseUrl:
      process.env.VITE_EVOLUTION_BASE_URL || "https://api.evolutionapi.com",
    apiKey:
      process.env.VITE_EVOLUTION_API_KEY || "c770209f03d6c959088734dd153c9b16",
  };

  const tester = new EvolutionAPITester(config);
  await tester.runCompleteTest();
}

// Executar no console
if (typeof window !== "undefined") {
  (window as any).runAPITests = runAPITests;
  console.log("💡 Para executar os testes, rode: runAPITests()");
}
