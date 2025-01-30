<template>
    <span>{{ personInfo.username }}</span>
</template>

<script setup>

import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserinfo} from "@/api/user";

const router = useRouter();
const personInfo = ref({});

onMounted(() => {
    getPersonInfo(router.params.id);
})

function getPersonInfo(id) {
    getUserinfo(id).then(res => {
        if (res.code == 200) {
            personInfo.value = res.data;
        }
    })
}


</script>