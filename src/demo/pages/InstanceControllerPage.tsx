import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { InstanceController } from "../../components/InstanceController";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

function InstanceControllerPage() {
  const { instanceId } = useParams<{ instanceId: string }>();
  const [baseUrl] = useState(
    import.meta.env.VITE_EVOLUTION_BASE_URL ||
      "https://evolution.kodama.solutions/"
  );
  const [apiKey] = useState(
    import.meta.env.VITE_EVOLUTION_API_KEY || "c770209f03d6c959088734dd153c9b16"
  );

  // Debug logs
  console.log("InstanceControllerPage - Credenciais:", {
    baseUrl,
    apiKey: apiKey ? "Presente" : "Ausente",
    instanceId,
  });

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
              <div className="flex items-center gap-3 mb-2">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                </Link>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: "var(--theme-foreground)" }}
                >
                  Instance Controller
                </h1>
              </div>
              <p className="mt-2" style={{ color: "var(--theme-secondary)" }}>
                Controle individual da instância:{" "}
                {instanceId || "Não especificada"}
              </p>
            </div>

            <Link to="/">
              <Button variant="secondary" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="p-6">
        {instanceId ? (
          <InstanceController
            className="w-1/2"
            baseUrl={baseUrl}
            apiKey={apiKey}
            instanceId={instanceId}
            showControls={true}
            showStatus={true}
            showSettings={true}
            showThemeToggle={true}
            showThemeCustomizer={true}
            autoRefresh={false}
            onInstanceCreated={(name) => {
              console.log(`Instância criada: ${name}`);
            }}
          />
        ) : (
          <div
            className="text-center py-12"
            style={{
              backgroundColor: "var(--theme-background)",
              borderColor: "var(--theme-border)",
            }}
          >
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--theme-foreground)" }}
            >
              Instância não especificada
            </h2>
            <p className="mb-4" style={{ color: "var(--theme-secondary)" }}>
              Por favor, especifique uma instância válida na URL.
            </p>
            <Link to="/">
              <Button variant="primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Manager
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default InstanceControllerPage;
