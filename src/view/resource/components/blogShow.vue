<template>
  <div class="blog-container">
    <div class="blog-box">
      <div
        v-for="(item, index) in articles"
        :key="index"
        class="blog"
        :class="{ 'no-margin-right': isLastItemOnRow(index) }"
        @mouseenter="showOverlay(index)"
        @mouseleave="hideOverlay(index)"
        @click="modify(index, item)"
      >
        <div class="header-section">
          <h3>
            <a
              href="http://giantsalamanders.cn/%e6%b1%9f%e8%a5%bf%e5%a4%a7%e9%b2%b5-%e4%b8%96%e7%95%8c%e6%96%b0%e7%a7%8d%e5%a4%a7%e9%b2%b5%e5%8f%91%e7%8e%b0%e5%a7%8b%e6%9c%ab/
				"
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
            {{ item.describtion }}
          </p>
          <a href="" style="margin-bottom: 20px">Read More » </a>
        </div>
        <div class="bottom-time">
          <span style="line-height: 47px">{{ item.time }}</span>
        </div>
        <!-- 遮盖层 -->
        <div class="overlay" v-show="overlays[index]">
          <h2
            style="
              cursor: pointer;
              font-size: 40px;
              text-shadow: 2px 2px 4px rgba(0, 0, 50, 0.8),
                4px 4px 8px rgba(0, 0, 100, 0.6);
            "
          >
            修改
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, defineEmits } from "vue";
import { FunctionStore } from "../../../store/modules/function";
import { useRouter } from "vue-router";
import { getPositionDataWithUnit } from "element-plus";
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
const emit = defineEmits(["modify"]);
// 显示遮盖层的方法
const showOverlay = (index: number) => {
  overlays.value[index] = true;
};

// 隐藏遮盖层的方法
const hideOverlay = (index: number) => {
  overlays.value[index] = false;
};

const articles = ref([
  //   {
  //     id: 1,
  //     name: "江西大鲵——世界新种大鲵发现始末",
  //     time: "11月 28, 2023 ",
  //     description: "When Liang Congjie, known for founding F",
  //   },
]);
// 初始化 overlays 数组，与 articles 长度相同，每个元素初始为 false
const overlays = ref(new Array(articles.value.length).fill(false));

//每行最后一个不margin-right
function isLastItemOnRow(index) {
  return (index + 1) % 3 === 0;
}
async function getData() {
  console.log("资料1")
  store.getSciene().then((res) => {
    articles.value = res;
    console.log(res);
  });
}
//修改
function modify(index, item) {
  if (overlays.value[index] == true) {
    emit("modify");
    store.blogId = item.id;
    console.log("发送", item.id);
  }
}

onMounted(() => {
  getData();
});
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #d94948;
  font-weight: 700;
  font-family: "Comic Sans MS", sans-serif;
}
.blog-container {
  display: flex;
  justify-content: center;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* 遮盖层上文字的颜色 */
  /* 其他样式 */
}
.blog-box {
  // display: flex;
  margin-top: 20px;
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
</style>
