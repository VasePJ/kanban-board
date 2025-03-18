/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';


export default defineConfig({
  plugins: [vue()],
   test: { 
    globals: true,
    server: {
      deps: {
      inline: ['vuetify']
    },
    },
    environment: 'jsdom', 
    testTransformMode: {
      web: ['.vue'], 
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  
});
