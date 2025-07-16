import { viteMockServe } from "vite-plugin-mock";

export default function setupMock(isBuild: boolean) {
  return viteMockServe({
    mockPath: "src/mock", // mock文件夹路径
  });
}
