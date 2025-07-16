import home from "./en/home";
import system from "./en/system";
import comp from "./en/comp";
import button from "./en/button";
export default {
  button,
  route: {
    login: "Login",
    personal: "Personal Setting",
    dashboard: "Dashboard",
    multimenu: {
      root: "Multi-level navigation",
      page1: "navigation1",
      page2: "navigation2",
      level2: {
        page1: "navigation1-1",
        page2: "navigation1-2",
        level3: {
          page: "navigation1-1-1",
        },
      },
    },
    permission: "permission",
    tabbar: "tabbar",
    directives: {
      root: "directives",
      copy: "copy directive",
      watermarker: "watermarker directive",
    },
    home,
    system,
    comp,
  },
  tabbar: {
    refresh: "refresh",
    delete: "close",
    deleteLeft: "close left",
    deleteRight: "close right",
    deleteOther: "close other",
  },
  login: {
    title: "User Login",
    account: "Account",
    password: "Password",
    loginBtn: "Login",
    accountRequired: "Account is required",
    passwordRquired: "Password is required",
    accountLength: "The length is 3 to 20 characters",
    passwordLength: "The length is 6 to 20 characters",
  },
  personal: {
    personal: "Personal Setting",
    loginOut: "Login Out",
  },
  notfound: {
    title: "Page not found",
    desc: "The page you are looking for does not exist",
    back: "HOME",
  },
  theme: {
    themeChange: "Theme Change",
    logo: "Logo",
    mianNav: "Mian Nav",
    subNav: "Sub Nav",
    tabbar: "Tabbar",
    toolbar: "Toolbar",
    other: "Other",
    mianContentBgColor: "Main Bg Color",

    logoBgColor: "BgColor",
    logoTextColor: "TextColor",

    bgColor: "BgColor",
    activeBgColor: "ActiveBgColor",
    hoverBgColor: "HoverBgColor",
    textColor: "TextColor",
    activeTextColor: "ActiveTextColor",
    hoverTextColor: "HoverTextColor",
  },
  btn: {
    confirm: "confirm",
    cancel: "cancel",
  },
};
