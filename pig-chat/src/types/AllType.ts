import { AxiosResponse } from 'axios';

export interface User {
    // 根据您的用户信息结构定义属性
    id?: number;
    name?: string;
    // 其他属性...
  }

export interface ApiResponse<T = any> extends AxiosResponse {
    code: number;
    message: string;
    data: T;
  }