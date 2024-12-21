import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import vuex from '@/store/store'
import './assets/css/tailwind.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from '@/utils/request'
import { User, ApiResponse } from '@/types/AllType';

createApp(App).
    use(router).
    use(vuex).
    use(ElementPlus).
    mount('#app')


async function checkTokenValidity(): Promise<boolean> {
    try {
        const response: ApiResponse<User> = await request({
            url: '/user/isLogin',
            method: 'get',
            params: {
              token: localStorage.getItem('token')
            }
          }) as ApiResponse<User>;
      
          if (response.code === 200) {
            localStorage.setItem('user',JSON.stringify(response.data))
            return true;
          } else {
            return false;
          }
    } catch (error) {
        console.error('Error checking token validity:', error);
        return false;
    }
}

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = vuex.getters.isAuthenticated;

    if (to.name === 'Login') {
        console.log(isAuthenticated)
        // 如果是前往登录页面
        if (isAuthenticated) {
            console.log('1111');
            
            // 如果已认证，则检查token是否有效
            const isValid = await checkTokenValidity();
            if (isValid) {
                console.log('2222');
                
                // 如果token有效，跳转到首页
                next({ name: 'Main' });
            } else {
                // 如果token无效，允许访问登录页面
                vuex.dispatch('logout'); // 清除本地token
                next();
            }
        } else {
            // 否则允许访问登录页面
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        // 对于需要认证的路由
        if (!isAuthenticated || !(await checkTokenValidity())) {
            // 如果未认证或token无效，重定向到登录页面
            next({ name: 'Login' });
        } else {
            // 否则继续导航
            next();
        }
    } else {
        // 对于不需要认证的路由，直接通过
        next();
    }
});
