import home from "./tw/home";
import system from "./tw/system";
import comp from "./tw/comp";
import button from "./tw/button";
export default {
  button,
  route: {
    login: "登錄",
    personal: "個人設置",
    multimenu: {
      root: "多級導航緩存",
      page1: "導航1",
      page2: "導航2",
      level2: {
        page1: "導航1-1",
        page2: "導航1-2",
        level3: {
          page: "導航1-1-1",
        },
      },
    },
    permission: "權限",
    tabbar: "標簽欄",
    directives: {
      root: "自定義指令",
      copy: "複製指令",
      watermarker: "水印指令",
    },
    home,
    system,
    comp,
  },
  tabbar: {
    refresh: "刷新",
    delete: "關閉",
    deleteLeft: "關閉左側",
    deleteRight: "關閉右側",
    deleteOther: "關閉其他",
  },
  login: {
    title: "用戶登錄",
    account: "賬號",
    password: "密碼",
    loginBtn: "登錄",
    accountRule: "用戶名為必填項",
    passwordRule: "密碼不能少於6位",
    accountRequired: "用戶名為必填項",
    passwordRquired: "密碼為必填項",
    accountLength: "長度在3到20個字符",
    passwordLength: "長度在6到20個字符",
  },
  personal: {
    personal: "個人設置",
    loginOut: "退出",
  },
  notfound: {
    title: "未找到頁面",
    desc: "您正在尋找的頁面不存在",
    back: "首頁",
  },
  theme: {
    themeChange: "主題更換",
    logo: "Logo",
    mianNav: "主導航",
    subNav: "側導航",
    tabbar: "導航欄",
    toolbar: "工具欄",
    other: "其他",
    mianContentBgColor: "主區域背景色",

    logoBgColor: "背景色",
    logoTextColor: "文字顏色",

    bgColor: "背景色",
    activeBgColor: "選中背景色",
    hoverBgColor: "鼠標經過背景色",
    textColor: "文字顏色",
    activeTextColor: "選中文字顏色",
    hoverTextColor: "鼠標經過文字颜色",
  },
  btn: {
    confirm: "確定",
    cancel: "取消",
  },
};
