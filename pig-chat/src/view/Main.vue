<template>
    <div class="common-layout">
        <el-container>
            <el-aside style="height: 100vh;" width="600px">
                <FriendAside />
            </el-aside>
            <el-main style="background-color: #F3F3F3; height: 100vh; width: 100%;">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>

import { logout, list } from "@/api/user"
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'
import { reactive, ref } from "vue";
import FriendAside from "@/components/FriendAside.vue";
import TalkView from "@/components/TalkView.vue";

const tableData = ref([]);

const router = useRouter();

onMounted(() => {
    list("user").then(res => {
        tableData.value = res.data;
        console.log(tableData.value);
    })
})
function logoutEvent() {
    logout().then(res => {
        if (res.code == 200) {
            localStorage.removeItem('token')
            router.push('/')
        }
    })
}

</script>

<style>

.el-main {
  padding: 0 !important;
}

</style>