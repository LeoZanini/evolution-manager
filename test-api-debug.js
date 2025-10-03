// Teste direto da API para debug
const baseUrl = "https://evolution.kodama.solutions/";
const apiKey = "c770209f03d6c959088734dd153c9b16";

console.log("🔍 Testando API Evolution...");
console.log("Base URL:", baseUrl);
console.log("API Key:", apiKey);

// Teste 1: Listar instâncias
fetch(`${baseUrl}instance/fetchInstances`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    apikey: apiKey,
  },
})
  .then((response) => {
    console.log("📊 Response Status:", response.status);
    console.log("📊 Response Headers:", [...response.headers.entries()]);
    return response.json();
  })
  .then((data) => {
    console.log("✅ Instâncias encontradas:", data);
  })
  .catch((error) => {
    console.error("❌ Erro ao listar instâncias:", error);
  });

// Teste 2: Criar instância (apenas se não existir test-instance)
setTimeout(() => {
  fetch(`${baseUrl}instance/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      instanceName: "test-instance-debug",
      integration: "WHATSAPP-BAILEYS",
    }),
  })
    .then((response) => {
      console.log("🆕 Create Response Status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("✅ Instância criada:", data);
    })
    .catch((error) => {
      console.error("❌ Erro ao criar instância:", error);
    });
}, 2000);
