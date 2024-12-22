<template>
  <div>
    <div style="width: 100%; height: 100px; background-color: #FFFFFF;display: flex;align-items: center;">
      <div style="margin-left: 60px;">
        <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: left;" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
      </div>
      <div style="float: left;margin-top: -5px;margin-left: 10px">
        <span style="font-size: 25px;font-weight: bold;">懒懒猪</span>
        <span style="display: block;">在线</span>
      </div>
    </div>
    <div class="chat_box" style="width: 100%;min-height: calc(100vh - 220px);">
      <el-scrollbar style="height: calc(100vh - 220px);">
        <div style="width: 100%;margin-left: 20px;margin-top: 20px;">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: left;" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #FFFFFF;;">
            你好，我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？
          </div>
        </div>
        <div style="width: 100%;margin-top: 20px;float: right;margin-right: 20px">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: right" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #2D65F7;float: right;margin-right: 20px;color: #FFFFFF;">
            你好，我是猪猪智能客服，你有什么问题吗？
          </div>
        </div><div style="width: 100%;margin-left: 20px;margin-top: 20px;">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: left;" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #FFFFFF;;">
            你好，我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？
          </div>
        </div>
        <div style="width: 100%;margin-top: 20px;float: right;margin-right: 20px">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: right" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #2D65F7;float: right;margin-right: 20px;color: #FFFFFF;">
            你好，我是猪猪智能客服，你有什么问题吗？
          </div>
        </div><div style="width: 100%;margin-left: 20px;margin-top: 20px;">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: left;" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #FFFFFF;;">
            你好，我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？
          </div>
        </div>
        <div style="width: 100%;margin-top: 20px;float: right;margin-right: 20px">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: right" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #2D65F7;float: right;margin-right: 20px;color: #FFFFFF;">
            你好，我是猪猪智能客服，你有什么问题吗？
          </div>
        </div><div style="width: 100%;margin-left: 20px;margin-top: 20px;">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: left;" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #FFFFFF;;">
            你好，我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？我是猪猪智能客服，你有什么问题吗？
          </div>
        </div>
        <div style="width: 100%;margin-top: 20px;float: right;margin-right: 20px">
          <img style="width: 70px;
         height: 70px;
         border-radius: 50%;
         object-fit: cover;float: right" class="avatar" src="@/assets/QQ图片20230625110356.jpg" alt="" />
          <div class="div-auto-height" style="background-color: #2D65F7;float: right;margin-right: 20px;color: #FFFFFF;">
            你好，我是猪猪智能客服，你有什么问题吗？
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div style="width: 100%; height: 120px; background-color: #FFFFFF;display: flex;align-items: center;">
      <el-input v-model="message" style="margin-left: 50px;" placeholder="发送消息"></el-input>
      <el-button type="primary" style="height: 40px;margin-left: 20px;border-radius: 20px;">
        <el-icon size="20">
          <Promotion />
        </el-icon>
        <span style="vertical-align: middle"> Send </span>
      </el-button>
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
    let message = ref('');

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
      message,
    };
  },
});
</script>

<style scoped>
* {
  margin: 0px;
}

:deep(.el-input) {
  width: 80%;
  /* 根据需要设置宽度 */
  border-radius: 10px;
}

/* 设置高度 */
:deep(.el-input__inner) {
  height: 40px;
  /* 根据需要设置高度 */
  line-height: 40px;
  /* 调整行高以垂直居中文本 */
  border-radius: 20px;
  /* 固定像素值确保效果一致 */
  background-color: #EBEBEB;
  /* 添加背景颜色 */
  text-indent: 20px;
  font-size: 18px;
  /* 设置字体大小 */
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: #EBEBEB
    /* 如果.el-input__wrapper有背景色 */
}

/* 修改 placeholder 样式 */
:deep(.el-input__inner)::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #999;
  font-size: 18px;
  /* 匹配输入框的字体大小 */
}

:deep(.el-input__inner)::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
  font-size: 18px;
  opacity: 1;
  /* Firefox 透明度问题 */
}

:deep(.el-input__inner):-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-input__inner):-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
  font-size: 18px;
  opacity: 1;
  /* Firefox 透明度问题 */
  font-weight: bold
}

.div-auto-height {
  font-size: 20px;
  margin-top: 14px;
  line-height: 50px;
  border-radius: 20px;
  margin-left: 20px;
  font-family: 'Microsoft YaHei';
  display: inline-block;
  /* 或者 inline-flex，根据需要选择 */
  word-wrap: break-word;
  /* 防止文字换行 */
  padding: 0 20px;
  /* 设置左右内边距为20px */
  /* 根据需要设置内边距 */
  width: auto;
  height: auto;
  max-width: 60%;

}
</style>