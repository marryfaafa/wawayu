<template>
  <div class="comment-detail">
    <div class="comment-box">
      <div class="top-nav" style="
    width: 100%;
    border-bottom: 1px solid #F0F0F0;
    height: 40px !important;
    padding: 0 20px;
    line-height: 40px;">
      
       {{len}}个回答
  </div>
  <ul style="padding: 0 20px;" v-for="(item,index) in List" :key="index">
    <li style="border-bottom: 1px solid #F0F0F0;position: relative;padding: 15px 0 ;">
       <div class="author" style="display: flex;flex-wrap: nowrap;align-items: center">
        <img :src="item.userAddress" alt="" style="height: 40px;width:40px;border-radius:20px;vertical-align: middle;">
        <div class="info" style="display: flex;flex-wrap: nowrap;align-items: center;font-size: 14px;margin-left: 10px;"><p class="nickname" style="color: #129D69;"> {{item.username}} </p>
        <span class="dot"></span>
        <p style="color: #727B82;margin-left: 2px;">发布于 {{item.commentTime}} </p>
      </div>
       </div>
       <div class="text" style="margin-top:10px">{{item.commentContent}}

</div>
       <!-- <div class="action" style="margin-top: 10px;margin-left: 400px;font-size: 12px;color: #838383;line-height: 28px;text-align: center;cursor: pointer;">
         <div style="display: inline-block;border-radius: 14px 0 0 14px;border: 1px solid #B5B5B5;width: 64px;height: 28px;" @click="tagger1(1)" >赞<img src="../../assets/icons/zan1.svg" alt="" style="height: 12px;width: 12px;margin-left: 3px;margin-top: 5px;" v-if="!show1">
        <img src="../../assets/icons/zan.svg" alt="" style="height: 12px;width: 12px;margin-left: 3px;margin-top: 5px;" v-else>
        </div>
         <div style="display: inline-block;border-radius: 0px 14px 14px 0;border: 1px solid #B5B5B5;height: 28px;width: 64px;" @click="tagger1(2)">踩<img src="../../assets/icons/踩.svg" alt="" style="height: 14px;width: 14px;margin-left: 3px;margin-top: 5px;" v-if="!show2"
          >
          <img src="../../assets/icons/踩.svg" alt="" style="height: 14px;width: 14px;margin-left: 3px;margin-top: 5px;" v-else>
        </div>
      </div> -->
    </li>
  </ul>
    </div>
  
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, computed,watch } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter } from "vue-router";
import { useWatch } from "element-plus/es/components/slider/src/composables";
const props = defineProps({
  message:{
    type:Object,
    require:true,
  }
});
const store = FunctionStore();
const router = useRouter();

const len=ref(0)
const List=ref([])
const menu=computed(()=>store.comment)
watch(menu,(newValue,oldValue)=>{
   if(newValue!=null){
     // 使用unshift方法将新项添加到列表的最前面  
  List.value.unshift(newValue); 
  len.value++
   }
})
onMounted(()=>{
  console.log("wrd模拟计划v吧，",props.message)
  if(props.message){
    len.value=props.message.length;
  List.value=props.message
  console.log("sfd",len)
  }
  
})
// watch()
</script>
<style lang="scss" scoped>
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: #ced4da;
  margin-right: 5px;
  margin-left: 3px;
}
.commment-detail {
  width: 793px;
  .comment-box {
    width: 793px;
    padding: 0 20px;
    position: relative;
    .top-nav {
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #F0F0F0;
    height: 40px !important;
  }
  ul {
    li {
     
    }
  }
  }
  
 
  
}
</style>
