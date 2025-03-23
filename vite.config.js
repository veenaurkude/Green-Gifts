// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.10:8082', // Backend URL
        changeOrigin: true,                 // Ensures the host header matches the target
        secure: false,                      // Ignore SSL issues (useful for development)
      },
    },
  },
});
