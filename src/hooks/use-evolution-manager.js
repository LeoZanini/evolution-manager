import { useState, useEffect, useCallback } from "react";
import EvolutionManager from "../evolution-manager.mjs";

export const useEvolutionManager = (baseUrl, apiKey) => {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (baseUrl && apiKey) {
      setManager(new EvolutionManager(baseUrl, apiKey));
    }
  }, [baseUrl, apiKey]);

  const executeAction = useCallback(
    async (action) => {
      if (!manager) {
        setError(new Error("EvolutionManager not initialized"));
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await action(manager);
        return result;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  const getInstance = useCallback(
    (instanceName) => {
      return executeAction((mgr) => mgr.get(instanceName));
    },
    [executeAction]
  );

  const createInstance = useCallback(
    (instanceName) => {
      return executeAction((mgr) => mgr.create(instanceName));
    },
    [executeAction]
  );

  const listInstances = useCallback(() => {
    return executeAction((mgr) => mgr.list());
  }, [executeAction]);

  return {
    manager,
    loading,
    error,
    getInstance,
    createInstance,
    listInstances,
  };
};

export default useEvolutionManager;
