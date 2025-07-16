import request from "@/api/axios";
// 待办事项
export interface TodoItem {
  id: number;
  title: string;
  descriptions: string;
  status: boolean;
}
export function todoListApi() {
  return request.get<{ list: TodoItem[] }>("/todoList");
}
