import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "config";

export default defineConfig({
  root: "./app-frontend",
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __BUILD_TIME__: Date.now(),
  },
  plugins: [react()],
});
