# Evolution Manager

Um wrapper JavaScript para a Evolution API, facilitando o gerenciamento de instâncias do WhatsApp.

## 📦 Instalação

```bash
npm install evolution-manager
```

## 🚀 Uso

### Configuração Inicial

```javascript
const EvolutionManager = require("evolution-manager");

const manager = new EvolutionManager(
  "https://sua-evolution-api.com", // URL base da sua Evolution API
  "seu-api-key-aqui" // Sua chave de API
);
```

### Métodos Disponíveis

#### `get(instanceName)`

Obtém informações de uma instância específica.

```javascript
try {
  const instance = await manager.get("minha-instancia");
  console.log(instance);
} catch (error) {
  console.error("Erro ao obter instância:", error.message);
}
```

**Parâmetros:**

- `instanceName` (string): Nome da instância a ser consultada

**Retorna:** Promise que resolve com os dados da instância

#### `create(instanceName)`

Cria uma nova instância do WhatsApp.

```javascript
try {
  const newInstance = await manager.create("nova-instancia");
  console.log("Instância criada:", newInstance);
} catch (error) {
  console.error("Erro ao criar instância:", error.message);
}
```

**Parâmetros:**

- `instanceName` (string): Nome para a nova instância

**Retorna:** Promise que resolve com os dados da instância criada

#### `list()`

Lista todas as instâncias disponíveis.

```javascript
try {
  const instances = await manager.list();
  console.log("Instâncias disponíveis:", instances);
} catch (error) {
  console.error("Erro ao listar instâncias:", error.message);
}
```

**Retorna:** Promise que resolve com uma lista de todas as instâncias

## 📝 Exemplo Completo

```javascript
const EvolutionManager = require("evolution-manager");

async function exemploUso() {
  const manager = new EvolutionManager(
    "https://sua-evolution-api.com",
    "seu-api-key"
  );

  try {
    // Listar todas as instâncias
    const todasInstancias = await manager.list();
    console.log("Instâncias existentes:", todasInstancias);

    // Criar uma nova instância
    const novaInstancia = await manager.create("bot-vendas");
    console.log("Nova instância criada:", novaInstancia);

    // Obter informações de uma instância específica
    const instancia = await manager.get("bot-vendas");
    console.log("Detalhes da instância:", instancia);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

exemploUso();
```

## 🛠️ Tratamento de Erros

Todos os métodos podem lançar erros que devem ser tratados:

```javascript
try {
  const instance = await manager.get("instancia-inexistente");
} catch (error) {
  if (error.message.includes("Failed to get instance")) {
    console.log("Instância não encontrada ou erro de conexão");
  }
}
```

## 🧪 Executando Testes

```bash
npm test
```

## 📋 Requisitos

- Node.js >= 14.0.0
- Evolution API configurada e em execução

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [Evolution API Documentation](https://evolution-api.com/docs)
- [GitHub Repository](https://github.com/LeoZanini/evolution-manager)

## ⚠️ Notas Importantes

- Certifique-se de que sua Evolution API esteja em execução e acessível
- Mantenha sua chave de API segura e nunca a exponha em código público
- Teste sempre em ambiente de desenvolvimento antes de usar em produção
