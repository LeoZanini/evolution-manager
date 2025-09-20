import { EvolutionManager } from "../src/evolution-manager.js";
import axios from "axios";

// Mock do axios para ES modules
jest.mock("axios");
const mockedAxios = axios;

describe("EvolutionManager", () => {
  let evolutionManager;
  const mockBaseUrl = "https://api.example.com";
  const mockApiKey = "test-api-key";

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock axios.create to return a mock client
    mockedAxios.create.mockReturnValue({
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    });

    evolutionManager = new EvolutionManager(mockBaseUrl, mockApiKey);
  });

  describe("Constructor", () => {
    test("should throw error if baseUrl is missing", () => {
      expect(() => new EvolutionManager()).toThrow(
        "baseUrl and apiKey are required"
      );
    });

    test("should throw error if apiKey is missing", () => {
      expect(() => new EvolutionManager(mockBaseUrl)).toThrow(
        "baseUrl and apiKey are required"
      );
    });

    test("should create axios client with correct configuration", () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: mockBaseUrl,
        headers: {
          apikey: mockApiKey,
          "Content-Type": "application/json",
        },
      });
    });

    test("should create instance successfully with valid parameters", () => {
      expect(() => new EvolutionManager(mockBaseUrl, mockApiKey)).not.toThrow();
    });

    test("should remove trailing slash from baseUrl", () => {
      const manager = new EvolutionManager("https://example.com/", mockApiKey);
      expect(manager.baseUrl).toBe("https://example.com");
    });
  });

  describe("getInstance method", () => {
    test("should get instance successfully", async () => {
      const mockInstanceName = "test-instance";
      const mockInstances = [
        { id: "123", name: mockInstanceName, connectionStatus: "open" },
        { id: "456", name: "other-instance", connectionStatus: "close" },
      ];
      const mockResponse = { data: mockInstances };

      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.getInstance(mockInstanceName);

      expect(evolutionManager.client.get).toHaveBeenCalledWith(
        "/instance/fetchInstances"
      );
      expect(result).toEqual(mockInstances[0]);
    });

    test("should throw error when instance not found", async () => {
      const mockInstanceName = "nonexistent-instance";
      const mockResponse = { data: [] };

      evolutionManager.client.get.mockResolvedValue(mockResponse);

      await expect(
        evolutionManager.getInstance(mockInstanceName)
      ).rejects.toThrow("Instance 'nonexistent-instance' not found");
    });

    test("should throw error when API call fails", async () => {
      const mockInstanceName = "test-instance";
      const mockError = new Error("Network error");

      evolutionManager.client.get.mockRejectedValue(mockError);

      await expect(
        evolutionManager.getInstance(mockInstanceName)
      ).rejects.toThrow("Failed to get instance: Network error");
    });
  });

  describe("createInstance method", () => {
    test("should create instance successfully with default integration", async () => {
      const mockInstanceName = "new-instance";
      const mockResponse = {
        data: {
          instance: {
            instanceName: mockInstanceName,
            instanceId: "456",
            status: "created",
          },
          hash: "test-hash",
        },
      };

      evolutionManager.client.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.createInstance(mockInstanceName);

      expect(evolutionManager.client.post).toHaveBeenCalledWith(
        "/instance/create",
        {
          instanceName: mockInstanceName,
          integration: "WHATSAPP-BAILEYS",
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    test("should create instance with custom integration", async () => {
      const mockInstanceName = "new-instance";
      const customIntegration = "WHATSAPP-WEB-JS";
      const mockResponse = {
        data: {
          instance: {
            instanceName: mockInstanceName,
            instanceId: "456",
            status: "created",
          },
          hash: "test-hash",
        },
      };

      evolutionManager.client.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.createInstance(
        mockInstanceName,
        customIntegration
      );

      expect(evolutionManager.client.post).toHaveBeenCalledWith(
        "/instance/create",
        {
          instanceName: mockInstanceName,
          integration: customIntegration,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    test("should throw error when create instance fails", async () => {
      const mockInstanceName = "new-instance";
      const mockError = new Error("Creation failed");

      evolutionManager.client.post.mockRejectedValue(mockError);

      await expect(
        evolutionManager.createInstance(mockInstanceName)
      ).rejects.toThrow("Failed to create instance: Creation failed");
    });
  });

  describe("listInstances method", () => {
    test("should list instances successfully", async () => {
      const mockResponse = {
        data: [
          { id: "123", name: "instance1", connectionStatus: "open" },
          { id: "456", name: "instance2", connectionStatus: "close" },
        ],
      };

      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.listInstances();

      expect(evolutionManager.client.get).toHaveBeenCalledWith(
        "/instance/fetchInstances"
      );
      expect(result).toEqual(mockResponse.data);
    });

    test("should throw error when list instances fails", async () => {
      const mockError = new Error("List failed");

      evolutionManager.client.get.mockRejectedValue(mockError);

      await expect(evolutionManager.listInstances()).rejects.toThrow(
        "Failed to list instances: List failed"
      );
    });

    test("should return empty array when no instances exist", async () => {
      const mockResponse = { data: [] };

      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.listInstances();

      expect(result).toEqual([]);
    });
  });

  describe("connectInstance method", () => {
    test("should connect instance successfully", async () => {
      const mockInstanceName = "test-instance";
      const mockResponse = {
        data: { code: "qr-code-data", base64: "base64-image" },
      };

      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.connectInstance(mockInstanceName);

      expect(evolutionManager.client.get).toHaveBeenCalledWith(
        `/instance/connect/${mockInstanceName}`
      );
      expect(result).toEqual(mockResponse.data);
    });

    test("should throw error when connect fails", async () => {
      const mockInstanceName = "test-instance";
      const mockError = new Error("Connection failed");

      evolutionManager.client.get.mockRejectedValue(mockError);

      await expect(
        evolutionManager.connectInstance(mockInstanceName)
      ).rejects.toThrow("Failed to connect instance: Connection failed");
    });
  });

  describe("sendMessage method", () => {
    test("should send message successfully", async () => {
      const mockInstanceName = "test-instance";
      const mockNumber = "5511999999999";
      const mockMessage = "Hello World";
      const mockResponse = {
        data: {
          key: { remoteJid: mockNumber, fromMe: true, id: "msg-id" },
          status: "sent",
        },
      };

      evolutionManager.client.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.sendMessage(
        mockInstanceName,
        mockNumber,
        mockMessage
      );

      expect(evolutionManager.client.post).toHaveBeenCalledWith(
        `/message/sendText/${mockInstanceName}`,
        {
          number: mockNumber,
          text: mockMessage,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    test("should throw error when send message fails", async () => {
      const mockError = new Error("Send failed");

      evolutionManager.client.post.mockRejectedValue(mockError);

      await expect(
        evolutionManager.sendMessage("instance", "123", "message")
      ).rejects.toThrow("Failed to send message: Send failed");
    });
  });

  describe("Legacy methods", () => {
    test("get method should call getInstance", async () => {
      const spy = jest
        .spyOn(evolutionManager, "getInstance")
        .mockResolvedValue({ name: "test" });

      await evolutionManager.get("test-instance");

      expect(spy).toHaveBeenCalledWith("test-instance");
    });

    test("create method should call createInstance", async () => {
      const spy = jest
        .spyOn(evolutionManager, "createInstance")
        .mockResolvedValue({ instance: {} });

      await evolutionManager.create("test-instance", "WHATSAPP-BAILEYS");

      expect(spy).toHaveBeenCalledWith("test-instance", "WHATSAPP-BAILEYS");
    });

    test("list method should call listInstances", async () => {
      const spy = jest
        .spyOn(evolutionManager, "listInstances")
        .mockResolvedValue([]);

      await evolutionManager.list();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Error handling", () => {
    test("should handle axios errors with response data", async () => {
      const axiosError = {
        response: {
          data: { message: "Instance not found" },
          status: 404,
        },
        message: "Request failed with status code 404",
      };

      evolutionManager.client.get.mockRejectedValue(axiosError);

      await expect(evolutionManager.listInstances()).rejects.toThrow(
        "Failed to list instances: Request failed with status code 404"
      );
    });

    test("should handle network errors", async () => {
      const networkError = new Error("ECONNREFUSED");

      evolutionManager.client.get.mockRejectedValue(networkError);

      await expect(evolutionManager.getApiStatus()).rejects.toThrow(
        "Failed to get API status: ECONNREFUSED"
      );
    });
  });
});
