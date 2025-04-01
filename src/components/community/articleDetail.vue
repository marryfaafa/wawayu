<template>
  <div class="article-container">
    <div class="layout" v-if="showCommentBox" style="height: 100%;">
    </div>
    <div class="comment-box" v-if="showCommentBox">
      <CommentBox @CloseComment="showCommentBox=false"></CommentBox></div>
    <div class="main-container">
      <div class="article">
        <Article @comment="showCommentBox=true" :message="parentMessage" v-if="parentMessage"></Article>
      </div>
      <div class="comment">
        <CommentList :message="commentList" v-if="commentList"></CommentList>
      </div>
      <div class="relate">
        <Related :message="relateList" v-if="relateList"></Related>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, watch } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();

import Article from "./article.vue";
import CommentList from "./commentList.vue";
import CommentBox from './CommentBox.vue'
import Related from './related.vue'

import {reqgetStatementById} from '../../api'
const showCommentBox=ref(false)  //???????
const parentMessage = ref();
const commentList=ref()
const relateList=ref()

// 添加 watch 来监听 store.article.id 的变化
watch(() => store.article.id, async (newId) => {
  if (newId) {
    await getData()
  }
})

async function getData() {
  try {
    const res = await reqgetStatementById(store.article.id)
    console.log('获取到的文章详情:', res)
    parentMessage.value = res
    commentList.value = parentMessage.value.commentList
    relateList.value = parentMessage.value.relatedArticle
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

onMounted(() => {
  if (store.article.id) {
    getData()
  }
})
</script>
<style lang="scss" scoped>
.article-container {
  position: absolute;
  // height: 600px;
  width: 100%;
  min-height: 1100px;
  background-color: #e9ecef;
  z-index: 1000;
  padding-top: 15px;
  .layout{
   width: 100%;
   background: rgba(0, 0, 0, 0.3);
   z-index: 1005;
   position: absolute;
   top:0;
  }
  .comment-box {
    position: absolute;
    right:0;
    z-index: 2000;
    width: 382px;
    height: 620px;
    background-color: #fff;
    
  }
  .main-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .arcticle,
  .comment{
    flex: 1;
    width: 793px;
    color: #000;
    background-color: #fff;
  }
  .article {
    margin-bottom:20px;
  }
  .relate{
    position: absolute;
    top:15px;
    right:20px;
    background-color: #fff;
    width: 299px;
  height: 244px;
  
  }
}
</style>