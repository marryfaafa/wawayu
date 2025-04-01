<template>
  <div class="content-container">
    <div class="title">{{store.article.title}}</div>
    <div class="tip">
      <span>
        <p class="author">{{ store.article.username }}</p>
        <span class="dot"></span>
        <p class="time">发布于{{store.article.createTime}}</p>
      </span>
    </div>
    <img :src="store.article.ossAddress" alt="" style="margin-top: 10px;"/>
    <div class="text" style="padding-right: 30px;margin-top: 10px;margin-bottom: 20px;">{{ store.article.content }}</div>
    <ul v-for="(item, index) in tapItems" :key="index">
      <li
        style="
          height: 24px;
          line-height: 24px;
          background-color: #e5f4ef;
          color: #129d69;
          font-size: 14px;
          text-align: center;
          padding: 0 5px;
          display: inline-block;
          margin-right: 10px;
        "
      >
        {{ item }}
      </li>
    </ul>
    <div class="btns item">
      <button class="comment" @click="toComment">评论</button>
      <button class="like" @click="likes">
        点赞<img
          v-if="!orLike"
          src="../../assets/icons/收藏2.svg"
          alt=""
          style="height: 20px; width: 20px"
        />
        <img
          v-if="orLike"
          src="../../assets/icons/收藏.svg"
          alt=""
          style="height: 20px; width: 20px"
        />
      </button>
    </div>
    <div class="commen-visit item">
      <span class="com1">
        <p>评论</p>
        <p>{{ store.article.commentNumber }}</p>
      </span>

      <span class="dot"></span>
      <span class="com1">
        <p>点赞</p>
        <p>{{ store.article.likes }}</p></span
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps,defineEmits, onMounted,computed,watch } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter } from "vue-router";
import { reqgetLikes,reqgetconcelLikes } from "@/api";
import { useWatch } from "element-plus/es/components/slider/src/composables";
const props = defineProps({
  message:{
    type:Object,
    require:true
  },
});
const store = FunctionStore();
const router = useRouter();
const emit=defineEmits(['comment'])
const menu=computed(()=>store.comment)
watch(menu,(newValue,oldValue)=>{
  if(newValue!==null){
    store.article.commentNumber++
  }
})
const orLike = ref(false); //是否点赞

const tapItems = ref([
]);

function toComment(){
  emit('comment')
}

//点赞
async function  likes() {
  if(orLike.value){
    let res=await reqgetconcelLikes(store.article.id);
    store.like=-1;
    store.article.likes--
  }else{
    let res=await reqgetLikes(store.article.id)
    store.like=1
    store.article.likes++
  }
  orLike.value=!orLike.value
}
onMounted(()=>{
  
  console.log("vgd",props.message)
  if(props.message){
    orLike.value=props.message.like
  tapItems.value=props.message.tapList
  }
  
})
</script>
<style lang="scss" scoped>
p {
  display: inline-block !important;
}
.item {
  margin-top: 20px;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: #ced4da;
  margin-right: 5px;
}
.content-container {
  //   display: flex;
  width: 793px;
  padding-left: 20px;
  background-color: #fff;
  position: relative;
  .title {
    font-size: 34px;
  }
  .tip {
    span {
      font-size: 14px;
      display: flex;
      align-items: center;
      .author {
        color: #129d69;
        font-size: 14px;
        margin-right: 5px;
      }

      .time {
        font-size: 14px;
        color: #727b82;
      }
    }
  }
  img {
    width: 372px;
    height: 200px;
  }
  .text {
    min-height: 50px;
    width: 793px;
  }
  ul {
    display: flex;
    display: inline-block;
  }
  .btns {
    display: flex;
    button {
      width: 69px;
      height: 39px;
      border-radius: 0;
      margin-right: 20px;
    }
    .like {
      color: #404040;
      background-color: #fff;
      border: 1px solid #e1e2e3;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .comment {
      background-color: #00965e;
      color: #fff;
    }
  }
  .commen-visit {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .com1 {
      margin-right: 5px !important;
      p {
        color: #727b82;
        font-size: 14px;
      }
    }
  }
}
</style>
