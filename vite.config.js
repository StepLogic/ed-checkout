import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginFonts } from "vite-plugin-fonts";
import path from "node:path";
// https://vitejs.dev/config/

export default defineConfig({
  // base: "/user/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils/Utils.js"),
      "@dashboardUtils": path.resolve(__dirname, "./src/pages/utils"),
      "@layouts": path.resolve(__dirname, "./src/layouts/default"),
      "@font": path.resolve(__dirname, "./src/assets/font/"),
    },
  },
  plugins: [
    react({
      // fastRefresh: false
    }),
    VitePluginFonts({
      google: {
        families: ["Poppins"],
      },
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
