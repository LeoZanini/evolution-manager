import EvolutionManager from "../evolution-manager.mjs";

export class NextEvolutionAPI {
  constructor(baseUrl, apiKey) {
    this.manager = new EvolutionManager(baseUrl, apiKey);
  }

  // Wrapper para API Routes do Next.js
  async handleRequest(req, res, action) {
    try {
      let result;

      switch (action) {
        case "GET":
          const { instanceName } = req.query;
          if (!instanceName) {
            return res.status(400).json({ error: "instanceName is required" });
          }
          result = await this.manager.get(instanceName);
          break;

        case "POST":
          const { instanceName: createName } = req.body;
          if (!createName) {
            return res.status(400).json({ error: "instanceName is required" });
          }
          result = await this.manager.create(createName);
          break;

        case "LIST":
          result = await this.manager.list();
          break;

        default:
          return res.status(405).json({ error: "Method not allowed" });
      }

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Evolution API Error:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Métodos específicos para diferentes rotas
  async getInstance(req, res) {
    return this.handleRequest(req, res, "GET");
  }

  async createInstance(req, res) {
    return this.handleRequest(req, res, "POST");
  }

  async listInstances(req, res) {
    return this.handleRequest(req, res, "LIST");
  }
}

export default NextEvolutionAPI;
