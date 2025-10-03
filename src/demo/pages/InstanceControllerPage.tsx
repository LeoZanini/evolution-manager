import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { InstanceController } from "../../components/InstanceController";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

function InstanceControllerPage() {
  const { instanceId } = useParams<{ instanceId: string }>();
  const navigate = useNavigate();
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

  // Handlers úteis para ações de instância
  const handleInstanceCreated = (name: string) => {
    console.log(`✅ Instância criada: ${name}`);
    // Poderia redirecionar ou mostrar toast de sucesso
  };

  const handleInstanceDeleted = (name: string) => {
    console.log(`🗑️ Instância deletada: ${name}`);
    // Redirecionar para a página principal após deletar
    navigate("/");
  };

  const handleInstanceConnected = (name: string) => {
    console.log(`🔗 Instância conectada: ${name}`);
    // Poderia mostrar notificação de sucesso
  };

  const handleInstanceDisconnected = (name: string) => {
    console.log(`🔌 Instância desconectada: ${name}`);
    // Poderia mostrar status atualizado
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

      <main className="p-3 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {instanceId ? (
            <InstanceController
              className="w-full"
              baseUrl={baseUrl}
              apiKey={apiKey}
              instanceName={instanceId}
              showSettings={true}
              showThemeToggle={true}
              showThemeCustomizer={true}
              hideDeleteButton={true} // ✅ Default esconder botão Excluir
              onInstanceCreated={handleInstanceCreated}
              onInstanceDeleted={handleInstanceDeleted}
              onInstanceConnected={handleInstanceConnected}
              onInstanceDisconnected={handleInstanceDisconnected}
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
        </div>
      </main>
    </div>
  );
}

export default InstanceControllerPage;
