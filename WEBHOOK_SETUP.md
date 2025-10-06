# Configuração de Webhooks

## Como funciona

O sistema agora suporta webhooks para detectar automaticamente mudanças de estado das instâncias, eliminando a necessidade de polling constante.

## Configuração

### 1. Configure o webhook URL no hook:

```typescript
const evolutionManager = useEvolutionManager({
  baseUrl: "https://sua-api.com",
  apiKey: "sua-api-key",
  webhookUrl: "https://seu-webhook-endpoint.com/webhook", // Nova propriedade
});
```

### 2. O sistema automaticamente:

- **Ao criar instância**: Configura webhook com eventos `CONNECTION_UPDATE` e `QRCODE_UPDATED`
- **Ao conectar instância**: Verifica se webhook existe, se não, configura automaticamente
- **Recebe eventos**: Processa mudanças de estado via `handleWebhookEvent`

## Eventos Suportados

### CONNECTION_UPDATE

Detecta quando o usuário escaneia o QR code e se conecta:

```json
{
  "event": "CONNECTION_UPDATE",
  "data": {
    "state": "open" // ou "connected" para conectado
  }
}
```

### QRCODE_UPDATED

Recebe novo QR code quando atualizado:

```json
{
  "event": "QRCODE_UPDATED",
  "data": {
    "qrcode": "data:image/png;base64,..." // QR code em base64
  }
}
```

## Como implementar o endpoint webhook

Crie um endpoint que chame `handleWebhookEvent`:

```typescript
// No seu servidor/endpoint
app.post("/webhook/:instanceName", (req, res) => {
  const { instanceName } = req.params;
  const { event, data } = req.body;

  // Chame o handler do Evolution Manager
  evolutionManager.handleWebhookEvent(instanceName, event, data);

  res.status(200).send("OK");
});
```

## Vantagens

- ✅ **Tempo real**: Mudanças detectadas instantaneamente
- ✅ **Eficiência**: Elimina polling desnecessário
- ✅ **Automático**: Configuração transparente
- ✅ **Confiável**: Fallback para polling se webhook falhar
