import { Link } from "react-router-dom";
import { TestInstanceManager } from "../../test/TestInstanceManager";
import { Button } from "../../components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

function TestPage() {
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
                🧪 Evolution Manager - Test Mode
              </h1>
              <p className="mt-2" style={{ color: "var(--theme-secondary)" }}>
                Ambiente de teste com dados mockados para experimentar
                funcionalidades
              </p>
            </div>

            <Link to="/">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <TestInstanceManager
          showThemeToggle={true}
          showThemeCustomizer={true}
        />
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-center items-center gap-4">
            <p className="text-center text-gray-500 dark:text-gray-400">
              🧪 Modo de Teste Ativo - Dados Mockados
            </p>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TestPage;
