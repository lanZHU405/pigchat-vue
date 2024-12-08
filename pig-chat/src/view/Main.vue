<template>
    登录成功
    <button @click="logoutEvent">退出登录</button>
</template>

<script setup>

import {logout} from "@/api/user"
import { useRouter } from 'vue-router';

const router = useRouter();

function logoutEvent(){
    logout().then(res=>{
        if(res.code==200){
            localStorage.removeItem('token')
            router.push('/')
        }
    })
}

</script>