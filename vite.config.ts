import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,  
    cors: true,
    proxy: {
      "/api": {
        target: "https://api.lazyninja.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  plugins: [ react(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}));
