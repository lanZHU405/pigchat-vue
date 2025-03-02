<template>
    <div class="login-body">
        <h1 class="login-title">LOGIN</h1>
        <div class="login-box">
            <input v-model="form.username" class="login-input1" name="username" placeholder="请输入用户名" type="text" />
            <input v-model="form.password" class="login-input2" name="password" placeholder="请输入密码" type="password" />
            <button class="login-button" @click="loginEvent">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { login } from '@/api/user';
import { ref, reactive, onMounted } from 'vue';

const router = useRouter();

interface LoginForm {
    username: string;
    password: string;
}

const form = reactive<LoginForm>({
    username: '',
    password: ''
});

function loginEvent() {
    login(form).then(res => {
        if (res.code === 200) {
            localStorage.setItem("token", res.data);
            router.push('/main');
        } else {
            alert('登录失败');
        }
    });
}
</script>

<style>
/* 基础样式 */
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/5db0443d04fb6d8335cfe5aef4b48848_r.jpg");
    position: relative;
    background-size: cover; /* 确保背景图片覆盖整个屏幕 */
    background-position: center; /* 背景图片居中 */
}

.login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 400px;
    background-color: #00000060;
    margin: auto;
    margin-top: 15%;
    text-align: center;
    border-radius: 10px;
    padding: 50px 50px;
}

/* 媒体查询：适应小屏幕设备 */
@media (max-width: 768px) {
    .login-box {
        width: 80%; /* 在小屏幕上，登录框宽度调整为80% */
        padding: 20px 20px; /* 调整内边距 */
    }

    .login-input1,
    .login-input2 {
        width: 100%; /* 输入框宽度调整为100% */
    }

    .login-button {
        width: 100%; /* 按钮宽度调整为100% */
    }
}

.login-title {
    position: relative;
    top: -150px;
    left: 50%;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    /* 增大字体大小 */
    font-weight: bold;
    /* 使字体更粗 */
}

.login-input1,
.login-input2 {
    margin-top: 20px;
    background-color: #222630;
    padding: 1rem;
    outline: none;
    width: 100%; /* 输入框宽度调整为100% */
    color: white;
    border-radius: 0.5rem;
    border: 2px solid #2B3040;
}

.login-button {
    margin-top: 20px;
    font: inherit;
    background-color: #2B3040;
    border: 0;
    color: #f0f0f0;
    border-radius: 0.5em;
    font-size: 1.35rem;
    padding: 0.375em 1em;
    cursor: pointer;
    width: 100%; /* 按钮宽度调整为100% */
}

.login-button {
    margin-top: 30px;
    font: inherit;
    background-color: #2B3040;
    /* 黑色背景 */
    border: 0;
    color: #f0f0f0;
    /* 白色文本 */
    border-radius: 0.5em;
    font-size: 1.35rem;
    padding: 0.375em 1em;
    /* 增加水平padding使按钮变宽 */
    box-shadow: inset 0 0.0625em 0 0 #393939, 0 0.0625em 0 0 #2e2e2e,
        0 0.125em 0 0 #232323, 0 0.25em 0 0 #1c1c1c, 0 0.3125em 0 0 #121212,
        0 0.375em 0 0 #0a0a0a, 0 0.425em 0 0 #050505, 0 0.425em 0.5em 0 #000000;
    transition: 0.15s ease;
    cursor: pointer;
    display: block;
    /* 使按钮宽度充满其父容器 */
    width: 98%;
    /* 设置按钮宽度为100% */
}

.login-button:active {
    transform: translateY(0.225em);
    /* 垂直移动按钮 */
    box-shadow: inset 0 0.03em 0 0 #393939, 0 0.03em 0 0 #2e2e2e,
        0 0.0625em 0 0 #232323, 0 0.125em 0 0 #1c1c1c, 0 0.125em 0 0 #121212,
        0 0.2em 0 0 #0a0a0a, 0 0.225em 0 0 #050505, 0 0.225em 0.375em 0 #000000;
}
</style>