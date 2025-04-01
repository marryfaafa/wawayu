<template>
  <div class="center-container">
    <div class="top-sidebar">
      <div class="inner-sidebar">
        <ul>
          <li
            v-for="item in centerMenu"
            :key="item.index"
            style="
              display: inline-block;
              margin-right: 50px;
              padding-bottom: 5px;
            "
            :class="{ active: item.index == isActive }"
            @click="ClickCenterMenu(item.index)"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
    <div class="article-box">
      <div class="inner-article">
        <ul>
          <li v-for="item in articleList" @click="toDetail(item)">
            <div class="top-title">{{ item.title }}</div>
            <div class="introduce">
              <span
                style="
                  font-size: 14px;
                  color: #129d69;
                  display: inline-block;
                  max-width: 200px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
                >{{ item.username }}</span
              >
              <span
                style="
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  background-color: #ced4da;
                  margin: 0 7px;
                "
              ></span>
              <p style="color: #727b82">{{ item.createTime }}</p>
              <span
                style="margin-left: 20px; display: flex; align-items: center"
              >
                <img
                  src="../../../assets/icons/点赞.svg"
                  alt=""
                  style="height: 17px; width: 17px; margin-right: 5px"
                />
                <p style="color: #a6a8a9">{{ item.likes }}</p>
              </span>
              <span
                style="margin-left: 20px; display: flex; align-items: center"
              >
                <img
                  src="../../../assets/icons/评论.svg"
                  alt=""
                  style="height: 17px; width: 17px; margin-right: 5px"
                />
                <p style="color: #a6a8a9">{{ item.commentNumber }}</p>
              </span>
            </div>
          </li>
          <div class="bottom-box">
            <div class="fenye">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, computed, watch, defineEmits } from "vue";
import { FunctionStore } from "../../../store/modules/function";
import { useRouter } from "vue-router";
import { ElPagination } from "element-plus";
import { reqRecommend, reqSearchArticle } from "@/api";

const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
const emit = defineEmits([]);

const currentPage = ref(1);
const total = ref(0);

const articleData = computed(() => store.articleData);
const clearFlag = computed(() => store.clearFlag);
const like=computed(()=>store.like)

const centerMenu = ref([
  { index: 0, value: "推荐" },
  { index: 1, value: "周榜" },
  { index: 2, value: "月榜" },
  { index: 3, value: "最新" },
]);

const articleList = ref([]);
const isActive = ref(0);

//中间点击事件
async function ClickCenterMenu(index) {
  isActive.value = index;
  store.clearFlag = true;
  let res = await reqRecommend(1, isActive.value + 1);
    getBatch(res);
}

function toDetail(item) {
  console.log("细节，", item);
  router.push({
    path: "community/detail",
    query: { articleId: item.id },
  });
  store.article=item
  // router.push({ name: "ArticleDetail" });
}

function handleCurrentChange(val) {
  currentPage.value = val;
  getData();
}

async function getData() {
  console.log("页数", currentPage.value, isActive.value + 1);
  //获取文章
  if (clearFlag) {
    let res = await reqRecommend(currentPage.value, isActive.value + 1);
    getBatch(res);
  }
  //搜索文章
  else {
    console.log("sousuobjvjs", isActive.value + 1);
    let res = await reqSearchArticle(store.searchTerm, currentPage.value);
    getBatch(res);
  }
}

function getBatch(data) {
  console.log("结果", data);
  total.value = data.total;
  // const responseData = data.record;
  // // 在每个数据对象中添加index属性
  // const dataWithIndex = responseData.map((item, index) => ({
  //   ...item,
  //   index,
  // }));

  articleList.value = data.record;
  console.log("sss", articleList.value, total.value);
}

function handleEvent(data: object) {
  console.log(data, "事件");
}

onMounted(() => {
  //拉取文章
  getData();
});

// 现在可以监听这两个计算属性的变化
watch([articleData, clearFlag,like], (newValues, oldValues) => {
  console.log("userData changed:", newValues, oldValues);
  const [newarticleData, newclearFlag,newLike] = newValues;
  const [oldarticleData, oldclearFlag,oldLike] = oldValues;
  console.log("呢访问",newValues,newValues[0].total)
  if (newarticleData) {
    getBatch(newValues[0]);
  }if(newLike){
   // 使用 find 方法找到 id 相等的对象  
const articleToUpdate = articleList.value.find(article => article.id === store.article.id);  
  // 检查是否找到了对象  
  if (articleToUpdate) {  
    // 如果找到了，就修改它的 like 值  
    articleToUpdate.likes += store.like; // 或者设置为特定的值，比如 articleToUpdate.like = 10;  
    // 如果你想查看修改后的数组（尽管 find 方法不会修改原数组，只是返回了找到的对象的引用）  
    console.log(articleList); // 输出修改后的 arrayList，其中 id 为 editId 的对象的 like 值已被修改  
  } 
  }
});
</script>
<style lang="scss" scoped>
li {
  cursor: pointer;
  list-style: none;
  font-size: 18px;
}
p {
  font-size: 14px;
}

.center-container {
  position: absolute;
  width: 100%;
  height: 100%;
  .top-sidebar {
    position: absolute;
    width: 60%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ul {
      .active {
        border-bottom: 2px solid #00965e;
      }
    }

    .inner-sidebar {
    }
  }
  .article-box {
    height: 992px;
    width: 60%;
    background-color: #fff;
    border: 1px solid #e1e2e3;
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner-article {
      position: relative;
      width: 680px;
      height: 944px;
      text-align: left;
      ul {
        position: absolute;
        width: 100%;
        padding-left: 0;
        li {
          width: 650px;
          height: 74px;
          font-size: 16px;
          border-bottom: 1px solid #f0f0f0;
          margin-top: 10px;
          padding-left: 30px;
          //   margin-left: -30px;
          .top-title {
            width: 96%;
            color: #212529;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .introduce {
            display: flex;
            align-items: center; /* 垂直居中 */
          }
        }
        .bottom-box {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 105px;
        }
        .fenye {
          flex-wrap: wrap;
          width: 323px;
          height: 33px;
        }
      }
    }
  }
}
</style>
