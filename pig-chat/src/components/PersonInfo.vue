<template>
    <div class="image-container">
      <el-image class="gradient-image" :src="imagePath" fit="fill"></el-image>
      <el-avatar 
        :size="300" 
        src="https://empty" 
        @error="errorHandler" 
        class="center-avatar"
      >
        <img 
          :src="avatar" 
          alt="Avatar"
        />
      </el-avatar>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  // 假设 getUserinfo 是从 '@/api/user' 导入的函数
  import { getUserinfo } from "@/api/user";
  import imagePath from "@/assets/5db0443d04fb6d8335cfe5aef4b48848_r.jpg";
  import avatar from "@/assets/QQ图片20230625110356.jpg";
  
  const router = useRouter();
  const route = useRoute();
  const personInfo = ref({});
  
  onMounted(() => {
    getPersonInfo(route.query.id);
  })
  
  function getPersonInfo(id) {
    getUserinfo(id).then(res => {
      if (res.code == 200) {
        personInfo.value = res.data;
      }
    })
  }
  </script>
  
  <style scoped>
  .image-container {
    position: relative;
    width: 100%;
    height: 500px;
  }
  
  .gradient-image {
    width: 100%;
    height: 100%;
  }
  
  .gradient-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1));
    pointer-events: none; /* 确保覆盖层不会干扰图片的点击或其他交互 */
  }
  
  .center-avatar {
    position: absolute;
    bottom: -100px; /* 头像高度的一半（60px / 2），使它看起来像是嵌入了一半 */
    left: 20%; /* 居中 */
    transform: translateX(-50%); /* 水平居中 */
    border: 3px solid white; /* 可选：添加一个白色边框使头像更加突出 */
  }
  </style>