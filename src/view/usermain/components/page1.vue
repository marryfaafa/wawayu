<template>
  <div class="page1-container">
    <div class="title-cont" id="showcont">
        <div class="title">大鲵繁育研究基地</div>
        <div class="rich">中国魅力·大鲵摇篮</div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps, onMounted} from 'vue';
import {useRouter} from 'vue-router'
const props=defineProps({});
const router=useRouter();
onMounted(()=>{
    console.log("进入页面1")
})
</script>
<style lang='scss' scoped>
.page1-container {
  width: 100%;
  height: 720px;
  background-image: url(../../../assets/images/666.jpg);
  background-size: 100% 720px;
  background-repeat: no-repeat;
  background-color:#000;
  position: relative;
  .title-cont{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top:13%;
    right:1.5%;
    animation: showcont 1.5s linear 0s 1 normal forwards;  
    .title {
        font-size: 50px;
        letter-spacing: 3px;
        color: #fff;
        font-weight: 600;
    }
    .rich {
        margin-top: 20px;
        padding: 5px 15px;
        background-color: #ffffff4d;
        font-size: 30px;
        letter-spacing: 4px;
        color: #ffffffe6;
    }
  }
}
@keyframes showcont {  
  from {  
    opacity: 0;  
    transform: translateY(-100%);  
  }  
  to {  
    opacity: 1;  
    transform: translateY(0);  
  }  
}  
</style>