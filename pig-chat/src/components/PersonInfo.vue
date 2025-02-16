<template>
    <span>{{ personInfo.username }}</span>
</template>

<script setup>

import { onMounted,ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { getUserinfo} from "@/api/user";

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