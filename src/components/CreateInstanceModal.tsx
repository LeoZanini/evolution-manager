import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Loading } from "./ui/Loading";

interface CreateInstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
  defaultName?: string;
}

export const CreateInstanceModal: React.FC<CreateInstanceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultName = "",
}) => {
  const [instanceName, setInstanceName] = useState(defaultName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instanceName.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(instanceName.trim());
      setInstanceName("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="max-w-md p-0">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Nova Instância WhatsApp
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome da Instância"
              placeholder="ex: minha-instancia"
              value={instanceName}
              onChange={(e) => setInstanceName(e.target.value)}
              helperText="Use apenas letras, números, hífens e underscores"
              required
            />

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
                disabled={!instanceName.trim() || isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? <Loading size="sm" /> : "Criar"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Modal>
  );
};
