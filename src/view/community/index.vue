<template>
  <div class="container">
    <router-view></router-view>
    <div class="container-box" v-if="route.meta.showFather">
      <div class="container-inner">
        <div class="left-choice">
          <ul style="margin-top: 20px">
            <li
              v-for="item in leftmenu"
              :key="item.index"
              :class="{ active: item.index == isActive }"
              @click="ClickLeftMenu(item.index)"
            >
              <img
                :src="item.img"
                alt=""
                style="height: 13px; width: 13px; z-index: 200"
              />
              {{ item.value }}
            </li>
          </ul>
        </div>
        <div class="center-article" v-show="isActive === 0">
          <CenterArticle></CenterArticle>
        </div>
        <div class="right-tap" v-if="isActive === 0">
          <rightTap></rightTap>
        </div>
        <div class="myself-heading" v-if="isActive === 1">
          <myselfHeading
            @SubmitBody="handSubmit"
            :parentData="info"
            v-if="info"
          ></myselfHeading>
        </div>
        <div class="myself-main" v-if="isActive === 1">
          <div class="myself-aside" v-if="isActive === 1">
            <myselfAside  :parentData="record"
            v-if="record"></myselfAside>
          </div>
          <div class="myself-list" v-if="isActive === 1">
            <myselfList @Edit="handSubmit1"></myselfList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import myselfList from "./components/myselfList.vue";
import myselfAside from "./components/myselfAside.vue";
import myselfHeading from "./components/myselfHeading.vue";
import rightTap from "./components/rightTap.vue";
import CenterArticle from "./components/centerArticle.vue";

import { ref, defineProps, onMounted } from "vue";
import { FunctionStore } from "../../store/modules/function";
import {UserStore} from '../../store/modules/user'
import { useRouter, useRoute } from "vue-router";
import { reqgetInformation } from "@/api";
const props = defineProps({});
const store = FunctionStore();
const store1=UserStore()
const router = useRouter();
const route = useRoute();
const leftmenu = ref([
  { index: 0, value: "推荐", img: "../../assets/icons/左对齐.svg" },
  { index: 1, value: "我的", img: "../../assets/icons/咨询.svg" },
]);
const isActive = ref(0);
const info=ref([]) 
const record=ref([])
function ClickLeftMenu(index) {
  isActive.value = index;
  store.clearFlag = true;
}
//发表文章
function handSubmit() {
  // router.push({ name: "Submit" });
  console.log("跳转");
  store1.editId=0;
  router.push({
    name: "Publish",
  });
}
//编辑文章
function handSubmit1() {
  // router.push({ name: "Submit" });
  console.log("跳转");
  router.push({
    name: "Publish",
  });
}
//跳转文章详情
function handTodetail() {
  console.log("跳转");
  // router.push({
  //   // path: "community/detail",
  //   name: "ArticleDetail",
  //   // query: { articleId: item.id },
  // });
  router.push({
    name: "aDetail",
    params: {
      articleid: 1,
    },
  });
}

async function getData() {
  let res = await reqgetInformation();
  console.log(res, "ls不ii");
  record.value=res
  info.value = res.information;
}
onMounted(() => {
  getData();
});

onMounted(() => {
  window.scrollTo(0, 0);
  console.log("jinru");
});
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 1097px;
  .container-box {
    background: #e9ecef;
    position: absolute;
    // height: 100%;
    height: 1100px;
    width: 100%;

    .container-inner {
      position: relative;
      display: grid;
      height: 100vh;
      max-width: 1170px;
      grid-template-columns: 14% 60% 25%; /* 创建三列，分别占据 10%，60%，30% 的宽度 */
      grid-gap: 10px; /* 可选，定义列之间的间隙 */
      margin-left: auto;
      margin-right: auto;
      .left-choice {
        text-align: center;
        margin-left: -42px;
        ul {
          color: #2c2c2c;
          list-style: none;
          li {
            width: 167px;
            height: 44px;
            line-height: 44px;
            border-radius: 5px;
            cursor: pointer;
          }
          .active {
            background-color: #129d69;
            color: #fff;
          }
        }
      }
      .center-article {
        display: flex;
      }
      .myself-heading {
        height: 157px;
      }
      .myself-main {
        position: absolute;
        width: 89.5%;
        left: 14.8%;
        top: 158px;
        display: grid;
        grid-template-columns: 27% 72%; /* 创建三列，分别占据 10%，60%，30% 的宽度 */
        grid-gap: 10px; /* 可选，定义列之间的间隙 */
        .myself-aside {
          position: relative;
          display: flex;
          justify-content: flex-start;
          height: 500px;
        }
        .myself-list {
          position: relative;
          border-radius: 2px;
          box-sizing: border-box;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
