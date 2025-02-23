import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/components/Profile",
        "./ProfileWidget": "./src/components/ProfileWidget",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 9003,
  },
  preview: {
    port: 9003,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
