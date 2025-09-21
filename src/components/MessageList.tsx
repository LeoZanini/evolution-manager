import React, { useState, useEffect, useRef } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { Loading } from "./ui/Loading";
import { Button } from "./ui/Button";

interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: Date;
  type: "text" | "image" | "audio" | "video" | "document" | "sticker";
  isFromMe: boolean;
  isRead: boolean;
  messageId: string;
  quotedMessage?: {
    id: string;
    text: string;
    from: string;
  };
  mediaUrl?: string;
  fileName?: string;
  fileSize?: number;
}

interface MessageListProps {
  instanceId: string;
  contactId?: string;
  messages?: Message[];
  loading?: boolean;
  onSendMessage?: (message: string, contactId: string) => void;
  onMessageAction?: (messageId: string, action: string) => void;
  showInput?: boolean;
  autoScroll?: boolean;
  className?: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  instanceId,
  contactId,
  messages = [],
  loading = false,
  onSendMessage,
  onMessageAction,
  showInput = true,
  autoScroll = true,
  className,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  const getMessageTypeVariant = (type: string) => {
    switch (type) {
      case "text":
        return "default";
      case "image":
        return "success";
      case "audio":
        return "warning";
      case "video":
        return "success";
      case "document":
        return "default";
      default:
        return "default";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !contactId || sending) return;

    setSending(true);
    try {
      await onSendMessage?.(newMessage.trim(), contactId);
      setNewMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMessageAction = (messageId: string, action: string) => {
    onMessageAction?.(messageId, action);
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "image":
        return (
          <div className="max-w-xs">
            {message.mediaUrl && (
              <img
                src={message.mediaUrl}
                alt="Imagem"
                className="rounded-lg max-w-full h-auto"
              />
            )}
            {message.text && <p className="mt-2 text-sm">{message.text}</p>}
          </div>
        );

      case "audio":
        return (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="text-2xl">🎵</span>
            <div>
              <p className="text-sm font-medium">Áudio</p>
              {message.fileName && (
                <p className="text-xs text-gray-500">{message.fileName}</p>
              )}
            </div>
          </div>
        );

      case "video":
        return (
          <div className="max-w-xs">
            {message.mediaUrl ? (
              <video
                controls
                className="rounded-lg max-w-full h-auto"
                src={message.mediaUrl}
              />
            ) : (
              <div className="flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl">🎥</span>
                <div>
                  <p className="text-sm font-medium">Vídeo</p>
                  {message.fileName && (
                    <p className="text-xs text-gray-500">{message.fileName}</p>
                  )}
                </div>
              </div>
            )}
            {message.text && <p className="mt-2 text-sm">{message.text}</p>}
          </div>
        );

      case "document":
        return (
          <div className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-xs">
            <span className="text-2xl">📄</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {message.fileName || "Documento"}
              </p>
              {message.fileSize && (
                <p className="text-xs text-gray-500">
                  {formatFileSize(message.fileSize)}
                </p>
              )}
            </div>
          </div>
        );

      case "sticker":
        return (
          <div className="w-24 h-24">
            {message.mediaUrl ? (
              <img
                src={message.mediaUrl}
                alt="Sticker"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">😀</span>
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-sm">{message.text}</p>;
    }
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex justify-center items-center py-8">
          <Loading size="lg" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Carregando mensagens...
          </span>
        </div>
      </Card>
    );
  }

  if (!contactId) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Selecione um contato
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Escolha um contato para ver as mensagens.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`flex flex-col h-96 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mensagens
        </h3>
        <div className="flex items-center space-x-2">
          <Badge variant="default">{instanceId}</Badge>
          <Badge variant="default">{messages.length}</Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📱</div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Nenhuma mensagem ainda
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isFromMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[70%] rounded-lg p-3 relative group
                  ${
                    message.isFromMe
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }
                `}
              >
                {/* Quoted Message */}
                {message.quotedMessage && (
                  <div className="mb-2 p-2 border-l-4 border-gray-300 bg-black/10 rounded text-xs">
                    <p className="font-medium opacity-70">
                      {message.quotedMessage.from}
                    </p>
                    <p className="opacity-70 truncate">
                      {message.quotedMessage.text}
                    </p>
                  </div>
                )}

                {/* Message Content */}
                <div>{renderMessageContent(message)}</div>

                {/* Message Info */}
                <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getMessageTypeVariant(message.type)}>
                      {message.type}
                    </Badge>
                    <span>{formatTime(message.timestamp)}</span>
                  </div>

                  {message.isFromMe && (
                    <span>{message.isRead ? "✓✓" : "✓"}</span>
                  )}
                </div>

                {/* Action Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMessageAction(message.id, "reply")}
                    className="text-xs p-1"
                    title="Responder"
                  >
                    ↩️
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {showInput && contactId && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
              className="flex-1"
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
            >
              {sending ? <Loading size="sm" /> : "📤"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
