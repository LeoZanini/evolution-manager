import axios from "axios";

class EvolutionManager {
  constructor(baseUrl, apiKey) {
    if (!baseUrl || !apiKey) throw new Error("baseUrl and apiKey are required");
    this.client = axios.create({
      baseURL: baseUrl,
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  async get(instanceName) {
    try {
      const response = await this.client.get(`/instance/${instanceName}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get instance: ${error.message}`);
    }
  }

  async create(instanceName) {
    try {
      const response = await this.client.post("/instance/create", {
        instanceName,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create instance: ${error.message}`);
    }
  }

  async list() {
    try {
      const response = await this.client.get("/instance/list");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to list instances: ${error.message}`);
    }
  }
}

export default EvolutionManager;
