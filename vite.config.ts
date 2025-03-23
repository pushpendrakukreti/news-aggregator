import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/news": {
        target: "https://newsapi.org",
        changeOrigin: true,
        secure: true,
      },
      "/api/guardian": {
        target: "https://content.guardianapis.com",
        changeOrigin: true,
        secure: true,
      },
      "/api/nyt": {
        target: "https://api.nytimes.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
