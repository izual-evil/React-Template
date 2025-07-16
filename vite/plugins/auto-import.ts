import AutoImport from "unplugin-auto-import/vite";
import AntdResolver from "unplugin-antd-resolver";
import IconsResolver from "unplugin-icons/resolver";

export default function setupAutoImport() {
  return AutoImport({
    resolvers: [AntdResolver(), IconsResolver()],
    imports: [
      "react",
      "react-router-dom",
      {
        "react-i18next": ["initReactI18next", "useTranslation"],
      },
    ],
    dirs: ["src/components/**"], // 自动导入src/components目录下的所有文件
    dts: "types/auto-imports.d.ts",
  });
}
