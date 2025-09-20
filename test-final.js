import { EvolutionManager } from "./src/evolution-manager.js";

// Suas credenciais
const BASE_URL = "https://evolution.kodama.solutions/";
const API_KEY = "c770209f03d6c959088734dd153c9b16";

async function testEvolutionManager() {
  try {
    console.log("🚀 Testando EvolutionManager ES Module...\n");

    // Criar instância do EvolutionManager
    const evolutionManager = new EvolutionManager(BASE_URL, API_KEY);

    // Teste 1: Verificar status da API
    console.log("🔍 Verificando status da API...");
    const status = await evolutionManager.getApiStatus();
    console.log("✅ Status da API:", status);
    console.log("");

    // Teste 2: Listar todas as instâncias
    console.log("📋 Listando todas as instâncias...");
    const instances = await evolutionManager.listInstances();
    console.log(`✅ ${instances.length} instâncias encontradas:`);
    instances.forEach((instance, index) => {
      console.log(
        `  ${index + 1}. ${instance.name} - Status: ${
          instance.connectionStatus
        }`
      );
    });
    console.log("");

    // Teste 3: Criar uma nova instância
    const testInstanceName = `teste-es-${Date.now()}`;
    console.log(
      `🔨 Testando criação de nova instância: ${testInstanceName}...`
    );
    try {
      const createdInstance = await evolutionManager.createInstance(
        testInstanceName
      );
      console.log("✅ Instância criada com sucesso:", {
        name: createdInstance.instance.instanceName,
        id: createdInstance.instance.instanceId,
        status: createdInstance.instance.status,
      });
      console.log("");

      // Aguardar um pouco e verificar se a instância foi criada
      console.log("⏳ Aguardando 3 segundos antes de verificar...");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Verificar se a instância aparece na lista
      console.log("🔍 Verificando se a instância foi criada...");
      const updatedInstances = await evolutionManager.listInstances();
      const newInstance = updatedInstances.find(
        (inst) => inst.name === testInstanceName
      );

      if (newInstance) {
        console.log("✅ Instância encontrada na lista:", {
          name: newInstance.name,
          status: newInstance.connectionStatus,
          id: newInstance.id,
        });

        // Teste 4: Testar métodos com a nova instância
        console.log("\n🔧 Testando outros métodos...");

        // Obter configurações
        try {
          const settings = await evolutionManager.getInstanceSettings(
            testInstanceName
          );
          console.log("✅ Configurações obtidas:", settings);
        } catch (error) {
          console.log("⚠️ Erro ao obter configurações:", error.message);
        }

        // Conectar instância (obter QR)
        try {
          const qrCode = await evolutionManager.connectInstance(
            testInstanceName
          );
          console.log("✅ QR Code obtido:", qrCode.code ? "Sim" : "Não");
        } catch (error) {
          console.log("⚠️ Erro ao obter QR:", error.message);
        }
      } else {
        console.log(
          "⚠️ Instância não encontrada na lista ainda (pode demorar um pouco)"
        );
      }
    } catch (createError) {
      console.log("❌ Erro ao criar instância:", createError.message);
    }
    console.log("");

    // Teste 5: Buscar uma instância específica existente
    if (instances.length > 0) {
      const firstInstanceName = instances[0].name;
      console.log(`🔍 Buscando instância específica: ${firstInstanceName}...`);
      const specificInstance = await evolutionManager.getInstance(
        firstInstanceName
      );
      console.log("✅ Instância encontrada:", {
        name: specificInstance.name,
        status: specificInstance.connectionStatus,
        profileName: specificInstance.profileName,
        number: specificInstance.ownerJid,
      });
      console.log("");
    }

    console.log("\n🎉 Teste concluído com sucesso!");
    console.log(
      "\n💡 Agora você pode usar o EvolutionManager ES Module assim:"
    );
    console.log("```javascript");
    console.log('import { EvolutionManager } from "evolution-manager-lz";');
    console.log("");
    console.log(
      'const manager = new EvolutionManager("https://evolution.kodama.solutions/", "sua-api-key");'
    );
    console.log("");
    console.log("// Métodos modernos");
    console.log("const instances = await manager.listInstances();");
    console.log(
      'const newInstance = await manager.createInstance("nome-da-instancia");'
    );
    console.log(
      'const qrCode = await manager.connectInstance("nome-da-instancia");'
    );
    console.log(
      'await manager.sendMessage("instancia", "5511999999999", "Olá!");'
    );
    console.log("");
    console.log("// Métodos legacy (compatibilidade)");
    console.log("const instances2 = await manager.list();");
    console.log('const instance = await manager.get("nome-da-instancia");');
    console.log("```");
  } catch (error) {
    console.error("❌ Erro durante o teste:", error.message);
  }
}

// Executar o teste
testEvolutionManager();
