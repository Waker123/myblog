// todolist的工具类 两个接口
import { Ref } from "vue";
export interface TodoItemType {
    text: string;
    completed: boolean;
}
export interface FilterType {
    all: Ref<Array<Object>>;
    active: Ref<Array<Object>>;
    completed: Ref<Array<Object>>;
}
export interface BlogData {
    id: number,
    title: string,
    content: string
}
export interface vueData {
    name: string,
    imgUrl: string,
    title: string,
    content: string
}