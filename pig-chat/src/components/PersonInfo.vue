<template>
  <div class="image-container" :style="{ backgroundImage: `url('${personInfo.backgroundImg}')` }">
    <el-avatar 
      :size="300" 
      class="center-avatar"
    >
      <img 
        :src="personInfo.avatar" 
        alt="Avatar"
      />
    </el-avatar>
    <div style="padding-top: 420px;">
      <div style="text-align: center;" >
        <span class="capsule">{{ personInfo.nickName }}</span>
      </div>
      <div style="text-align: center;margin-top: 20px;" >
        <span class="capsule">{{ personInfo.username }}</span>
      </div>
      <div>
        <hr class="centered-hr">
      </div>
      <div style="text-align: center; font-size: 30px; font-family: '微软雅黑'; font-weight: bold; color: #303940;">
        <div>
          <span>{{ personInfo.email }}</span>
        </div>
        <span>{{ personInfo.signature }}</span>
      </div>
      <div style="text-align: center; margin-top: 80px;">
        <el-button type="primary" style="min-width: 180px; min-height: 60px;font-size: 28px;border-radius: 30px;" @click="editInfo" >设置</el-button>
        <el-button style="min-width: 180px; min-height: 60px;font-size: 28px;border-radius: 30px;" @click="sendMessage">发消息</el-button>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="个人信息" width="500px">
    <el-form :model="updateForm" ref="formRef" :rules="rules">
      <el-form-item label="昵称" label-width="100px" prop="nickName">
        <el-input v-model="updateForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名" label-width="100px" prop="username">
        <el-input v-model="updateForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="100px" prop="email">
        <el-input v-model="updateForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像" label-width="100px" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://113.44.139.100:8008/file/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="updateForm.avatar" :src="updateForm.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="背景图片" label-width="100px" prop="backgroundImg">
        <el-upload
          class="avatar-uploader"
          action="http://113.44.139.100:8008/file/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleBackgroundImgSuccess">
          <img v-if="updateForm.backgroundImg" :src="updateForm.backgroundImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" label-width="100px" prop="sex">
        <el-radio-group v-model="updateForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserinfo, saveUser } from "@/api/user";
import { ApiResponse } from '@/types/AllType';
import { AxiosResponse } from 'axios';

const router = useRouter();
const route = useRoute();
const personInfo = ref<any>({});
const updateForm = ref<any>({});
const dialogFormVisible = ref<boolean>(false);
const headers = ref<any>({});

onMounted(() => {
  getPersonInfo(route.query.id as string);
  headers.value = {
     'token': localStorage.getItem("token") || ''
   };
});

function getPersonInfo(id: string) {
  getUserinfo(id).then((res: AxiosResponse<ApiResponse<any>>) => {
    if (res.data.code == 200) {
      personInfo.value = res.data.data;
    }
  });
}

function editInfo() {
  updateForm.value = {
    nickName: personInfo.value.nickName,
    username: personInfo.value.username,
    email: personInfo.value.email,
    avatar: personInfo.value.avatar,
    backgroundImg: personInfo.value.backgroundImg,
    sex: personInfo.value.sex,
    id: personInfo.value.id,
  };
  dialogFormVisible.value = true;
}

function sendMessage() {
  router.push({
    path: '/main/talkView',
    query: {
      item: personInfo.value.id,
    },
  });
}

const rules = {
  nickName: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'change' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
};

const formRef = ref<any>(null);

function handleAvatarSuccess(response: any) {
  updateForm.value.avatar = response.data;
}

function handleBackgroundImgSuccess(response: any) {
  updateForm.value.backgroundImg = response.data;
}

function submitForm() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      saveUser(updateForm.value).then(async (res: AxiosResponse<ApiResponse<any>>) => {
        if (res.data.code == 200) {
          await getPersonInfo(route.query.id as string);
          dialogFormVisible.value = false;
        } 
      });
    } else {
      console.log('表单验证失败');
      return false;
    }
  });
}
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
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
  pointer-events: none;
}

.center-avatar {
  position: absolute;
  bottom: 600px; /* 调整头像位置 */
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid white;
}

.capsule {
  min-width: 200px;
  display: inline-block;
  font-size: 40px;
  font-family: '微软雅黑';
  text-align: center;
  font-weight: bold;
  color: #303940;
  padding: 10px 20px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.2); /* 背景透明偏白 */
  position: relative;
}

.centered-hr {
  width: 50%;
  border: none;
  height: 2px;
  background-color: white;
  margin: 20px auto;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar-uploader {
  width: 100px; /* 根据需要调整尺寸 */
  height: 100px; /* 根据需要调整尺寸 */
  border: 1px dashed #d9d9d9;
  border-radius: 50%; /* 使上传区域为圆形 */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保图片不会超出边界 */
}

.avatar {
  width: 100%; /* 图片宽度100% */
  height: 100%; /* 图片高度100% */
  border-radius: 50%; /* 图片为圆形 */
  object-fit: cover; /* 图片覆盖整个区域 */
}

.dialog-footer {
  text-align: right;
}
</style>