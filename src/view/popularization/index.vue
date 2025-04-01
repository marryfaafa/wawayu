<template>
  <div class="popular-container" >
    <div class="inner-container">
            <daniContent1 style="width: 1002px;height: 550px;margin: 0 auto;display: flex; flex-wrap: wrap; "></daniContent1>
        
    <daniContent2 style="padding: 0;margin: 0 auto;margin-bottom: 45px;width: 85%;"></daniContent2>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps,watch} from 'vue';
const props=defineProps({});
const router=useRouter();
import {useRouter,useRoute} from 'vue-router'
const route=useRoute()

import daniContent1 from './components/daniContent1.vue'
import daniContent2 from './components/daniContent2.vue'
// 假设你使用的是Vue.js  
// 定义一个函数来处理背景颜色的变化  
function handleBackgroundChange() {  
  const container = document.querySelector('.inner-container');  
  if (container) {  
    if (route.path !== '/popularization') {  
      container.classList.add('no-background');  
    } else {  
      container.classList.remove('no-background');  
    }  
  }  
}  
// 监听路由变化  
watch(() => route.path, (newPath) => {  
  handleBackgroundChange();  
}); 

</script>
<style lang='scss' scoped>
.popular-container{
    display: flex;
    min-height: 620px;
    .inner-container {
        background: #fff;
        width: 100%;
        min-height: 1100px;
    }
}
.no-background {  
  background: none !important; /* 注意使用!important可能需要，具体取决于你的CSS优先级 */  
}
</style>