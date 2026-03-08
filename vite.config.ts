import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the built files work both on
  // GitHub Pages project URLs and cPanel subdirectories.
  base: './'
});
