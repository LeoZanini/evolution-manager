const EvolutionManager = require('../src/evolution-manager');
const axios = require('axios');

// Mock do axios
jest.mock('axios');
const mockedAxios = axios;

describe('EvolutionManager', () => {
  let evolutionManager;
  const mockBaseUrl = 'https://api.example.com';
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock axios.create to return a mock client
    mockedAxios.create.mockReturnValue({
      get: jest.fn(),
      post: jest.fn(),
    });
    
    evolutionManager = new EvolutionManager(mockBaseUrl, mockApiKey);
  });

  describe('Constructor', () => {
    test('should throw error if baseUrl is missing', () => {
      expect(() => new EvolutionManager()).toThrow('baseUrl and apiKey are required');
    });

    test('should throw error if apiKey is missing', () => {
      expect(() => new EvolutionManager(mockBaseUrl)).toThrow('baseUrl and apiKey are required');
    });

    test('should create axios client with correct configuration', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: mockBaseUrl,
        headers: { Authorization: `Bearer ${mockApiKey}` },
      });
    });

    test('should create instance successfully with valid parameters', () => {
      expect(() => new EvolutionManager(mockBaseUrl, mockApiKey)).not.toThrow();
    });
  });

  describe('get method', () => {
    test('should get instance successfully', async () => {
      const mockInstanceName = 'test-instance';
      const mockResponse = { data: { id: '123', name: mockInstanceName, status: 'active' } };
      
      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.get(mockInstanceName);

      expect(evolutionManager.client.get).toHaveBeenCalledWith(`/instance/${mockInstanceName}`);
      expect(result).toEqual(mockResponse.data);
    });

    test('should throw error when get instance fails', async () => {
      const mockInstanceName = 'test-instance';
      const mockError = new Error('Network error');
      
      evolutionManager.client.get.mockRejectedValue(mockError);

      await expect(evolutionManager.get(mockInstanceName)).rejects.toThrow('Failed to get instance: Network error');
    });
  });

  describe('create method', () => {
    test('should create instance successfully', async () => {
      const mockInstanceName = 'new-instance';
      const mockResponse = { data: { id: '456', name: mockInstanceName, status: 'created' } };
      
      evolutionManager.client.post.mockResolvedValue(mockResponse);

      const result = await evolutionManager.create(mockInstanceName);

      expect(evolutionManager.client.post).toHaveBeenCalledWith('/instance/create', { instanceName: mockInstanceName });
      expect(result).toEqual(mockResponse.data);
    });

    test('should throw error when create instance fails', async () => {
      const mockInstanceName = 'new-instance';
      const mockError = new Error('Creation failed');
      
      evolutionManager.client.post.mockRejectedValue(mockError);

      await expect(evolutionManager.create(mockInstanceName)).rejects.toThrow('Failed to create instance: Creation failed');
    });
  });

  describe('list method', () => {
    test('should list instances successfully', async () => {
      const mockResponse = { 
        data: [
          { id: '123', name: 'instance1', status: 'active' },
          { id: '456', name: 'instance2', status: 'inactive' }
        ] 
      };
      
      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.list();

      expect(evolutionManager.client.get).toHaveBeenCalledWith('/instance/list');
      expect(result).toEqual(mockResponse.data);
    });

    test('should throw error when list instances fails', async () => {
      const mockError = new Error('List failed');
      
      evolutionManager.client.get.mockRejectedValue(mockError);

      await expect(evolutionManager.list()).rejects.toThrow('Failed to list instances: List failed');
    });

    test('should return empty array when no instances exist', async () => {
      const mockResponse = { data: [] };
      
      evolutionManager.client.get.mockResolvedValue(mockResponse);

      const result = await evolutionManager.list();

      expect(result).toEqual([]);
    });
  });

  describe('Error handling', () => {
    test('should handle axios errors with response data', async () => {
      const axiosError = {
        response: {
          data: { message: 'Instance not found' },
          status: 404
        },
        message: 'Request failed with status code 404'
      };
      
      evolutionManager.client.get.mockRejectedValue(axiosError);

      await expect(evolutionManager.get('nonexistent')).rejects.toThrow('Failed to get instance: Request failed with status code 404');
    });

    test('should handle network errors', async () => {
      const networkError = new Error('ECONNREFUSED');
      
      evolutionManager.client.get.mockRejectedValue(networkError);

      await expect(evolutionManager.list()).rejects.toThrow('Failed to list instances: ECONNREFUSED');
    });
  });
});