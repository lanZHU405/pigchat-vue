<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <!-- 固定顶部区域 -->
                <div style="width: 100%; height: 100px; background-color: #303940;"></div>
                <!-- 使用 el-scrollbar 包裹菜单，并设置高度 -->
                <el-scrollbar style="height: calc(100vh - 100px);">
                    <el-menu default-active="/main/talkView?item=3" style="width: 100%; height: calc(100vh - 100px);">
                        <!-- 使用 v-for 来简化重复项 -->
                        <el-menu-item v-for="item in friendList" :key="item.id" @click="goToTalkView(item.id)"
                            class="menu-item">
                            <div class="avatar-status">
                                <img class="avatar"
                                    style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;"
                                    src="@/assets/QQ图片20230625110356.jpg" alt="" />
                                <span class="status"></span>
                            </div>
                            <div style="width: 400px; height: 80px; margin: 10px; margin-left: 20px;">
                                <span
                                    style="display: block; line-height: 50px; font-size: 25px; color: aliceblue; font-weight: bold;">{{
                item.nickName }}</span>
                                <span
                                    style="display: block; line-height: 20px; color: gray; font-size: 18px;">今天你听说了嘛</span>
                            </div>
                            <div style="width: 80px; height: 80px; margin-top: 20px;">
                                <span
                                    style="display: block; width: 60px; height: 30px; background-color: #303940; font-size: 18px; line-height: 30px; border-radius: 15px; color: #F3F3F3; text-align: center;">12:30</span>
                                <div
                                    style="text-align: center; line-height: 20px; width: 20px; height: 20px; color: #F3F3F3; background-color: #666666; border-radius: 50%; margin-top: 10px; margin-left: 30px">
                                22</div>
                            </div>
                        </el-menu-item>
                        <div><button @click="goTest">测试</button></div>
                        <!-- 其他 el-menu-item -->
                    </el-menu>
                </el-scrollbar>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getFriendById } from "@/api/user";
import { useStore } from 'vuex';
import { ApiResponse } from '@/types/AllType';
import { AxiosResponse } from 'axios';

const store = useStore();
const router = useRouter();

const friendList = ref<any[]>([]);

function goToTalkView(id: string) {
  router.push({
    path: '/main/talkView',
    query: {
      item: id,
    },
  });
}

function goTest() {
  router.push({
    path: '/test',
  });
}

onMounted(() => {
    console.log(store.state.user.id);
    getFriendById(store.state.user.id).then((res: AxiosResponse<ApiResponse<any>>) => {
    if (res.data.code === 200) {
        friendList.value = res.data.data; // 注意这里访问 res.data.data
        console.log(friendList.value);
    }
});
});
</script>

<style scoped>
/* 隐藏浏览器默认滚动条 */
:deep(.el-menu) {
    background-color: #363F46;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

:deep(.el-menu::-webkit-scrollbar),
:deep(.el-menu-item::-webkit-scrollbar) {
    display: none;
    /* WebKit browsers */
}

/* 确保 el-scrollbar 不显示默认滚动条 */
:deep(.el-scrollbar__wrap) {
    overflow-x: hidden !important;
}

/* 自定义 el-scrollbar 滚动条样式 */
:deep(.el-scrollbar__bar.is-vertical) {
    background-color: #555;
    /* 改变滚动条颜色 */
}

.status {
    position: absolute;
    /* 绝对定位 */
    bottom: 0;
    /* 定位到底部 */
    right: 0;
    /* 定位到右侧 */
    width: 10px;
    /* 状态点的宽度 */
    height: 10px;
    /* 状态点的高度 */
    background-color: #00E779;
    /* 绿色背景 */
    border-radius: 50%;
    /* 圆形 */
    border: 2px solid #00E779;
    /* 可选，给状态点加个白色边框 */
}

/* 菜单项的样式 */
:deep(.el-menu-item) {
    background-color: #363F46;
    transition: background-color 0.3s ease;
    width: 600px;
    height: 100px;
    position: relative;
    /* 相对定位 */
}

:deep(.el-menu-item.is-active),
:deep(.el-menu-item:hover) {
    background-color: #404853;
}

:deep(.el-menu-item > span) {
    font-size: 30px;
}

:deep(.el-menu-item > .avatar) {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
}

.avatar-status {
    position: relative;
    /* 相对定位 */
    display: inline-block;
    /* 使 .status 可以绝对定位 */
}
</style>