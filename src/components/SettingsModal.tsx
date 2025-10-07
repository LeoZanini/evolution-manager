import React from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { InstanceSettings } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  instanceName: string;
  settings: InstanceSettings;
  onSettingsChange: (settings: InstanceSettings) => void;
  onSave: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  instanceName,
  settings,
  onSettingsChange,
  onSave,
}) => {
  const handleSettingChange = (
    key: keyof InstanceSettings,
    value: boolean | string
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const settingsConfig = [
    { key: "rejectCall", label: "Auto-rejeitar chamadas" },
    { key: "groupsIgnore", label: "Ignorar mensagens de grupo" },
    { key: "alwaysOnline", label: "Sempre mostrar como online" },
    { key: "readMessages", label: "Auto-ler mensagens" },
    { key: "readStatus", label: "Auto-ler atualizações de status" },
    { key: "syncFullHistory", label: "Sincronizar histórico completo" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text mb-4">
          Configurações: {instanceName}
        </h3>

        <div className="space-y-4">
          {settingsConfig.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={key}
                checked={settings[key as keyof InstanceSettings] as boolean}
                onChange={(e) =>
                  handleSettingChange(
                    key as keyof InstanceSettings,
                    e.target.checked
                  )
                }
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
              />
              <label
                htmlFor={key}
                className="text-sm text-text cursor-pointer select-none"
              >
                {label}
              </label>
            </div>
          ))}

          {settings.rejectCall && (
            <div className="mt-4">
              <Input
                label="Mensagem ao rejeitar chamadas"
                value={settings.msgCall}
                onChange={(e) => handleSettingChange("msgCall", e.target.value)}
                placeholder="Digite a mensagem..."
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-6 border-t border-border mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSave}>
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
