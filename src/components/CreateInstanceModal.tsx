import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Loading } from "./ui/Loading";

interface CreateInstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
  defaultName?: string;
  theme?: "light" | "dark";
}

export const CreateInstanceModal: React.FC<CreateInstanceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultName = "",
  theme = "light",
}) => {
  const [instanceName, setInstanceName] = useState(defaultName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validações baseadas na API Evolution
  const validateInstanceName = (name: string): string | null => {
    const trimmedName = name.trim();

    // Verificar se está vazio
    if (!trimmedName) {
      return "Nome da instância é obrigatório";
    }

    // Verificar comprimento (3-50 caracteres)
    if (trimmedName.length < 3) {
      return "Nome deve ter pelo menos 3 caracteres";
    }

    if (trimmedName.length > 50) {
      return "Nome deve ter no máximo 50 caracteres";
    }

    // Verificar caracteres válidos (apenas letras, números, hífens e underscores)
    const validNamePattern = /^[a-zA-Z0-9_-]+$/;
    if (!validNamePattern.test(trimmedName)) {
      return "Use apenas letras, números, hífens (-) e underscores (_)";
    }

    // Não pode começar ou terminar com hífen ou underscore
    if (
      trimmedName.startsWith("-") ||
      trimmedName.startsWith("_") ||
      trimmedName.endsWith("-") ||
      trimmedName.endsWith("_")
    ) {
      return "Nome não pode começar ou terminar com hífen ou underscore";
    }

    // Não pode ter hífens ou underscores consecutivos
    if (
      trimmedName.includes("--") ||
      trimmedName.includes("__") ||
      trimmedName.includes("-_") ||
      trimmedName.includes("_-")
    ) {
      return "Não use hífens ou underscores consecutivos";
    }

    return null;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setInstanceName(newName);

    // Validação em tempo real
    const error = validateInstanceName(newName);
    setValidationError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateInstanceName(instanceName);
    if (error) {
      setValidationError(error);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(instanceName.trim());
      setInstanceName("");
      setValidationError(null);
      onClose();
    } catch (err) {
      // Manter modal aberto em caso de erro
      console.error("Erro ao criar instância:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = !validationError && instanceName.trim().length >= 3;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      theme={theme}
      className="border-2 dark:border-gray-900 border-gray-300"
    >
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Nova Instância WhatsApp
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Nome da Instância"
              placeholder="ex: minha-instancia-01"
              value={instanceName}
              onChange={handleNameChange}
              helperText={
                validationError ||
                "3-50 caracteres: letras, números, hífens (-) e underscores (_)"
              }
              error={!!validationError}
              required
            />

            {/* Contador de caracteres */}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
              {instanceName.length}/50 caracteres
            </div>

            {/* Exemplo de nome válido */}
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Exemplos válidos:</span>{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">
                minha-empresa
              </code>
              ,{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">
                cliente_01
              </code>
              ,{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">
                suporte-tech
              </code>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isValid || isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? <Loading size="sm" /> : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
