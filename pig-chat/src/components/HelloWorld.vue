<template>
  <div>
    <!-- Your HTML code here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.connect();
  },
  methods: {
    connect() {
      this.socket = new WebSocket('ws://localhost:8008/ws'); // 根据实际情况调整URL

      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
        this.socket.send(JSON.stringify({ message: 'Hello, Server!' }));
      };

      this.socket.onmessage = (event) => {
        console.log('Message from server:', event.data);
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    },
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    },
  },
  beforeDestroy() {
    this.disconnect(); // 确保在组件销毁前断开连接
  }
}
</script>