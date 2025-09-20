const EvolutionManager = require('../src/evolutionManager');

describe('EvolutionManager', () => {
  test('should throw error if baseUrl or apiKey is missing', () => {
    expect(() => new EvolutionManager()).toThrow('baseUrl and apiKey are required');
  });
});