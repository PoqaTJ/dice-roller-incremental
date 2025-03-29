import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = '/dice-roller-incremental/'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : `/${repo}/`,
}));
