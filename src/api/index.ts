import { AxiosRequestConfig } from "axios";
// 返回结构
export interface ResponseModel<T = any> {
  type: string;
  message: string | null;
  code: number | string;
  data: T;
}
// 上传文件
export interface UploadFileItemModel {
  name: string;
  value: string | Blob;
}

// 分页请求
export interface RequestList {
  current: number;
  pageSize: number;
  total: number;
}
/**
 * customize your uploadRequestConfig
 */
export type UploadRequestConfig = Omit<AxiosRequestConfig, "url" | "data">;

// 返回表格数据时的结构
export interface ResponseList<T = any> {
  list: T[];
  total: number;
}
