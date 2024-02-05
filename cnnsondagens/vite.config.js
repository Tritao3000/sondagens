import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'augusta.labs.widgets1.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'index.css') return 'augusta.labs.styles1.css';
          return assetInfo.name;
        },
      },
    },
  },
});
