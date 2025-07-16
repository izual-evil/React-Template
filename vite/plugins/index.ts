import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import type { PluginOption } from "vite";
import setupMock from "./mock"; // mock插件
import setupAutoImport from "./auto-import"; // 自动导入插件
import setupSvgIcon from "./svg-icon"; // svg图标插件
import setupIcons from "./icon"; // 自定义图标插件
import setupCompression from "./compression"; // 压缩插件

export default function setupVitePlugins(
  viteEnv: Record<string, string>,
  mode: string,
  isBuild: boolean,
) {
  const { VITE_BUILD_COMPRESS } = viteEnv;
  console.log(VITE_BUILD_COMPRESS, "===VITE_BUILD_COMPRESS");

  const plugins: PluginOption[] = [react(), UnoCSS()];
  plugins.push(setupAutoImport());
  plugins.push(setupIcons());
  plugins.push(setupSvgIcon(isBuild));
  if (isBuild) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip") || compressList.includes("brotli"))
      plugins.push(...setupCompression(viteEnv));
  }

  if (mode === "mock") plugins.push(setupMock(isBuild));
  return plugins;
}
