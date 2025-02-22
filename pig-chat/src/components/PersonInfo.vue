<template>
  <div class="image-container" :style="{ backgroundImage: `url('${imagePath}')` }">
    <el-avatar 
      :size="300" 
      class="center-avatar"
    >
      <img 
        :src="avatar" 
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
        <span>一屋，两人，三餐，四季</span>
      </div>
      <div style="text-align: center; margin-top: 80px;">
        <el-button type="primary" style="min-width: 180px; min-height: 60px;font-size: 28px;border-radius: 30px;" @click="editInfo" >设置</el-button>
        <el-button style="min-width: 180px; min-height: 60px;font-size: 28px;border-radius: 30px;" @click="sendMessage">发消息</el-button>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="个人信息" width="500px">
    <el-form :model="personInfo" ref="formRef" :rules="rules">
      <el-form-item label="昵称" label-width="100px" prop="nickName">
        <el-input v-model="personInfo.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名" label-width="100px" prop="username">
        <el-input v-model="personInfo.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="100px" prop="email">
        <el-input v-model="personInfo.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像" label-width="100px" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8008/file/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="personInfo.avatar" :src="personInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" label-width="100px" prop="gender">
        <el-radio-group v-model="personInfo.sex">
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

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserinfo } from "@/api/user";
import imagePath from "@/assets/5db0443d04fb6d8335cfe5aef4b48848_r.jpg";
import avatar from "@/assets/QQ图片20230625110356.jpg";

const router = useRouter();
const route = useRoute();
const personInfo = ref({});
const dialogFormVisible = ref(false);
const headers = ref({});

onMounted(() => {
  getPersonInfo(route.query.id);
  headers.value = {
     'token': localStorage.getItem("token")
   };
});

function getPersonInfo(id) {
  getUserinfo(id).then(res => {
    if (res.code == 200) {
      personInfo.value = res.data;
    }
  });
}

function editInfo() {
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
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
};

const formRef = ref(null);

function handleAvatarSuccess(response, file) {
  personInfo.value.avatar = URL.createObjectURL(file.raw);
}

function submitForm() {
  formRef.value.validate((valid) => {
    if (valid) {
      alert('提交成功');
      dialogFormVisible.value = false;
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