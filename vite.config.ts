import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// GitHub Pages serves a project site under /<repo>/, so the production build
// uses that base path. Dev keeps "/" so `bun dev` works at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/edig-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
