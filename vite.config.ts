import { defineConfig, loadEnv } from "vite";
import alias from "./vite/alias";
import setupVitePlugins from "./vite/plugins";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const drop = [];
  if (env.VITE_BUILD_DROP_CONSOLE === "true") drop.push("console");

  if (env.VITE_BUILD_DROP_DEBUGGER === "true") drop.push("debugger");
  return {
    resolve: {
      alias,
    },
    plugins: setupVitePlugins(env, mode, command === "build"),
    base: "./",
    server: {
      port: 9999,
      host: "0.0.0.0",
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY === "true",
          rewrite: (path) => path.replace(/\/proxy/, ""),
        },
      },
    },
    build: {
      outDir: mode === "production" ? "dist" : `dist-${mode}`,
      assetsDir: "assets",
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      esbuild: {
        drop,
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
