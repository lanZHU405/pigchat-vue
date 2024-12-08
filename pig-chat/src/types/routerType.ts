import { RouteRecordRaw } from 'vue-router';

// 定义你的路由元信息类型
export interface RouteMeta {
  title?: string;
  // 其他元信息属性...
}

// 扩展 RouteRecordRaw 以包含你的路由组件和元信息
export type RouteRecord = RouteRecordRaw & {
  component: any; // 在实际项目中，这里应该是一个具体的组件类型
  meta?: RouteMeta;
};