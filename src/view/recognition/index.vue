<template>
  <div class="container">
    <div class="container-box" >
      <div  style="margin-top: 60px;float:right"><div class="left-article" style="width: 300px;margin-left: 20px;"  v-for="(item,index) in behavior1" :key="index">
        <div class="top-title" style="margin-top: 20px; margin-bottom: -10px">
          <h4 style="font-size: 1.0rem;margin-bottom: 10px;">{{item.type}}</h4>
        </div>
        <div class="text">
          <p>
            {{ item.judge }}
            </p>
            </div>
            </div></div>
      <div class="video-box">
        <video
        style="height: 506px;width: 700px;"
  id="video"
  src="/src/assets/aa.mp4"
  muted
  controls
  controlsList="nodownload"
  :poster="poster"
>您的浏览器不支持 video 标签。</video>

 <!-- <VideoJs /> -->
        <!-- <Video  :poster="poster"></Video> -->
      </div>
         <!-- <button style="height: 40px;width: 100px;background-color: #1caad9;color: #fff;position: absolute;right:40px;bottom: 10px;font-weight: 700;" @click="change">{{btnValue}}</button> -->
      <div class="check" >
        <div class="check-box">
          <videoCheck></videoCheck>
        </div>
        <div class="table-box" >
        <tableBox></tableBox>
      </div>
      </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import tableBox from "./components/tableBox.vue";
import videoCheck from "./components/videoCheck.vue";
import VideoJs from '../../utils/video1.vue'
import { ref, defineProps, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const data=reactive({
  videoSrc:"https://www.w3schools.com/html/movie.mp4"
})

import Video from "../../utils/video.vue";
import videojs from "video.js";
//播放器中文，不能使用.js文件
import videozhCN from "video.js/dist/lang/zh-CN.json";
//样式文件注意要加上
// import "video.js/dist/video-js.css";
// import mp4 from "../../assets/aaa.mp4";
const props = defineProps({});
const store = useStore();
const router = useRouter();

// const src = ref("");
const poster = ref(
  "https://mstatic.gzstv.com/media/images/2021/07/12/FZp9TACac3Mb.jpg"
);
const isActive = ref(true);
const containerHeight = ref(620);
// const btnValue=ref('Detection')

const behavior1=ref([
  {type:'Tail fanning',judge:'尾部再卵堆旁或卵堆内，左右摆动'},
  {type:'Agitating',judge:'头部钻到卵堆中或身体穿过卵堆'},
  {type:'Shaking',judge:'头部或身体跨在卵堆上方或附近，左右或上下摆动'},
  {type:'Egg eating',judge:'张嘴衔住卵粒或甩头'},
  {type:'Entering caves',judge:'仅头部出现在洞口处'},
  {type:'exiting caves',judge:'仅尾部出现在洞口处'},
])
// const behavior2=ref([
// {type:'Entering caves',judge:'仅头部出现在洞口处'},
//   {type:'exiting caves',judge:'仅尾部出现在洞口处'},
// ])
//左边点击事件
// function ClickLeftMenu(index) {
//   isActive.value = index;
//   console.log("点击",isActive.value)
//   if (isActive.value == 1) containerHeight.value = 620;
//   else containerHeight.value = 620;
//   //   src.value = mp4;
// }

// function change(){
//   if(isActive){
//     btnValue.value='Demo'
//   }else{
//     btnValue.value='Detection'
//     console.log("比那好")
//   }
//   isActive.value=!isActive.value
// }
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  // min-height: 603px;
  // overflow-y: hidden;
  .container-box {
    background: #f0f1f6;
    position: absolute;
    height: 1240px;
    width: 100%;
    // display: flex;
    flex-direction: column;
    // .left-choice {
    //   width: 207px;
    //   height: 107px;
    //   background-color: #fff;
    //   font-size: 16px;
    //   color: #333;
    //   //   border: 1px solid #797979;
    //   margin-left: 30px;
    //   margin-top: 20px;
    //   ul {
    //     list-style: none;
    //     padding: 16px;
    //     li {
    //       margin-bottom: 15px;
    //       cursor: pointer;
    //     }
    //     li:hover {
    //       color: #7373e5;
    //     }
    //     .active {
    //       color: #7373e5;
    //     }
    //   }
    // }
    .video-box {
      position: absolute;
      left: 50%;
      top: 25%;
      transform: translate(-50%, -50%);
    }
    .check {
    //   // position: absolute;
      width: 100%;
      height: 603px;
      margin-top: 630px;
      position: relative;
      display: flex;
    //   //top: 0;
      .check-box {
        position: absolute;
        width: 800px;
        height: 450px;
        left: 35%;
        top: 40%;
        transform: translate(-50%, -50%);
      }
      .table-box {
      position: absolute;
      right:20px;
      top:-20px;
      // top:30px;
      // border-radius: 20px;
      // border: 2px solid #395071;
      // bottom: 50px;
      height: 490px;
      width: 30%;
      // margin-top: -200px;
      // display: flex;
      // justify-content: center;
      // background-color: #091222;
    }
    }
  }
}
</style>
