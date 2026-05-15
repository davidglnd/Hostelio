import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'frontend/pages/login.html'),
        signup: resolve(__dirname, 'frontend/pages/signup.html'),
        dashboard: resolve(__dirname, 'frontend/pages/dashboard.html'),
        expenses: resolve(__dirname, 'frontend/pages/expenses.html'),
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