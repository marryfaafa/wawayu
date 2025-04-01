<template>
   <div class="page3-container">
    <div class="slide" :class="sliderClasses"></div>
    <video
    ref="videoRef"
        style="height: 620px;width: 100%;padding: 20px 40px"
  id="video"
  src="https://boot-video.xuexi.cn/video/1006/p/2b65b92a534cd5d965a19a18a68b3c4a-ca233f2c746a4bd5958a2c9f77889106-2.mp4"
  controlsList="nodownload"
  poster="http://giantsalamanders.cn/wp/wp-content/uploads/2022/07/大鲵网站1.png"
>您的浏览器不支持 video 标签。</video>
    </div>
</template>
<script lang='ts' setup>
import video from './../../../utils/video.vue'
import {ref,defineProps, onMounted,nextTick } from 'vue';
import {useRouter} from 'vue-router'
const props=defineProps({});
const router=useRouter();
const sliderClasses = ref("slider");
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(async()=>{
    console.log("进入页面3")
    await nextTick(); // 等待视频元素渲染完成
  const video = videoRef.value;

  if (video) {
    // 延迟1秒后尝试自动播放
    setTimeout(() => {
      video.play().then(() => {
        // 播放成功
      }).catch(error => {
        console.error('视频自动播放失败:', error);
      });
    }, 1000);
  }
  
})
</script>
<style lang='scss' scoped>

@keyframes slideLeftFadeOut {
  0% {
    right: -70%; /* 初始状态在右侧 */
  }
//   50%{
//     right:70%;
//   }
  100% {
    right: 170%; /* 移动到左侧边缘 */
  }
}
.page3-container {
  width: 100%;
  height: 720px;
  position: relative;
  overflow: hidden;
  background-color: #000000;
  .slider {
    width: 69%; /* 滑块宽度为页面宽度的70% */
    height: 100%; /* 与容器等高 */
    background-color: #15a98d; /* 橙色背景 */
    position: absolute;
    right: -70%; /* 初始位置在容器左边，完全不可见 */
    animation: slideLeftFadeOut 1s ease-in-out forwards;
    z-index: 1000;
  }
}
</style>