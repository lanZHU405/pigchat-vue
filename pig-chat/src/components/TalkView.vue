<template>
  <div>
    <div style="width: 100%; height: 100px; background-color: #EBEBEB;display: flex;align-items: center;">
      <div style="margin-left: 60px;">
        <img style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; float: left;" class="avatar"
          src="@/assets/QQ图片20230625110356.jpg" alt="" />
      </div>
      <div style="float: left; margin-top: -5px; margin-left: 10px">
        <span style="font-size: 25px; font-weight: bold;">{{ friendInfo.nickName }}</span>
        <span style="display: block;">{{ friendInfo.status == 0 ? '离线' : '在线' }}</span>
      </div>
    </div>
    <div class="chat_box" style="width: 100%; min-height: calc(100vh - 220px);">
      <el-scrollbar ref="scrollContainer" style="height: calc(100vh - 220px);" class="scroll-container">
        <div v-for="item in talkList" :key="item.id" :class="item.status == 0 ? 'left' : 'right'">
          <img class="avatar" @click="goPersonInfo(item.userId)" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height">
            {{ item.message }}
          </div>
        </div>
        <div v-if="load" class="left">
          <img class="avatar" @click="goPersonInfo(3)" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height child-common child2">
            <section class="dots-container">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </section>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div style="width: 100%; height: 120px; background-color: #FFFFFF; display: flex; align-items: center;">
      <el-input v-model="message" style="margin-left: 50px;" placeholder="发送消息" @keydown.enter="sendMessage"></el-input>
      <el-button @click="sendMessage" type="primary" style="height: 40px; margin-left: 20px; border-radius: 20px;">
        <el-icon size="20">
          <Promotion />
        </el-icon>
        <span style="vertical-align: middle"> Send </span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { getUserinfo } from "@/api/user";
import { startPigAI } from "@/utils/pigAi";
import { saveMessage, getMessageData } from '@/api/message';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();
const selectedItem = ref('');
const message = ref('');
const friendInfo = ref({});
const talkList = ref([]);
const scrollContainer = ref(null);
const load = ref(false);

// 更新 selectedItem 并获取用户信息的函数
async function updateSelectedItem() {
  console.log("111", route.query.item);
  selectedItem.value = route.query.item || 'default';
  try {
    const res = await getUserinfo(selectedItem.value);
    if (res.code === 200) {
      friendInfo.value = res.data;
      console.log("Friend info loaded:", friendInfo.value);
    } else {
      console.error('Failed to fetch friend info:', res.message);
    }
  } catch (error) {
    console.error('Error fetching friend info:', error);
  }
}

// 加载消息的函数
async function loadMessages() {
  console.log("222", friendInfo.value.id);
  try {
    const params = {
      senderId: store.state.user.id,
      receiveId: friendInfo.value.id,
    };
    const res = await getMessageData(params);

    // 处理获取到的消息数据
    if (res.code === 200) {
      talkList.value = res.data.map(item => {
        if (item.message) {
          return {
            message: item.message,
            status: item.senderId === store.state.user.id ? 1 : 0,
            userId: item.senderId
          };
        }
        return null; // 如果没有 message 字段，返回 null
      }).filter(item => item !== null); // 过滤掉 null 值
      scrollToBottom();
      console.log(talkList.value);
    } else {
      // 处理错误情况，如提示用户
      console.error('获取消息数据失败，错误码：', res.code);
    }
  } catch (error) {
    // 统一处理请求过程中出现的异常，如网络错误等
    console.error('操作过程中出现异常：', error);
  }
}

function goPersonInfo(id) {
  router.push({
    path: '/main/personInfo/',
    query: {
      id: id
    }
  });
}

function sendMessage() {
  if (message.value.trim() === '') {
    return; // 如果输入为空，则不发送消息
  }

  const newMessage = {
    status: 1,
    message: message.value
  };
  talkList.value.push(newMessage);
  message.value = '';
  scrollToBottom();
  let AiMessage = ""
  load.value = true;
  startPigAI(newMessage.message).then(res => {
    const aiMessage = {
      status: 0,
      message: res
    }
    AiMessage = aiMessage.message;
    talkList.value.push(aiMessage);
    load.value = false;
    nextTick(() => {
      const scrollbar = scrollContainer.value.$el.querySelector('.el-scrollbar__wrap');
      if (scrollbar) {
        scrollbar.scrollTop = scrollbar.scrollHeight;
      }
      let list = [
        {
          senderId: store.state.user.id,
          receiveId: friendInfo.value.id,
          message: newMessage.message,
          sendAt: new Date(),
          isRead: true,
          messageType: 0,
          replyId: 0
        },
        {
          senderId: friendInfo.value.id,
          receiveId: store.state.user.id,
          message: AiMessage,
          sendAt: new Date(),
          isRead: true,
          messageType: 0,
          replyId: 0
        }
      ]
      saveMessage(list);
    });
  })
}

function scrollToBottom() {
  nextTick(() => {
    const scrollbar = scrollContainer.value?.$el.querySelector('.el-scrollbar__wrap');
    if (scrollbar) {
      scrollbar.scrollTop = scrollbar.scrollHeight;
    }
  });
}

// 在组件挂载时执行一次
onMounted(async() => {
  await updateSelectedItem();
  await loadMessages();
});

watch(() => route.query.item, async (newItem, oldItem) => {
  if (newItem !== oldItem) {
    await updateSelectedItem(); // 等待 updateSelectedItem 完成
    await loadMessages();       // 然后执行 loadMessages
  }
});

// 其他函数保持不变
</script>

<style scoped>
.right {
  width: 100%;
  margin-top: 20px;
  float: right;
  margin-right: 20px;
}

.right img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  float: right;
}

.right>.div-auto-height {
  background-color: #2D65F7;
  float: right;
  margin-right: 20px;
  color: #FFFFFF;
}

.left {
  width: 100%;
  margin-top: 20px;
}

.left img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  float: left;
  margin-left: 20px
}

.left>.div-auto-height {
  background-color: #FFFFFF;
}

* {
  margin: 0px;
}

:deep(.el-input) {
  width: 80%;
  border-radius: 10px;
}

:deep(.el-input__inner) {
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  background-color: #EBEBEB;
  text-indent: 20px;
  font-size: 18px;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: #EBEBEB;
}

:deep(.el-input__inner)::-webkit-input-placeholder {
  color: #999;
  font-size: 18px;
}

:deep(.el-input__inner)::-moz-placeholder {
  color: #999;
  font-size: 18px;
  opacity: 1;
}

:deep(.el-input__inner):-ms-input-placeholder {
  color: #999;
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-input__inner):-moz-placeholder {
  color: #999;
  font-size: 18px;
  opacity: 1;
  font-weight: bold;
}

.div-auto-height {
  font-size: 20px;
  margin-top: 14px;
  line-height: 50px;
  border-radius: 20px;
  margin-left: 20px;
  font-family: 'Microsoft YaHei';
  display: inline-block;
  word-wrap: break-word;
  padding: 0 20px;
  width: auto;
  height: auto;
  max-width: 70%;
  min-height: 50px;
}

.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.dot {
  margin-top: 22px;
  height: 5px;
  width: 5px;
  margin-right: 2px;
  border-radius: 2px;
  background-color: #b3d4fc;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
  margin-right: 0;
}

.dot:nth-child(1) {
  animation-delay: -0.3s;
}

.dot:nth-child(2) {
  animation-delay: -0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
}
</style>