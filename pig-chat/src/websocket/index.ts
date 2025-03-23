// src/services/WebSocketService.ts
import { ChatMessage } from '@/types/AllType';
// websocket.service.ts


export class WebSocketService {
    private socket: WebSocket | null = null;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5; // 最大重连次数
    private reconnectInterval: number = 3000; // 重连间隔（毫秒）

    constructor(private url: string) { }

    // 连接到 WebSocket 服务器
    public connect(): void {
        if (!this.socket) {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log('WebSocket connection opened');
                this.reconnectAttempts = 0; // 重连成功后重置重连次数
            };

            this.socket.onmessage = (event: MessageEvent) => {
                this.handleMessage(event);
            };

            this.socket.onclose = () => {
                console.log('WebSocket connection closed');
                this.reconnect();
            };

            this.socket.onerror = (error: Event) => {
                console.error('WebSocket error:', error);
            };
        }
    }

    // 发送消息
    public sendMessage(message: ChatMessage): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected or not ready to send messages');
        }
    }

    // 断开连接
    public disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    // 重新连接
    private reconnect(): void {
        this.reconnectAttempts++;
        if (this.reconnectAttempts <= this.maxReconnectAttempts) {
            console.log(`Reconnecting WebSocket... Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
            setTimeout(() => {
                this.connect();
            }, this.reconnectInterval);
        } else {
            console.error('Max reconnect attempts reached. Giving up.');
        }
    }

    // 处理接收到的消息
    private handleMessage(event: MessageEvent): void {
        try {
            const data = JSON.parse(event.data.toString());
            console.log('Message from server:', data);
            // 在这里可以添加自定义的逻辑来处理接收到的消息
        } catch (error) {
            console.error('Error parsing message from server:', error);
        }
    }
}