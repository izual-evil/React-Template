import type { IPrivateRoutes } from "types/router";
import type { RouteObject } from "react-router-dom";
import systemRoutes from "./modules/system";
import comRoutes from "./modules/comp";
export const privateRoutes: IPrivateRoutes[] = [
  {
    title: "系统设置",
    icon: "ant-design:setting-outlined",
    children: [systemRoutes],
  },
  {
    title: "组件",
    icon: "ant-design:setting-outlined",
    children: [comRoutes],
  },
];

function addPrivateChildrenIndex(
  privateChildrenRoutes: RouteObject[],
  parentIndex: number,
) {
  privateChildrenRoutes.forEach((item) => {
    item.parentIndex = parentIndex;
    if (item.children?.length)
      addPrivateChildrenIndex(item.children, item.parentIndex);
  });
}

function allPrivateChildrenRoutes() {
  privateRoutes.forEach((item, i) => {
    item.parentIndex = i;
    if (item.children?.length)
      addPrivateChildrenIndex(item.children, item.parentIndex);
  });

  return privateRoutes.map((item) => item.children).flat();
}

export default allPrivateChildrenRoutes();
