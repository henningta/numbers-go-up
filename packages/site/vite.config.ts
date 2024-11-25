import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['events'],
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
});
