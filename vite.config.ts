import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr()
  ],
  
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 8080, 
    allowedHosts: [
      "diplomfrontendlawly-production.up.railway.app",
    ],
  },

  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 8080, 
    allowedHosts: [
      "diplomfrontendlawly-production.up.railway.app",
    ],
  }
})