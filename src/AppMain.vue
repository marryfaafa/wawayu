<template>
  <div
    class="layout"
    style="
      position: absolute;
      width: 100%;
      min-height: 100%;
      border-radius: 4px;
      background-color: rgba(1, 22, 38, 0.5);
      overflow-y: auto;
    "
  >
  <img src="/src/assets/nibao.gif" alt="" style="z-index: 2000;position: fixed;top:607px;left: 0px;height: 200px;width: 160px;cursor: pointer;" @click="Chat" v-if="show">
    <img
      :src="getImage(index)"
      alt=""
      style="
        position: fixed;
        top: 0;
        left: 10;
        right: 10;
        width: 100%;
        min-height: 100%;
        z-index: -1;
        border-radius: 4px;
      "
    />
    <div
      style="
        /* min-height: 100%; */
        width: 100%;
        position: absolute;
        /* overflow-y: auto; */
      "
    >
      <div
        style="
          position: absolute;
          width: 100%;
          height: 75px;
          background-color: rgba(1, 22, 38, 0.7);
        "
      >
        <Header></Header>
      </div>
      <!-- 不要使用opacity加background-color，这会影响后面的，直接用背景颜色 -->
      <div
        style="
          position: absolute;
          top: 75px;
          width: 100%;
          /* background-color: rgba(1, 22, 38, 0.5); */
          background-color: #fff;
          min-height: 90%;
          /* overflow-y: hidden; */
          /* 使用 RGBA 颜色值设置半透明的背景色 */
        "
      >
        <router-view
          style="
            position: absolute;
            min-width: 100%;
            height: 100%;
            z-index: 100;
          "
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,watch} from "vue";
import Header from "./components/sideBar/Header.vue";
import { useRoute } from "vue-router";
const route=useRoute()

// import { bg } from "element-plus/es/locale";

import image1 from "./assets/images/back.jpg";
import image2 from "./assets/images/help.jpg";
import router from "./router";
import { UserStore } from "./store/modules/user";
const images = ref([image1, image2]);
const index = ref(1);
const show=ref(true)
const store=UserStore()

function getImage(index) {
  return images.value[index] || null;
}

function Chat(){
  show.value=false
   router.push({
    name:"Question"
   })
}
// 使用 watch 函数来监听路由变化  
watch(  
  () => route.path,  
  (newPath, oldPath) => {  
    console.log("身份",store.identity)
    if(store.identity==='admin'){
      show.value=false
    }
    if(newPath === '/home'){
      show.value = false;
    }
    if (newPath !== '/question') {  
      show.value = true;  
    }
  },  
  { immediate: false } // immediate: false 表示不在第一次渲染时触发回调  
);
// });
</script>

<style scoped lang="scss">
.layout {
  background-size: cover; /* 覆盖整个元素，保持宽高比，可能会被裁剪 */
  background-repeat: no-repeat; /* 不重复显示 */
  background-position: center; /* 可选：将图像居中放置 */
}

</style>
