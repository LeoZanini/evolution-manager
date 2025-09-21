import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLibMode = mode === "lib";

  return {
    plugins: [react(), ...(isLibMode ? [dts({ include: ["src"] })] : [])],
    ...(isLibMode
      ? {
          build: {
            lib: {
              entry: resolve(__dirname, "src/index.ts"),
              name: "EvolutionManager",
              formats: ["es"],
              fileName: "index",
            },
            rollupOptions: {
              external: ["react", "react-dom", "react/jsx-runtime"],
              output: {
                globals: {
                  react: "React",
                  "react-dom": "ReactDOM",
                  "react/jsx-runtime": "react/jsx-runtime",
                },
              },
            },
          },
        }
      : {
          // Configuração para dev/build do demo
          build: {
            outDir: "dist-demo",
            emptyOutDir: true,
          },
        }),
  };
});
