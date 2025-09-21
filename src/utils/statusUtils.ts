export const getStatusStyles = (status: string) => {
  switch (status) {
    case "connected":
      return {
        bg: "bg-success-50 dark:bg-success-500/10",
        border: "border-success-500",
        text: "text-success-600 dark:text-success-400",
        badge: "bg-success-500",
      };
    case "connecting":
      return {
        bg: "bg-warning-50 dark:bg-warning-500/10",
        border: "border-warning-500",
        text: "text-warning-600 dark:text-warning-400",
        badge: "bg-warning-500",
      };
    case "disconnected":
      return {
        bg: "bg-danger-50 dark:bg-danger-500/10",
        border: "border-danger-500",
        text: "text-danger-600 dark:text-danger-400",
        badge: "bg-danger-500",
      };
    default:
      return {
        bg: "bg-gray-50 dark:bg-gray-500/10",
        border: "border-gray-500",
        text: "text-gray-600 dark:text-gray-400",
        badge: "bg-gray-500",
      };
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "connected":
      return "Conectado";
    case "connecting":
      return "Conectando";
    case "disconnected":
      return "Desconectado";
    default:
      return "Desconhecido";
  }
};
