import request from "@/api/axios";
import { RequestList, ResponseList, ResponseModel } from "..";
// 表格数据
export interface listItem {
  id: string;
  name: string;
  age: number;
  address: number;
  disabled: boolean;
}

interface ReqList extends RequestList {
  name: string;
}
export function listApi(data: ReqList) {
  return request.get<ResponseList>("/table/list", {
    params: data,
  });
}
