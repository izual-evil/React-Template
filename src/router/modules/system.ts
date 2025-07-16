import type { RouteObject } from "react-router-dom";

export default {
  meta: {
    title: "route.system.root",
    icon: "ant-design:hdd-filled",
    auth: "menu:system",
  },
  children: [
    {
      path: "/system/user",
      lazy: () => import("@/pages/system/user"),
      meta: {
        title: "route.system.user.list",
        auth: "menu:system:user",
      },
    },
    {
      path: "/system/personal",
      lazy: () => import("@/pages/system/user/personal"),
      meta: {
        title: "personal.personal", // 个人中心
        hideInMenu: true, // 隐藏在菜单中
      },
    },
    {
      path: "/system/role",
      lazy: () => import("@/pages/system/role"),
      meta: {
        title: "route.system.role.list",
        auth: "menu:system:role",
      },
    },
    {
      path: "/system/menu",
      lazy: () => import("@/pages/system/menu"),
      meta: {
        title: "route.system.menu.list",
        auth: "menu:system:menu",
      },
    },
    {
      path: "/system/dict",
      lazy: () => import("@/pages/system/dict"),
      meta: {
        title: "route.system.dict.list",
        auth: "menu:system:dict",
      },
    },
    {
      path: "/system/log",
      lazy: () => import("@/pages/system/log"),
      meta: {
        title: "route.system.log.list",
        auth: "menu:system:log",
      },
    },
  ],
} as RouteObject;
