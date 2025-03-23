import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "https://newsapi.org",
  changeOrigin: true,
});
