import { TodoItem, todoListApi } from "@/api/modules/home";
export const frameworkList = [
  {
    label: "React",
    value: "react",
    num: 800,
    bg: "#087ea4",
  },
  {
    label: "Vue",
    value: "vue",
    num: 500,
    bg: "#42B883",
  },
  {
    label: "Angular",
    value: "angular",
    num: 100,
    bg: "#e739e8",
  },
];

export const PersonStatictics = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["React", "Vue", "Angular"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["2019", "2020", "2021", "2022", "2023", "2024"],
  },
  yAxis: {
    type: "value",
    name: "人数(万)",
  },
  series: [
    {
      name: "React",
      type: "line",
      data: [750, 920, 1100, 1350, 1580, 1750],
    },
    {
      name: "Vue",
      type: "line",
      data: [280, 410, 530, 620, 700, 780],
    },
    {
      name: "Angular",
      type: "line",
      stack: "Total",
      data: [220, 250, 280, 310, 340, 360],
    },
  ],
};

export const getTodoList = async (): Promise<TodoItem[]> => {
  return new Promise(async (resolve) => {
    const { data } = await todoListApi();
    resolve(data.list);
  });
};
export interface ProjectList {
  name: string;
  desc: string;
  url?: string;
}
// 我的开源项目列表
export const myProjectList: ProjectList[] = [
  {
    name: "Vue-admin-template",
    desc: "route.home.project.vue3",
    url: "https://gitee.com/vinceZ/vue3-template",
  },
  {
    name: "React-admin-template",
    desc: "route.home.project.react",
    url: "https://gitee.com/vinceZ/react",
  },
];

// 本项目支持列表
export const supportList: ProjectList[] = [
  {
    name: "route.home.project.internationalization",
    desc: "route.home.project.interDesc",
  },
  {
    name: "route.home.project.themeChange",
    desc: "route.home.project.themeDesc",
  },
  {
    name: "route.home.project.darkMode",
    desc: "route.home.project.darkDesc",
  },
  {
    name: "route.home.project.accessControl",
    desc: "route.home.project.roleDesc",
  },
];
