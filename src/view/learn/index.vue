<template>
  <div class="learn-container">
    <div class="elementor-container" v-if="show1">
      <div class="elementor-box">
        <div class="top-title" style="">
          <div class="widget-container">
            <h1 style="color: #fff;margin: 20px 0;">最新博客</h1>
          </div>
        </div>
        <div class="blog-box">
          <div
            v-for="(item,index) in articles"
            :key="index"
            class="blog"
            :class="{ 'no-margin-right': isLastItemOnRow(index) }"
          >
            <div class="header-section">
              <h3>
                <a
                  href="javascript:void(0);"
                  @click="showIframe(item.linksProfiles)"
                  >{{ item.title }}</a
                >
              </h3>
              <p
                style="
                  margin-bottom: 25px;
                  font-family: 'Palatino', sans-serif;
                  color: #777;
                "
              >
                {{ item.description }}
              </p>
              <a href="javascript:void(0);"  @click="showIframe(item.linksProfiles)" style="margin-bottom: 20px">Read More » </a>
            </div>
            <div class="bottom-time">
              <span style="line-height: 47px">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="change-box">
        <a
          href="https://www.tnc.org.cn/"
          style="
            display: inline-block;
            width: 115px;
            height: 50px;
            background-color: #d94948;
            border-radius: 100px;
            text-align: center;
          "
          target="_blank"
        >
          <span
            style="
              color: #fff;
              line-height: 50px;
              font-size: 15px;
              font-weight: 600;
              font-family: 'Times New Roman', sans-serif;
            "
            >更多博客</span
          >
        </a>
      </div>
    </div>
    <!-- <router-view></router-view> -->
    <RouterView ></RouterView>
  </div>
  
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted,watch } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter,useRoute } from "vue-router";
import {reqgetPopularScience} from '../../api'
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
const route = useRoute();
const articles = ref([

]);
const show1=ref(true)


const currentUrl=ref('')
function showIframe(urlname:any){
  let lastSlashIndex = urlname.lastIndexOf('/');
let lastPart = urlname.substring(lastSlashIndex + 1);
console.log("路径",lastPart)
router.push({
    path: "learn/detailurl",
    query: {address:lastPart},
  });
   store.url=urlname
   show1.value=false
}

//每行最后一个不margin-right
function isLastItemOnRow(index) {
  return (index + 1) % 3 === 0;
}

async function  getPopulation() {
   let res=await reqgetPopularScience()
   articles.value=res
   console.log("aaa觉得v好吧",articles.value,res)
}
// 使用 watch 函数来监听路由变化  
watch(  
  () => route.path,  
  (newPath, oldPath) => {  
    if (newPath === '/learn') {  
      show1.value = true;  
    }  
  },  
  { immediate: false } // immediate: false 表示不在第一次渲染时触发回调  
);

onMounted(()=>{
  getPopulation()
})
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #d94948;
  font-weight: 700;
  font-family: "Comic Sans MS", sans-serif;
}
.learn-container {
  // background-color: rgba(1, 22, 38, 0.5);
  .elementor-container {
    max-width: 1170px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    flex-direction: column;
    .elementor-box {
      display: flex;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
      position: relative;
      width: 100%;
      .top-title {
        width: 100%;
        text-align: center;
      }
      .blog-box {
        // display: flex;
        width: 1170px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        flex-wrap: wrap;
        align-items: flex-start;
        .blog {
          background-color: #fff;
          height: 276px;
          width: 366px;
          margin-right: 35px;
          margin-bottom: 30px;
          position: relative;
          display: flex;
          flex-direction: column;
          .header-section {
            position: absolute;
            padding: 0 30px;
            width: 83%;
            text-align: left;
            h3 {
              margin-bottom: 25px;
            }
          }
          .bottom-time {
            position: absolute;
            border-top: 1px solid #eaeaea;
            padding: 0 30px;
            color: #adadad;
            height: 47px;
            width: 83%;
            bottom: 0;
            margin-right: 30px;
          }
        }
        .no-margin-right {
          margin-right: 0;
        }
      }
    }
    .change-box {
      text-align: right;
      margin-top: -20px;
      margin-bottom: 30px;
    }
  }
}
</style>
