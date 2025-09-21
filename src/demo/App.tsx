import React, { useState } from "react";
import styled from "styled-components";
import {
  ThemeProvider,
  InstanceCard,
  ConnectionStatus,
  QRCodeDisplay,
  MessageList,
  ContactList,
  Button,
  Input,
  Modal,
  useTheme,
  defaultTheme,
  darkTheme,
} from "../index";

const Container = styled.div<{ $theme: any }>`
  min-height: 100vh;
  background: ${(props) => props.$theme.colors.background};
  padding: 20px;
`;

const Header = styled.header<{ $theme: any }>`
  background: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius};
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1<{ $theme: any }>`
  margin: 0;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
`;

const ThemeToggle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
`;

const Section = styled.section<{ $theme: any }>`
  background: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius};
  padding: 20px;
`;

const SectionTitle = styled.h2<{ $theme: any }>`
  margin: 0 0 16px 0;
  color: ${(props) => props.$theme.colors.text};
  font-family: ${(props) => props.$theme.fonts.primary};
  font-size: 18px;
`;

// Dados mock para demonstração
const mockInstance = {
  id: "1",
  name: "Instância Principal",
  status: "connected" as const,
  webhook: "https://webhook.exemplo.com",
  createdAt: new Date("2024-01-15"),
  lastConnection: new Date(),
};

const mockMessages = [
  {
    id: "1",
    from: "5511999999999",
    senderName: "João Silva",
    content: "Olá! Como você está?",
    type: "text" as const,
    timestamp: new Date(),
    instanceId: "1",
  },
  {
    id: "2",
    from: "5511888888888",
    senderName: "Maria Santos",
    content: "Aqui está o documento que você pediu",
    type: "document" as const,
    timestamp: new Date(Date.now() - 30000),
    instanceId: "1",
  },
];

const mockContacts = [
  {
    id: "1",
    name: "João Silva",
    phone: "5511999999999",
    isOnline: true,
    profilePic: "",
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "5511888888888",
    isOnline: false,
    profilePic: "",
  },
];

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  return (
    <Container $theme={theme}>
      <Header $theme={theme}>
        <Title $theme={theme}>Evolution Manager Demo</Title>
        <ThemeToggle>
          <span
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.primary,
            }}
          >
            Tema:
          </span>
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === darkTheme ? "🌞 Claro" : "🌙 Escuro"}
          </Button>
        </ThemeToggle>
      </Header>

      <Grid>
        <Section $theme={theme}>
          <SectionTitle $theme={theme}>Gerenciamento de Instância</SectionTitle>
          <InstanceCard
            instance={mockInstance}
            onConnect={(name) => alert(`Conectando ${name}...`)}
            onDisconnect={(name) => alert(`Desconectando ${name}...`)}
            onDelete={(name) => alert(`Excluindo ${name}...`)}
            onViewQR={() => setShowQR(true)}
          />
        </Section>

        <Section $theme={theme}>
          <SectionTitle $theme={theme}>Status de Conexão</SectionTitle>
          <ConnectionStatus
            status="connected"
            instanceName="Instância Principal"
            lastUpdate={new Date()}
            onReconnect={() => alert("Reconectando...")}
          />
        </Section>

        <Section $theme={theme}>
          <SectionTitle $theme={theme}>Lista de Mensagens</SectionTitle>
          <MessageList
            messages={mockMessages}
            onMessageClick={(message) => alert(`Mensagem: ${message.content}`)}
          />
        </Section>

        <Section $theme={theme}>
          <SectionTitle $theme={theme}>Lista de Contatos</SectionTitle>
          <ContactList
            contacts={mockContacts}
            onContactClick={(contact) => alert(`Contato: ${contact.name}`)}
          />
        </Section>

        <Section $theme={theme}>
          <SectionTitle $theme={theme}>Componentes UI</SectionTitle>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Input
              label="Nome da Instância"
              placeholder="Digite o nome..."
              helperText="Escolha um nome único para sua instância"
            />
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Button variant="primary">Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="danger">Perigo</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
          </div>
        </Section>
      </Grid>

      {/* Modal de exemplo */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Modal de Exemplo"
        size="md"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p
            style={{
              color: theme.colors.text,
              fontFamily: theme.fonts.primary,
            }}
          >
            Este é um exemplo de modal funcionando perfeitamente com o sistema
            de temas!
          </p>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal do QR Code */}
      <Modal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        title="QR Code"
        size="sm"
      >
        <QRCodeDisplay
          qrCode="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          instanceName="Instância Principal"
          onRefresh={() => alert("Atualizando QR Code...")}
        />
      </Modal>
    </Container>
  );
};

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setCurrentTheme((current) =>
      current === defaultTheme ? darkTheme : defaultTheme
    );
  };

  return (
    <ThemeProvider theme={currentTheme} toggleTheme={toggleTheme}>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
