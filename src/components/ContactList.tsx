import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Loading } from "./ui/Loading";
import type { Contact } from "../types";

interface ContactListProps {
  contacts: Contact[];
  isLoading?: boolean;
  onContactClick?: (contact: Contact) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

const ContactItem = styled.div<{ $theme: any; $clickable: boolean }>`
  padding: 12px;
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius};
  background: ${(props) => props.$theme.colors.background};
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  ${(props) =>
    props.$clickable &&
    `
    &:hover {
      background: ${props.$theme.colors.secondary};
      border-color: ${props.$theme.colors.primary};
    }
  `}
`;

const Avatar = styled.div<{ $theme: any }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.$theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: ${(props) => props.$theme.fonts.primary};
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactName = styled.span<{ $theme: any }>`
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const ContactPhone = styled.span<{ $theme: any }>`
  font-size: 14px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const ContactStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmptyState = styled.div<{ $theme: any }>`
  text-align: center;
  padding: 40px 20px;
  color: ${(props) => props.$theme.colors.textSecondary};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  isLoading = false,
  onContactClick,
}) => {
  const { theme } = useTheme();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatPhone = (phone: string) => {
    // Remove qualquer caractere que não seja número
    const cleaned = phone.replace(/\D/g, "");

    // Aplica formatação brasileira se tiver 11 dígitos
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }

    return phone;
  };

  const getStatusVariant = (isOnline: boolean) => {
    return isOnline ? "success" : "secondary";
  };

  const getStatusText = (isOnline: boolean) => {
    return isOnline ? "Online" : "Offline";
  };

  if (isLoading) {
    return (
      <Card padding="lg">
        <Loading text="Carregando contatos..." />
      </Card>
    );
  }

  if (contacts.length === 0) {
    return (
      <Card padding="lg">
        <EmptyState $theme={theme}>Nenhum contato encontrado</EmptyState>
      </Card>
    );
  }

  return (
    <Card padding="md">
      <Container>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            $theme={theme}
            $clickable={!!onContactClick}
            onClick={() => onContactClick?.(contact)}
          >
            <Avatar $theme={theme}>
              {contact.profilePic ? (
                <img
                  src={contact.profilePic}
                  alt={contact.name}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                getInitials(contact.name)
              )}
            </Avatar>

            <ContactInfo>
              <ContactName $theme={theme}>{contact.name}</ContactName>
              <ContactPhone $theme={theme}>
                {formatPhone(contact.phone)}
              </ContactPhone>
            </ContactInfo>

            <ContactStatus>
              <Badge variant={getStatusVariant(contact.isOnline)} size="sm">
                {getStatusText(contact.isOnline)}
              </Badge>
            </ContactStatus>
          </ContactItem>
        ))}
      </Container>
    </Card>
  );
};
