import { describe, it, expect, beforeEach, vi } from "vitest";
import EvolutionManager from "../src/hooks/EvolutionManager";
import axios from "axios";

// Mock do axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios);

describe("EvolutionManager", () => {
  let evolutionManager;
  const mockBaseUrl = "https://api.example.com";
  const mockApiKey = "test-api-key";

  // Mock client
  const mockClient = {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock axios.create
    mockedAxios.create.mockReturnValue(mockClient);

    evolutionManager = new EvolutionManager(mockBaseUrl, mockApiKey);
  });

  describe("Constructor", () => {
    it("should throw error if baseUrl is missing", () => {
      expect(() => new EvolutionManager()).toThrow(
        "baseUrl and apiKey are required"
      );
    });

    it("should throw error if apiKey is missing", () => {
      expect(() => new EvolutionManager(mockBaseUrl)).toThrow(
        "baseUrl and apiKey are required"
      );
    });

    it("should create axios client with correct configuration", () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: mockBaseUrl,
        headers: {
          apikey: mockApiKey,
          "Content-Type": "application/json",
        },
      });
    });

    it("should remove trailing slash from baseUrl", () => {
      new EvolutionManager("https://example.com/", mockApiKey);
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: "https://example.com",
        headers: {
          apikey: mockApiKey,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getInstance", () => {
    it("should get instance successfully", async () => {
      const mockInstanceName = "test-instance";
      const mockInstances = [
        {
          name: mockInstanceName,
          status: "connected",
          integration: "WHATSAPP-BAILEYS",
        },
        {
          name: "other-instance",
          status: "disconnected",
          integration: "WHATSAPP-BAILEYS",
        },
      ];

      mockClient.get.mockResolvedValue({ data: mockInstances });

      const result = await evolutionManager.getInstance(mockInstanceName);

      expect(mockClient.get).toHaveBeenCalledWith("/instance/fetchInstances");
      expect(result).toEqual(mockInstances[0]);
    });

    it("should throw error when instance not found", async () => {
      mockClient.get.mockResolvedValue({ data: [] });

      await expect(evolutionManager.getInstance("nonexistent")).rejects.toThrow(
        "Instance 'nonexistent' not found"
      );
    });
  });

  describe("createInstance", () => {
    it("should create instance with default integration", async () => {
      const mockResponse = {
        data: { status: "success", instanceName: "test" },
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.createInstance("test");

      expect(mockClient.post).toHaveBeenCalledWith("/instance/create", {
        instanceName: "test",
        integration: "WHATSAPP-BAILEYS",
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should create instance with custom integration", async () => {
      const mockResponse = { data: { status: "success" } };
      mockClient.post.mockResolvedValue(mockResponse);

      await evolutionManager.createInstance("test", "CUSTOM-INTEGRATION");

      expect(mockClient.post).toHaveBeenCalledWith("/instance/create", {
        instanceName: "test",
        integration: "CUSTOM-INTEGRATION",
      });
    });
  });

  describe("listInstances", () => {
    it("should list all instances", async () => {
      const mockInstances = [
        {
          name: "instance1",
          status: "connected",
          integration: "WHATSAPP-BAILEYS",
        },
        {
          name: "instance2",
          status: "disconnected",
          integration: "WHATSAPP-BAILEYS",
        },
      ];

      mockClient.get.mockResolvedValue({ data: mockInstances });

      const result = await evolutionManager.listInstances();

      expect(mockClient.get).toHaveBeenCalledWith("/instance/fetchInstances");
      expect(result).toEqual(mockInstances);
    });
  });

  describe("connectInstance", () => {
    it("should connect instance and return QR data", async () => {
      const mockResponse = {
        data: { qrcode: "base64-qr-code", status: "qrcode" },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.connectInstance("test");

      expect(mockClient.get).toHaveBeenCalledWith("/instance/connect/test");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("sendMessage", () => {
    it("should send text message successfully", async () => {
      const mockResponse = { data: { key: { id: "msg-123" }, status: "sent" } };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.sendMessage(
        "test",
        "5511999999999",
        "Hello"
      );

      expect(mockClient.post).toHaveBeenCalledWith("/message/sendText/test", {
        number: "5511999999999",
        text: "Hello",
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("sendMedia", () => {
    it("should send media successfully", async () => {
      const mockResponse = {
        data: { key: { id: "media-123" }, status: "sent" },
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.sendMedia(
        "test",
        "5511999999999",
        "https://example.com/image.jpg",
        "image",
        "Caption"
      );

      expect(mockClient.post).toHaveBeenCalledWith("/message/sendMedia/test", {
        number: "5511999999999",
        mediatype: "image",
        media: "https://example.com/image.jpg",
        caption: "Caption",
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("deleteInstance", () => {
    it("should delete instance successfully", async () => {
      const mockResponse = {
        data: { status: "success", message: "Instance deleted" },
      };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await evolutionManager.deleteInstance("test");

      expect(mockClient.delete).toHaveBeenCalledWith("/instance/delete/test");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("disconnectInstance", () => {
    it("should disconnect instance successfully", async () => {
      const mockResponse = {
        data: { status: "success", message: "Instance disconnected" },
      };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await evolutionManager.disconnectInstance("test");

      expect(mockClient.delete).toHaveBeenCalledWith("/instance/logout/test");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getProfile", () => {
    it("should get instance profile", async () => {
      const mockResponse = {
        data: { name: "User Name", profilePic: "base64-image" },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.getProfile("test");

      expect(mockClient.get).toHaveBeenCalledWith("/chat/fetchProfile/test");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("Legacy methods", () => {
    it("should call getInstance when using get method", async () => {
      const spy = vi
        .spyOn(evolutionManager, "getInstance")
        .mockResolvedValue({ name: "test" });

      await evolutionManager.get("test");

      expect(spy).toHaveBeenCalledWith("test");
    });

    it("should call createInstance when using create method", async () => {
      const spy = vi
        .spyOn(evolutionManager, "createInstance")
        .mockResolvedValue({ status: "success" });

      await evolutionManager.create("test", "WHATSAPP-BAILEYS");

      expect(spy).toHaveBeenCalledWith("test", "WHATSAPP-BAILEYS");
    });
  });

  describe("Error handling", () => {
    it("should handle API errors properly", async () => {
      const error = new Error("Network error");
      mockClient.get.mockRejectedValue(error);

      await expect(evolutionManager.listInstances()).rejects.toThrow(
        "Failed to list instances: Network error"
      );
    });
  });
});
