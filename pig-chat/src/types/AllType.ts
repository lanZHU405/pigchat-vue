

export interface User {
  // 根据您的用户信息结构定义属性
  id?: number;
  name?: string;
  // 其他属性...
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface Talk {
  // 根据您的用户信息结构定义属性
  senderId?: string;
  receiveId?: string;
  message?: string;
  sendAt?: Date;
  isRead?: boolean;
  messageType?: string;
  replyId?: string;
  // 其他属性...
}

export interface ChatMessage {
  senderId?: string;
  receiverId?: string;
  message?: string;
}

export interface TalkData {
  userId?: string;
  status?: number;
  message?: string;
}