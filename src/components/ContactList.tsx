import React, { useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { Loading } from "./ui/Loading";
import { Button } from "./ui/Button";

interface Contact {
  id: string;
  name: string;
  phone: string;
  profilePicture?: string;
  isOnline: boolean;
  lastSeen?: Date;
  isBlocked?: boolean;
  isGroup?: boolean;
  groupParticipants?: number;
}

interface ContactListProps {
  instanceId: string;
  contacts?: Contact[];
  loading?: boolean;
  onContactSelect?: (contact: Contact) => void;
  onContactAction?: (contactId: string, action: string) => void;
  showSearch?: boolean;
  showActions?: boolean;
  className?: string;
}

export const ContactList: React.FC<ContactListProps> = ({
  instanceId,
  contacts = [],
  loading = false,
  onContactSelect,
  onContactAction,
  showSearch = true,
  showActions = true,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  const getStatusVariant = (isOnline: boolean) => {
    return isOnline ? "success" : "default";
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact.id);
    onContactSelect?.(contact);
  };

  const handleContactAction = (contactId: string, action: string) => {
    onContactAction?.(contactId, action);
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex justify-center items-center py-8">
          <Loading size="lg" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Carregando contatos...
          </span>
        </div>
      </Card>
    );
  }

  if (contacts.length === 0) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum contato encontrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Os contatos aparecerão aqui quando a instância estiver conectada.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Contatos ({contacts.length})
        </h3>
        <Badge variant="default">{instanceId}</Badge>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar contatos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      {/* Contact List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`
              p-3 rounded-lg border border-gray-200 dark:border-gray-700 
              hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors
              ${
                selectedContact === contact.id
                  ? "bg-primary-50 dark:bg-primary-500/10 border-primary-500"
                  : "bg-white dark:bg-gray-800"
              }
            `}
            onClick={() => handleContactClick(contact)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                  {contact.profilePicture ? (
                    <img
                      src={contact.profilePicture}
                      alt={contact.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {contact.name}
                    </h4>
                    {contact.isGroup && (
                      <Badge variant="default">
                        👥 {contact.groupParticipants || 0}
                      </Badge>
                    )}
                    <Badge variant={getStatusVariant(contact.isOnline)}>
                      {contact.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {contact.phone}
                  </p>
                  {contact.lastSeen && !contact.isOnline && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Visto por último: {contact.lastSeen.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              {showActions && (
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactAction(contact.id, "message");
                    }}
                    title="Enviar mensagem"
                  >
                    💬
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactAction(contact.id, "call");
                    }}
                    title="Ligar"
                  >
                    📞
                  </Button>
                  {contact.isBlocked ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactAction(contact.id, "unblock");
                      }}
                      title="Desbloquear"
                    >
                      🔓
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactAction(contact.id, "block");
                      }}
                      title="Bloquear"
                    >
                      🚫
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Results Info */}
      {searchTerm && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {filteredContacts.length} contato(s) encontrado(s)
          </p>
        </div>
      )}
    </Card>
  );
};
