import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Loading } from "./ui/Loading";
import type { Message } from "../types";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onMessageClick?: (message: Message) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

const MessageItem = styled.div<{ $theme: any; $clickable: boolean }>`
  padding: 12px;
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius};
  background: ${(props) => props.$theme.colors.background};
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  transition: all 0.2s ease;

  ${(props) =>
    props.$clickable &&
    `
    &:hover {
      background: ${props.$theme.colors.secondary};
      border-color: ${props.$theme.colors.primary};
    }
  `}
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const SenderName = styled.span<{ $theme: any }>`
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
  flex: 1;
`;

const MessageTime = styled.span<{ $theme: any }>`
  font-size: 12px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const MessageContent = styled.div<{ $theme: any }>`
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
  font-size: 14px;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EmptyState = styled.div<{ $theme: any }>`
  text-align: center;
  padding: 40px 20px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
  onMessageClick,
}) => {
  const { theme } = useTheme();

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageTypeVariant = (type: string) => {
    switch (type) {
      case "text":
        return "primary";
      case "image":
        return "warning";
      case "audio":
        return "success";
      case "video":
        return "secondary";
      default:
        return "primary";
    }
  };

  if (isLoading) {
    return (
      <Card padding="lg">
        <Loading text="Carregando mensagens..." />
      </Card>
    );
  }

  if (messages.length === 0) {
    return (
      <Card padding="lg">
        <EmptyState $theme={theme}>Nenhuma mensagem encontrada</EmptyState>
      </Card>
    );
  }

  return (
    <Card padding="md">
      <Container>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            $theme={theme}
            $clickable={!!onMessageClick}
            onClick={() => onMessageClick?.(message)}
          >
            <MessageHeader>
              <SenderName $theme={theme}>
                {message.senderName || message.from}
              </SenderName>
              <Badge variant={getMessageTypeVariant(message.type)} size="sm">
                {message.type}
              </Badge>
              <MessageTime $theme={theme}>
                {formatTime(message.timestamp)}
              </MessageTime>
            </MessageHeader>
            <MessageContent $theme={theme}>{message.content}</MessageContent>
          </MessageItem>
        ))}
      </Container>
    </Card>
  );
};
