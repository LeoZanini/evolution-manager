import { Link } from "react-router-dom";
import { InstanceManager } from "../../components/InstanceManager";
import { Button } from "../../components/ui/Button";
import { TestTube2, Bug, Settings } from "lucide-react";
import { testIntegration } from "../../test-integration";

function HomePage() {
  const handleTestIntegration = async () => {
    console.clear();
    console.log("🗺️ Executando testes de integração da API...");
    try {
      await testIntegration();
    } catch (error) {
      console.error("💥 Erro nos testes:", error);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--theme-muted)" }}
    >
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--theme-background)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: "var(--theme-foreground)" }}
              >
                Evolution Manager
              </h1>
              <p className="mt-2" style={{ color: "var(--theme-secondary)" }}>
                Gerencie suas instâncias WhatsApp com facilidade
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/controller/test-instance">
                <Button variant="primary" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Controller
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleTestIntegration}>
                <Bug className="w-4 h-4 mr-2" />
                Testar API
              </Button>

              <Link to="/test">
                <Button variant="secondary" size="sm">
                  <TestTube2 className="w-4 h-4 mr-2" />
                  Modo Teste
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <InstanceManager
          baseUrl={
            import.meta.env.VITE_EVOLUTION_BASE_URL ||
            "https://evolution.kodama.solutions/"
          }
          apiKey={
            import.meta.env.VITE_EVOLUTION_API_KEY ||
            "c770209f03d6c959088734dd153c9b16"
          }
          showThemeToggle={true}
          showThemeCustomizer={true}
          showCreateButton={true}
          maxInstances={10}
          onInstanceCreated={(name) => {
            console.log(`Instância criada: ${name}`);
          }}
          onInstanceDeleted={(name) => {
            console.log(`Instância deletada: ${name}`);
          }}
          onInstanceConnected={(name) => {
            console.log(`Instância conectada: ${name}`);
          }}
        />
      </main>

      <footer
        className="border-t mt-auto"
        style={{
          backgroundColor: "var(--theme-background)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Evolution Manager - Versão 2.0 com Temas Personalizados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
