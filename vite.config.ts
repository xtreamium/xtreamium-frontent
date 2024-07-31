import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
