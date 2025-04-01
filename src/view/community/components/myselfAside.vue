<template>
  <div class="aside-container">
    <div class="common-box">
      <div class="common-box-head">个人成就</div>
      <div class="common-box-bottom">
        <div class="common-box-content">
          <ul style="padding: 0; list-style: none">
            <li>
              <img
                src="../../../assets/images/点赞.png"
                alt=""
                style="height: 22px; width: 22px; margin-right: 10px"
              />
              <span
                >获得<i style="margin: 0 3px">{{ number.like }}</i
                >次点赞</span
              >
            </li>
            <li>
              <img
                src="../../../assets/images/评论.png"
                alt=""
                style="height: 22px; width: 22px; margin-right: 10px"
              />
              <span
                >内容获得<i style="margin: 0 3px">{{ number.common }}</i
                >次评论</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="user-special">
      <div class="common-box-head">TA的专栏</div>
      <div class="special-bottom">
        <ul>
          <li v-for="(item,index) in tapItems" :key="index" @click="getTapArticle(item,1)">
            <a >
              <div class="column-bar"></div>
              <img
                src="https://img-blog.csdnimg.cn/20190918140129601.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
                alt=""
              />
              <span>{{ item.name }}</span>
            </a>
            <div class="column-num">{{ item.number }}篇</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";
import { reqgetArticleByTap } from "@/api";
const props = defineProps({
  parentData :{
    type:Object,
    require:true
  }
});
const store = UserStore();
const router = useRouter();

const tapItems = ref([
]);

const number = reactive({
  like: 0,
  common: 0,
});

//根据标签获取文章
async function getTapArticle(item:any,option:any) {
   let res=await reqgetArticleByTap(item.name,option)
   //赋值给仓库，获取的数组文章和搜索的name
   store.articles=res
   store.tap=item.name
}
onMounted(()=>{
  number.like=props.parentData.information.likeNum
  number.common=props.parentData.information.commentNum
  tapItems.value=props.parentData.record
  console.log("djsfhweu你好asv",props.parentData,props.parentData.record)
})
</script>
<style lang="scss" scoped>
.common-box-head {
  font-size: 16px;
  color: #222226;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: 1px solid #e8e8ed;
}
.aside-container {
  width: 100%;
  // height: 100%;
  font-size: 14px;
  color: #555666;
  .common-box {
    position: absolute;
    height: 176px;
    width: 100%;
    margin: 10px 0px;
    border-radius: 2px;
    background-color: #fff;

    .common-box-bottom {
      padding: 16px;
      height: 58%;
      li {
        margin-bottom: 12px;
        height: 22px;
        display: flex;
      }
    }
  }
  .user-special {
    margin-top: 196px;
    background-color: #fff;
    border-radius: 2px;
    margin-bottom: 20px;
    height: 631px;
    overflow-y: scroll;
    // height: 333px;
    .special-bottom {
      padding: 16px;
      // height: 76%;
     
      ul {
        border-left: 1px dashed #ccccd8;
        list-style: none;
        //height: 76%;
        padding-left: 0;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          .column-num {
            color: #999aaa;
            line-height: 16px;
            margin-left: 16px;
          }
          a {
            text-decoration: none;
            outline: none;
            .column-bar {
              width: 12px;
              height: 1px;
              border-bottom: 1px dashed #ccccd8;
            }
            img {
              width: 24px;
              height: 24px;
              border: 1px solid #e8e8ed;
              border-radius: 2px;
              margin-right: 8px;
              margin-left: 4px;
            }
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          a:hover {
            color: #fc5531;
          }
        }
      }
    }
  }
}
</style>
