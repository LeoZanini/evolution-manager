import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuração específica para testes standalone
// Esta configuração usa o arquivo standalone.tsx como entry point
export default defineConfig({
  plugins: [react()],

  // Entry point específico para teste standalone
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "standalone.html"),
      },
    },
  },

  // Configurar o entry point para development
  root: ".",

  // Configurações de desenvolvimento
  server: {
    port: 5174, // Porta diferente para não conflitar
    open: "/standalone.html",
    host: true,
  },

  // Resolver imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // Definir entry point customizado para dev
  define: {
    // Pode ser útil para debugging
    __STANDALONE_MODE__: true,
  },
});
