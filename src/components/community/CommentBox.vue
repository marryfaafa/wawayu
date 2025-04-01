<template>
  <div class="comment-side-tit">
    <div class="comment-side-tit-count">评论</div>
    <el-icon><CloseBold style="height: 12px;width: 12px;cursor: pointer;  color: #222226;" @click="close"/></el-icon>
  </div>
  <div class="comment-edit-box">
    <div class="user-img">
        <img src="../../assets/images/10003.jpg" alt=""style="height: 30px;width: 30px;border-radius: 15px;">
        </div>
        <form @submit.prevent="publishCom">
            <textarea name="" id="" class="comment" placeholder="欢迎高质量的评论，低质的评论会被折叠" v-model="inputText"></textarea>
            <div class="comment-operate-box">
                <div class="comment0operate-1">
                    <span class="tip">
                        还能输入
                        <em>{{ remainingChars }}</em>
                        个字符
                    </span>
                </div>
                <div class="comment-operate-r">
                    <div class="comment-operate-item"><button @click="submit">评论</button></div>
                </div>
            </div>
        </form>
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps,defineEmits,computed} from 'vue';
import {FunctionStore} from '../../store/modules/function'
import {UserStore} from '../../store/modules/user'
import {useRouter,useRoute} from 'vue-router'
import {ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
const props=defineProps({});
const store=FunctionStore();
const store1=UserStore()
const router=useRouter();
const route=useRoute();
const emit=defineEmits(['CloseComment'])
const show1=ref(false)

// 假设最大字符数为1000  
const maxChars = 1000;  
    const inputText = ref('');  
    // 使用computed来计算剩余字符数  
    const remainingChars = computed(() => {  
      return maxChars - inputText.value.length;  
    });  

function close(){
    emit('CloseComment')
}
function publishCom(){
    if(!inputText.value){
       ElMessage.warning("你还没有评论")
       return ;
    }
    const paramValue = route.query.articleId; 
    console.log("sdggd",paramValue)
    let time=store.FormatTime();
    store.Publish(paramValue,inputText.value,time).then(()=>{
        ElMessage.success("发表成功")
       store.comment={username:store1.username,commentTime:time,commentContent:inputText.value,
    userAddress:store1.avatar}
    console.log("新增评论",store.comment)
    })

}

</script>
<style lang='scss' scoped>
.comment-side-tit {
    // position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 24px 24px 16px 24px;
    border-bottom: 1px solid #e8e8ed;
    align-items: center;
    .comment-side-tit-count {
        color: #222226;
        font-size: 14px;
    }
   
}
.comment-edit-box {
       display: flex ;
       justify-content: space-between; 
       padding: 12px 24px;
       .user-img {
        margin-right: 8px;
        padding-top: 9px;
       }
       form {
        width: 100%;
        position: relative;
        background: rgba(245,246,247,0.8);
        border-radius: 8px;
        padding: 14px 0;
        textarea {
            display: block;
            width: 100%;
            background: rgba(248,249,251,0.8);
            padding: 0 16px;
            height: 88px;
            font-size: 14px;
            line-height: 22px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            outline: none
        }
        .comment-operate-box{
            display: flex;
            justify-content: space-between;
            padding: 8px 16px 0 16px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            transition: display .3s ease-in-out;
            .comment0operate-1 {
                .tip {
                    font-size: 12px;
                    color: #999aaa;
                    line-height: 17px;
                    em {
                        color: #222226;
                    }
                }
            }
            .comment-operate-r {
                display: flex;
                align-items: center;
                .comment-operate-item {
                    margin-left: 12px;
                 button {
                    display: inline-block;
                    width: 60px;
                    height: 24px;
                    background: #fc5531;
                    border-radius: 16px;
                    text-align: center;
                    border: none;
                    color: #fff;
                    font-size: 14px;
                 }
                 .comment-operate-tip {
                    position: absolute;
                    right:70px;
                    top:136px;
                    width: 60px;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    background: #222226;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
                    color: #fff;
                    z-index: 2000;
                 }
                 .comment-emotion-box {
                    width: 246px;
                    padding: 8px 0;
                    z-index: 2001;
                    position: absolute;
                    right:25px;
                    top:134px;
                    background: #fff;
                    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.1);
                    border-radius: 4px;
                 }
                }
            }
        }
       }
    }
</style>