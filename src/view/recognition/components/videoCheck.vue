<template>
  <div class="check-box-container">
    <input
      style="opacity: 0; z-index: 100"
      class="wh"
      type="file"
      accept="video/*"
      @change="uploadVideo"
      v-if="!flag2"
    />
    <div v-if="!progress && !mediaUrl" class="no-bg wh">
      <span style="font-size: 20px;color: #021626;">点击上传视频</span>
    </div>
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div
      class="video-container wh"
      v-if="flag2"
      @mousein="handleMouseIn"
      @mouseover="handleMouseIn"
      @mouseout="handleMouseOut"
    >
      <video
        class="wh video"
        id="myVideo"
        :src="mediaUrl"
        controls
        ref="myVideo"
        autoplay
      ></video>
    </div>

    <div class="overlay wh" v-show="isOverlayVisible">
      <span style="color: #fff; font-size: 28px" @click="handDetection"
        >开始检测</span
      >
    </div>
    <!-- <img class="wh" v-if="flag1" :src="mediaUrl" alt="" /> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { FunctionStore } from "../../../store/modules/function";
import { useRouter } from "vue-router";
import { ElUpload, ElButton, ElProgress } from "element-plus";
import { reqvideoCall } from "@/api";
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();

const mediaUrl = ref(""); //视频/图片播放地址
const progress = ref(false);
const loading = ref(false); //是否加载动画
const flag2 = ref(false);
const selectFile = ref(""); //选取的视频
const isOverlayVisible = ref(false); // 控制遮盖层是否显示
let flag3=ref(false)
// function upload() {
//   console.log("庆典上次");
//   uploadVideo();
// }
const uploadVideo = (event: Event) => {
  console.log("djks");
  const files = event.target.files;
  progress.value = true;
  let file = event.target.files[0];
  selectFile.value=file
  console.log(file,selectFile.value,"选取");
  mediaUrl.value = URL.createObjectURL(file);
  flag2.value = true;
};

function handleMouseIn() {
  if(!flag3.value)
  isOverlayVisible.value = true;
}

function handleMouseOut() {
  setTimeout(() => {
    isOverlayVisible.value = false;
  }, 1000);
  // store.dispatch;
}

async function handDetection() {
  loading.value = true;
  isOverlayVisible.value = false;
  let res=await reqvideoCall(selectFile.value)
  console.log(res,"结果")
    loading.value=false
 
  mediaUrl.value=res.oss;
  flag3.value=true
  store.behavior=res.behavior;
  store.detectResult=res.detectionResult
  console.log("asdds",store.detectResult)
  store.recog=true
}
</script>
<style lang="scss" scoped>
.no-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #000000;
  background-color: #fbfbfc;
  border-radius: 5px;
  cursor: pointer; //变小手
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.wh {
  width: 800px;
  height: 450px;
  border-radius: 5px;
  position: absolute; //保证input和div重合
  cursor: pointer;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
.overlay {
  z-index: 1100;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  transition: opacity 0.3s ease; /* 添加过渡效果 */
  width: 780px;
  margin-left: 10px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
