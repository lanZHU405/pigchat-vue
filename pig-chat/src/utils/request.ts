import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const service = axios.create({
  baseURL: 'http://localhost:8008/',
  timeout: 30 * 1000,
});

service.interceptors.request.use((config) => {
  // 假设你有一个方法来获取token，这里需要确保user接口的正确类型
  const token = localStorage.getItem('token');
  
  if (token && token !== 'undefined') {
    config.headers['token'] = token;
  }
  return config;
});

service.interceptors.response.use((response) => {
  let res = response.data;
  if (typeof res === 'string') {
    res = res ? JSON.parse(res) : res;
  }

  if (res.code === 401) {
    router.push('/');
  }

  return res;
}, (error) => {
  console.log('response error:', error);
  return Promise.reject(error);
});

interface RequestOptions {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  data?: any;
  params?: any;
  headers?: any;
  // 添加其他需要的属性
}

function request(options: RequestOptions) {
  return service(options);
}

export default request;