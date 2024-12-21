<template>
  <div>
    <div style="width: 100%; height: 100px; background-color: #FFFFFF;display: flex;align-items: center;">
      <div style="margin-left: 20px;" >
        <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: left;" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
      </div>
      <div style="float: left;margin-top: -5px;margin-left: 10px">
        <span style="font-size: 25px;font-weight: bold;" >懒懒猪</span>
        <span style="display: block;">在线</span>
      </div>
    </div>
    <div class="chat_box" style="width: 100%;min-height: calc(100vh - 220px);background-color: aqua;">

    </div>
    <div style="width: 100%; height: 120px; background-color: #FFFFFF;display: flex;align-items: center;">
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TalkView',
  setup() {
    const route = useRoute();
    let selectedItem = ref('');

    // 在组件挂载时读取查询参数
    onMounted(() => {
      selectedItem.value = route.query.item || 'default';
      console.log(selectedItem.value);
    });

    // 监听路由变化（例如用户直接输入URL或刷新页面）
    watch(() => route.query, (newQuery) => {
      selectedItem.value = newQuery.item || 'default';
      console.log(selectedItem.value);
    });

    return {
      selectedItem,
    };
  },
});
</script>

<style scoped>
* {
  margin: 0px;
}
</style>