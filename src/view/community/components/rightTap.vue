<template>
  <div class="right-container">
    <div class="top-search">
      <div class="search">
        <input
          type="text"
          placeholder="搜索关键字"
          v-model="searchTerm"
          @keydown.enter="search"
        />
      </div>
    </div>
    <div class="hot-tap">
      <div class="heading">
        <div class="inner1">
          <span style="color: #000; font-size: 16px">热门标签</span>
          <div>
            <span style="color: #129d69; font-size: 14px">全部</span>
            <img
              src="../../../assets/icons/箭头.svg"
              alt=""
              style="height: 10px; width: 10px"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="inner2">
          <ul>
            <li v-for="item in Tapitems">
              {{ item.tagName }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hot-article">
      <div
        class="heading"
        style="justify-content: flex-start; padding-left: 15px"
      >
        <span style="color: #000; font-size: 16px">热门文章</span>
      </div>
      <div class="content" style="height: 530px">
        <ul style="list-style: none">
          <li v-for="item in ArticleItems" :key="item.index" @click="toDetail(item)">
            <div
              class="number"
              :class="['bg-' + (item.index < 3 ? item.index : 'default')]"
            >
              {{ item.index + 1 }}
            </div>
            <div class="text">{{ item.title }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, watch, onMounted } from "vue";
import { FunctionStore } from "../../../store/modules/function";
import { useRouter } from "vue-router";
import { reqSearchArticle, reqgetHotTap, reqgetHotArticle } from "@/api";

const props = defineProps({});
const store = FunctionStore();
const router = useRouter();

const searchTerm = ref("");
const clearFlag = computed(() => store.clearFlag);

const Tapitems = ref([]);

const ArticleItems = ref([]);

async function search() {
  console.log("搜索1", searchTerm.value, 1);
  let res = await reqSearchArticle(searchTerm.value, 1);
  console.log("搜索3", res);
  store.articleData = res;
  console.log(store.articleData);
  store.clearFlag = false;
  store.searchTerm = searchTerm.value;
}

function toDetail(item:any){
  router.push({
    path:'community/detail',
    query:{articleId:item.id}

  })
  store.article=item
}

async function getHot() {
  let res = await reqgetHotTap();
  Tapitems.value = res.slice(0, 9);
  console.log("热门3", Tapitems.value);
}

async function getArticle() {
  let res = await reqgetHotArticle();
  const responseData = res;

  // 在每个数据对象中添加index属性
  const dataWithIndex = responseData.map((item, index) => ({
    ...item,
    index,
  }));

  ArticleItems.value = dataWithIndex;
  console.log("文章3", ArticleItems.value);
}

onMounted(() => {
  getHot();
  getArticle();
});

// 现在可以监听这两个计算属性的变化
watch(clearFlag, (newValues, oldValues) => {
  console.log("userData changed:", newValues, oldValues);
  // console.log("total changed:", newTotal, oldTotal, newDeleteflag);
  // console.log("变化", tableData.value, total.value);
  if (newValues != oldValues) {
    searchTerm.value = "";
  }
  // 在这里执行你的逻辑
});
</script>
<style lang="scss" scoped>
.heading {
  position: absolute;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #f0f0f0;
  line-height: 30px;
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 30px;
  width: 100%;
  height: 173px;
  position: relative;
  display: flex;
  justify-content: center;
}
.right-container {
  position: absolute;
  width: 25%;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  .top-search {
    width: 100%;
    height: 70px;
    justify-content: center;
    align-items: center;
    position: relative;
    display: flex;
    .search {
      position: absolute;
      width: 90%;
      height: 33px;
      input {
        height: 33px;
        width: 100%;
        border: 1px solid #d6dbe0;
        border-radius: 4px;
        outline: none;
      }
    }
  }
  .hot-tap {
    width: 100%;
    height: 203px;
    display: flex;
    // align-items: center;
    justify-content: center;
    background-color: #fff;
    position: relative;

    .inner1 {
      position: absolute;
      display: flex;
      justify-content: space-between;
      width: 90%;
    }
    .inner2 {
      position: absolute;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 90%;
      ul {
        padding-left: 0;
        li {
          display: inline-block;
          // width: 58px;
          height: 24px;
          background-color: #3c81cd;
          border-radius: 3px;
          margin-right: 5px;
          margin-bottom: 10px;
          font-size: 14px;
          text-align: center;
          padding: 0 5px;
          cursor: pointer;
        }
        li:nth-child(1) {
          color: #222;
          background-color: #f6d200;
        }
        li:nth-child(2) {
          // width: 48px;
          color: #fff;
          background-color: #ff675b;
        }
        li:nth-child(3),
        li:nth-child(10),
        li:nth-child(12) {
          color: #62ff6c;
          background-color: #292d2c;
        }
        li:nth-child(4) {
          // width: 70px;
        }
        li:nth-child(6),
        li:nth-child(11) {
          color: #129d69;
          background-color: #e5f4ef;
        }
        li:nth-child(7) {
          color: #fff;
          background-color: #58ad91;
        }
        li:nth-child(8) {
          color: #fff;
          background-color: #9f35d8;
        }
      }
    }
  }
  .hot-article {
    margin-top: 20px;
    height: 560px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e1e2e3;
    ul {
      width: 100%;
      padding-left: 0;
      li {
        width: 100%;
        height: 54px;
        color: #495057;
        font-size: 16px;
        margin-bottom: 3px;
        display: flex;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .number {
          width: 20px !important;
          height: 20px;
          border-radius: 3px;
          background-color: #bebebe;
          color: #fff;
          text-align: center;
          font-size: 10px;
          line-height: 20px;
        }
        .number.bg-0 {
          background-color: #ff675b;
        }

        .number.bg-1 {
          background-color: #ffb461;
        }

        .number.bg-2 {
          background-color: #ffd261;
        }
        .text {
          width: 100%;
          height: 40px;
          line-height: 40px;
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis; /* 在文本溢出时显示省略号 */
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
