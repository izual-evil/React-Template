import type { RouteObject } from "react-router-dom";

export default {
  meta: {
    title: "route.comp.root",
    icon: "ant-design:hdd-filled",
    auth: "menu:comp",
  },
  children: [
    {
      path: "/comp/table",
      lazy: () => import("@/pages/comp/table"),
      meta: {
        title: "route.comp.table.title",
        auth: "menu:comp:table",
      },
    },
    {
      path: "/comp/form",
      lazy: () => import("@/pages/comp/form"),
      meta: {
        title: "route.comp.form.title",
        auth: "menu:comp:form",
      },
    },
  ],
} as RouteObject;
