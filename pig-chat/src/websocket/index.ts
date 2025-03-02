// src/services/WebSocketService.ts
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ChatMessage } from '@/types/AllType';

export interface WebSocketService {
    connect(userId1: string, userId2: string, callback: (message: ChatMessage) => void): Client;
    sendMessage(client: Client, message: ChatMessage): void;
    disconnect(client: Client): void;
}

export const WebSocketService: WebSocketService = {
    connect(userId1: string, userId2: string, callback: (message: ChatMessage) => void): Client {
        const socket = new SockJS('http://localhost:8080/chat'); // 替换为你的 WebSocket 服务地址
        const client = new Client({
            brokerURL: socket.url,
            connectHeaders: {},
            debug: (str: string) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            const channelName = `/topic/chat.${userId1}.${userId2}`;
            client.subscribe(channelName, (message: any) => {
                if (message.body) {
                    const chatMessage = JSON.parse(message.body) as ChatMessage;
                    callback(chatMessage);
                }
            });
        };

        client.activate();
        return client;
    },

    sendMessage(client: Client, message: ChatMessage): void {
        client.publish({
            destination: '/app/chat/send',
            body: JSON.stringify(message),
        });
    },

    disconnect(client: Client): void {
        client.deactivate();
    },
};