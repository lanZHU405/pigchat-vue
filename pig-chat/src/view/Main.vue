<template>
    <div class="common-layout">
    <el-container>
      <el-aside style="background-color: aqua;height: 100vh;" width="600px">Aside <button @click="logoutEvent">退出登录</button></el-aside>
      <el-main style="background-color: blue;">Main</el-main>
    </el-container>
  </div>
</template>
 
<script setup>

import {logout,list} from "@/api/user"
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'
import { reactive,ref } from "vue";

const tableData = ref([]);

const router = useRouter();

onMounted(()=>{
    list("user").then(res=>{
        tableData.value = res.data;
        console.log(tableData.value);
    })
})

function logoutEvent(){
    logout().then(res=>{
        if(res.code==200){
            localStorage.removeItem('token')
            router.push('/')
        }
    })
}

</script>