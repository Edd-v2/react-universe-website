import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Questo consente l'accesso da altri dispositivi
    port: 5173   // Porta di default di Vite
  }
})
