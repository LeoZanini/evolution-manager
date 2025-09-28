import { DemoInstanceManager } from "@/test/DemoInstanceManager";
import { ThemeProvider } from "../providers/ThemeProvider";
import "../styles/globals.css";
// import { testIntegration } from "../test-integration";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Evolution Manager
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Gerencie suas instâncias WhatsApp com facilidade - Demo com Temas
              Personalizados
            </p>
          </div>
        </header>

        <main>
          <DemoInstanceManager
            showThemeToggle={true}
            showThemeCustomizer={true}
          />
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Evolution Manager - Versão 2.0 com Temas Personalizados
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
