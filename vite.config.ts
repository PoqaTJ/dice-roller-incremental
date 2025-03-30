import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'dice-roller-incremental';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : `/${repoName}/`,
}));