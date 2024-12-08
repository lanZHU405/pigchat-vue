import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import vuex from '@/store/store'
import './assets/css/tailwind.css';

createApp(App).
use(router).
use(vuex).
mount('#app')
