import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxyTarget = env.VITE_API_PROXY_TARGET;

  return {
    plugins: [react()],

    // 只有本地配置了后端地址，才启用 Vite 开发代理
    server: apiProxyTarget
      ? {
          proxy: {
            "/api": {
              target: apiProxyTarget,
              changeOrigin: true,
            },
          },
        }
      : undefined,
  };
});