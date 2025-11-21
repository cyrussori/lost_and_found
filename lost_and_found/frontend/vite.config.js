import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5178,
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
      },
      include: '**/*.svg'
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['tests/**/*.test.jsx'],
  },
});
