import axios from "axios";

// Carregar variáveis de ambiente
import { config } from "dotenv";
config({ path: ".env.local" });

// Suas credenciais
const BASE_URL =
  process.env.VITE_EVOLUTION_BASE_URL || "https://evolution.kodama.solutions";
const API_KEY =
  process.env.VITE_EVOLUTION_API_KEY || "c770209f03d6c959088734dd153c9b16";

async function testCreateInstance() {
  try {
    console.log("🔨 Testando criação de instância com ES Modules...\n");

    const client = axios.create({
      baseURL: BASE_URL,
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
    });

    const testInstanceName = `teste-es-create-${Date.now()}`;

    console.log("✅ Testando formato correto: { instanceName, integration }");
    try {
      const response = await client.post("/instance/create", {
        instanceName: testInstanceName,
        integration: "WHATSAPP-BAILEYS",
      });
      console.log("✅ Instância criada com sucesso:", {
        name: response.data.instance.instanceName,
        id: response.data.instance.instanceId,
        status: response.data.instance.status,
      });
      return response.data;
    } catch (error) {
      console.log(
        "❌ Erro:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  } catch (error) {
    console.error("❌ Erro geral:", error.message);
  }
}

export { testCreateInstance };
export default testCreateInstance;
