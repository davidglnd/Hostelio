import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'frontend',
  build: {
    outDir: '../frontend/dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/index.html'),
        login: resolve(__dirname, 'frontend/pages/login.html'),
        signup: resolve(__dirname, 'frontend/pages/signup.html'),
        dashboard: resolve(__dirname, 'frontend/pages/dashboard.html'),
        expenses: resolve(__dirname, 'frontend/pages/expenses.html'),
        supplier: resolve(__dirname, 'frontend/pages/supplier.html'),
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});