import { createRouter,createWebHashHistory } from "vue-router";
import Login from "../view/login/Login.vue";
import Main from "../view/Main.vue";
import TalkView from "@/components/TalkView.vue";
import { RouteRecord } from '../types/routerType';

const routes: RouteRecord[] = [
    {
      path: '/',
      name: 'Login', // 添加 name 属性
      component: Login,
      meta: { title: 'Login' },
    },
    {
      path: '/main',
      name: 'Main', // 添加 name 属性
      component: Main,
      meta: { title: 'Main Page' },
      redirect: { path: '/main/talkView', query: { item: 3 } },
      children: [
        {
          path: 'talkView',
          name: 'TalkView',
          component: TalkView
        }
      ]
    },
    // 其他路由...
  ];

  
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;