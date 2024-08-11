import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'credit-management-system'), // Point to the React app folder
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'build'), // Output directory for the build files
    rollupOptions: {
      input: path.resolve(__dirname, 'credit-management-system', 'index.html'), // Path to index.html
    },
  },
});
