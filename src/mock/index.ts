import Mock from "mockjs";
const list = [
  {
    id: "1",
    name: "张三",
    age: 18,
    address: "北京",
    disabled: false
  },
  {
    id: "2",
    name: "李四",
    age: 20,
    address: "上海",
    disabled: true
  },
  {
    id: "3",
    name: "王五",
    age: 22,
    address: "广州",
    disabled: true
  },
  {
    id: "4",
    name: "赵六",
    age: 24,
    address: "深圳",
    disabled: false
  },
  {
    id: "5",
    name: "孙七",
    age: 26,
    address: "成都",
    disabled: true
  },
  {
    id: "6",
    name: "周八",
    age: 28,
    address: "重庆",
    disabled: true
  },
  {
    id: "7",
    name: "吴九",
    age: 30,
    address: "西安",
    disabled: false
  },
  {
    id: "8",
    name: "郑十",
    age: 32,
    address: "长沙",
    disabled: true
  },
  {
    id: "9",
    name: "钱十一",
    age: 34,
    address: "南京",
    disabled: true
  },
  {
    id: "10",
    name: "孙十二",
    age: 36,
    address: "武汉",
    disabled: false
  },
  {
    id: "11",
    name: "周十三",
    age: 38,
    address: "杭州",
    disabled: true
  }
]
export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }: any) => {
      const { account } = body;
      return {
        code: 200,
        message: "请求成功",
        type: "success",
        data: {
          token: `${account}_${Mock.Random.string(10)}`,
          userName: `${account}`,
          age: 18,
          avatar:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        },
      };
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "请求成功",
        type: "success",
        data: {
          name: "admin",
          age: 18,
          avatar:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        },
      };
    },
  },
  {
    url: "/api/user/permission",
    method: "get",
    response: ({ headers }: any) => {
      return {
        code: 200,
        message: "请求成功",
        type: "success",
        data:
          headers.authorization && headers.authorization.includes("test")
            ? ["menu:home"]
            : [
                "user:personal",
                "menu:home",
                "menu:system",
                "menu:system:user",
                "menu:system:role",
                "menu:system:menu",
                "menu:system:dict",
                "menu:system:log",
                "menu:comp",
                "menu:comp:table",
                "menu:comp:form",
              ],
      };
    },
  },
  {
    url: "/api/todoList",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "请求成功",
        type: "success",
        data: {
          list: [
            {
              id: 1,
              title: "疯狂星期四",
              descriptions:
                "故事太多伤心泪，不如KFC来安慰，V我50，味蕾舞动不疲惫。",
              status: true,
            },
            {
              id: 2,
              title: "挖呀挖呀挖",
              descriptions: "在小小的花园里面挖呀挖呀挖",
              status: false,
            },
            {
              id: 3,
              title: "九转大肠",
              descriptions: "原汁原味，一口爆浆",
              status: false,
            },
            {
              id: 4,
              title: "耗子尾汁",
              descriptions: "年轻人不讲武德，耗子尾汁。",
              status: false,
            },
            {
              id: 5,
              title: "你礼貌吗",
              descriptions: "我问你礼貌吗？我没有扔泥巴。",
              status: false,
            },
            {
              id: 6,
              title: "电子榨菜",
              descriptions: "一边吃饭，一边看剧，极其下饭。",
              status: false,
            },
            {
              id: 7,
              title: "你没事吧",
              descriptions: "你没事吧、你没事吧、你没事吧……没事就吃溜溜梅",
              status: false,
            },
            {
              id: 8,
              title: "要用魔法打败魔法",
              descriptions: "你想和老爹斗斗吗？",
              status: false,
            },
            {
              id: 9,
              title: "真香",
              descriptions: "饿死也不吃农村饭菜！哎呀，真香",
              status: false,
            },
            {
              id: 10,
              title: "鼠鼠我啊",
              descriptions: "鼠鼠我啊，今天又没抢到超市的打折鸡蛋",
              status: false,
            },
          ],
        },
      };
    },
  },
  {
    url: "/api/logout",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "请求成功",
        type: "success",
        data: null,
      };
    },
  },
  {
    url: "/api/table/list",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "请求成功",
        type: "success",
        data: {
          list,
          total: list.length
        }
      }
    }
  }
];
