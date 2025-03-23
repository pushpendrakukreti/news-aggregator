import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: mode === "development" ? {
    proxy: {
      "/api/news": {
        target: "https://newsapi.org",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/news/, "/v2/everything"),
      },
      "/api/guardian": {
        target: "https://content.guardianapis.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/guardian/, "/search"),
      },
      "/api/nyt": {
        target: "https://api.nytimes.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/nyt/, "/svc/search/v2/articlesearch.json"),
      },
    },
  } : {},
}));
