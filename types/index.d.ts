export interface InstanceData {
  id: string;
  name: string;
  status: string;
  [key: string]: any;
}

export interface CreateInstanceResponse {
  id: string;
  name: string;
  status: string;
  [key: string]: any;
}

export declare class EvolutionManager {
  constructor(baseUrl: string, apiKey: string);

  get(instanceName: string): Promise<InstanceData>;
  create(instanceName: string): Promise<CreateInstanceResponse>;
  list(): Promise<InstanceData[]>;
}

export default EvolutionManager;
