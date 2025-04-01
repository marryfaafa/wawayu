<template>
  <div class="myself-list-container">
    <div class="navList">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.index"
          @click="getArticle(item.index,0)"
        >
          <span :class="{ active: item.index == isActive }">{{
            item.name
          }}</span>
          <span v-if="item.index == 0" class="nav-li-num">{{ store.createNum }}</span>
        </li>
      </ul>
    </div>
    <div class="mainContent">
      <div class="blog-second-list" v-if="isActive==0">
        <ul class="second-ul">
          <li
            @click="myArticle(1)"
            :class="{ secactive: secondActive == 1 }"
          >
            按发布时间
          </li>
          <li
            @click="myArticle(2)"
            :class="{ secactive: secondActive == 2 }"
          >
            按访问量
          </li>
        </ul>
      </div>
      <ul class="article">
        <li v-for="(item,index) in articleItems" :key="index">
          <a class="blog">
            <img src="../../../assets/images/10003.jpg" alt="" />
            <div class="blog-cont">
              <div class="blog-top">
                <h4 @click="showDetail(item.id)" class="article-title">{{item.title}}</h4>
                <div class="describe">{{item.content}}</div>
              </div>
              <div class="blog-footer">
                <div class="left">
                  <div class="article-type">{{ isActive===0?'原创':item.username }}</div>
                  <div class="view">发布博客 {{item.time}}</div>
                  <div class="view">{{item.visitNum}}&nbsp;&nbsp;阅读</div>
                  <div class="view">{{item.likeNum}}&nbsp;&nbsp;点赞</div>
                  <div class="view">{{item.commentNum}}&nbsp;&nbsp;评论</div>
                </div>
              </div>
            </div>
            <span class="btn-edit" @click="edit(item)" v-if="isActive===0">编辑</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, computed, watch,defineEmits } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";
import { reqgetArticleByTap, reqgetMyArticle } from "@/api";
import { FunctionStore } from '../../../store/modules/function'

const props = defineProps({});
const store = UserStore();
const router = useRouter();
const functionStore = FunctionStore()
const emit=defineEmits(['Edit'])

const menuItems = ref([
  { index: 0, name: "文章" },
  { index: 1, name: "点赞" },
  { index: 2, name: "评论" },
]);
const articles=computed(()=>store.articles)
const title=computed(()=>store.title)
const content=computed(()=>store.content)
// 监听 articles 变化

// 使用 watch 监视 articles, title, content 的变化  
watch([articles, title, content], ([newArticles, newTitle, newContent], [oldArticles, oldTitle, oldContent]) => {  
  console.log('旧的 articles 值:', oldArticles);  
  console.log('新的 articles 值:', newArticles);  
  console.log('旧的 title 值:', oldTitle);  
  console.log('新的 title 值:', newTitle);  
  console.log('旧的 content 值:', oldContent);  
  console.log('新的 content 值:', newContent);  
  // 更新 articleItems 或执行其他操作  
  articleItems.value = newArticles; // 注意：这里假设 articleItems.value 应该等于新的 articles.value  
  if(store.editId===-1){
    getArticle(0,0)
  }
  //编辑的原有文章
  else if(store.editId!==0){
     // 使用 find 方法找到与 editId 相匹配的对象  
const articleToUpdate = articleItems.value.find(article => article.id === store.editId);  
  // 检查是否找到了对象  
  if (articleToUpdate) {  
    // 修改找到的对象的内容  
    articleToUpdate.title = store.title;
    articleToUpdate.content = store.content;
    console.log("找到了",articleToUpdate)
  }
  } 
});  
async function getArticle(index:any,choice:any) {
    isActive.value=index
    let res=await reqgetMyArticle(index,choice)
    articleItems.value=res
    store.tap=''
    console.log("我的v吧dbgdfb",res)
}
async function myArticle(index:any){
  secondActive.value=index
  if(store.tap!==''){
    let res=await reqgetArticleByTap(store.tap,secondActive.value)
    articleItems.value=res;
  }else{
    getArticle(isActive.value,secondActive.value)
  }
}

//编辑
function edit(item:any){
  store.editId=item.id
  console.log("发送编辑",store.editId)
  emit('Edit')
}
onMounted(()=>{
  getArticle(0,0)
  // if(store.formData.state==="已发布"){
  //   articleItems.value.push()
  // }
})


const secondActive = ref(1);
const isActive = ref(0);
const articleItems = ref([]);

// 添加点击处理函数
const showDetail = (id) => {
  if (!functionStore.article) {
    functionStore.article = {}  // 如果 article 不存在，先初始化为空对象
  }
  functionStore.article.id = id
  console.log("点击", functionStore.article.id)
  router.push('/community/detail')
}
</script>
<style lang="scss" scoped>

div {
  background-color: #fff;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  li {
    text-align: center;
    cursor: pointer;
  }
}
a {
  text-decoration: none;
  outline: none;
}
h4 {
  font-size: 18px;
  font-weight: normal !important;
  line-height: 24px;
  color: #222226;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
  display: -webkit-box;
  padding: 0;
  box-sizing: border-box;
  margin: 0;
}
h4:hover {
  color: #fc5531;
}
.describe {
  color: #555666;
  margin-top: 4px;
  line-height: 19px;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
}
.myself-list-container {
  position: absolute;
  width: 95%;
  .navList {
    height: 48px;
    line-height: 48px;
    border-radius: 2px 2px 0 0;
    width: 100%;
    box-shadow: 0 1px 0 0 #e8e8ed;
    border-bottom: 1px solid #f0f0f2;
    ul {
      font-size: 16px;
      color: #555666;
      li {
        margin-left: 24px;
        padding: 0;
        .nav-li-num {
          font-size: 14px;
          color: #999aaa;
          padding-left: 2px;
        }
        .active {
          display: inline-block;
          height: 47px;
          border-bottom: 2px solid #222226;
        }
      }
    }
  }

  .mainContent {
    max-height: 770px;
    overflow-y: scroll;
    .blog-second-list {
      height: 40px;
      display: flex;
      align-items: center;
      // padding: 0 24px;
      border-bottom: 1px solid #f0f0f2;
      top: 1px;
      position: relative;
      ul {
        font-size: 14px;
        font-weight: 500;
        li {
          line-height: 40px;
          color: #222226;
          padding: 0 24px;
        }
        .secactive {
          color: #fc5531;
        }
      }
    }
    .article {
      margin: 0 24px;
      border-bottom: 1px solid #f0f0f2;
      position: relative;
      display: flex;
      flex-direction: column;
      // height: 149px;
      // height: 400px;

      li {
        height: 149px;
        width: 100%;
        flex: 1;
        border-bottom: 1px solid #f0f0f2;
        display: flex;
        align-items: center;
        text-align: left;
        margin-bottom: 20px;
        position: relative;
        .blog {
          display: flex;
          img {
            height: 100px;
            width: 178px !important;
            margin-right: 14px;
            object-fit: cover;
            display: block;
            border: 1px solid #f5f6f7;
          }
          .blog-cont {
            display: flex;
            flex-direction: column;
            .blog-top {
              width: 100%;
              .describe {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis; /* 用省略号表示被截断的文本 */   
                width: 98%; 

              }
            }
            .blog-footer {
              display: flex;
              margin-top: 33px;
              .left {
                display: flex;
                align-items: center;
                width: 100%;
                .article-type {
                  color: #e33e33;
                  background-color: rgba(227, 62, 51, 0.1);
                  text-align: center;
                  width: 34px;
                  height: 20px;
                  line-height: 20px;
                  border-radius: 2px;
                  font-size: 12px;
                  margin-right: 8px;
                }
                .view {
                  color: #555666;
                  line-height: 20px;
                  font-size: 14px;
                  margin-right: 8px;
                }
              }
            }
          }
        }
        .btn-edit {
          position: absolute;
          bottom: 24px;
          right: 10px;
          color: #555666;
          display: none;
        }
      }
      li:hover .btn-edit {
        display: block;
      }
    }
  }
}

.article-title {
  cursor: pointer;
  &:hover {
    color: #fc5531;
  }
}
</style>
