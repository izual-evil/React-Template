import request from "@/api/axios";
export interface LoginReqData {
  account: string;
  password: string;
}

export interface LoginRes {
  token: string;
  name?: string;
}
// 登录
export function loginApi(form: LoginReqData) {
  return request.post<LoginRes>("/login", {
    data: form,
  });
}
// 获取用户信息
export function getUserInfoApi() {
  return request.get("/user/info");
}
// 退出
export function logoutApi() {
  return request.get("/logout");
}
// 权限接口
export function permissionApi() {
  return request.get<string[]>("/user/permission");
}
