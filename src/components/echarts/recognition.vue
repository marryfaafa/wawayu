<template>
  <div>
    <Chart2 :cdata="cdata" />
    <Chart1 :cdata="cdata" />
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps,computed,onMounted,watch,onUnmounted} from 'vue';
import Chart1 from '../echarts/charts.vue';
import Chart2 from '../echarts/Topechart.vue'
// import {FunctionStore} from '/store/modules/function'
import {useRouter} from 'vue-router'
const props=defineProps({});
// const store=FunctionStore();
const router=useRouter();
import { FunctionStore } from '../../store/modules/function';
const store=FunctionStore()
const flag = computed(() => store.recog);  //检测成功
let currentIndex=0
let shouldContinue=false

const cdata = ref({
  xData: ["头部摆动", "头部钻到卵堆", "衔住卵粒", "头部在洞口", "尾部在洞口", "尾部摆动"],
  seriesData: [
    { value: 0, name: "头部摆动" },
    { value: 0, name: "头部钻到卵堆" },
    { value: 0, name: "衔住卵粒" },
    { value: 0, name: "头部在洞口" },
    { value: 0, name: "尾部在洞口" },
    { value: 0, name: "尾部摆动" }
  ]
});
const bdata = ref({
  xData: ["头部摆动", "头部钻到卵堆", "衔住卵粒", "头部在洞口", "尾部在洞口", "尾部摆动"],
  seriesData: [
    { value: 0, name: "头部摆动" },
    { value: 0, name: "头部钻到卵堆" },
    { value: 0, name: "衔住卵粒" },
    { value: 0, name: "头部在洞口" },
    { value: 0, name: "尾部在洞口" },
    { value: 0, name: "尾部摆动" }
  ]
});
// 创建一个映射对象，将英文映射到中文  
const behaviorMapping = {  
  'jiaodong': '头部钻到卵堆',  
  'zhendong': '头部摆动',  
  'chudong': '尾部在洞口',
  'jindong': '头部在洞口',
  'chsihi': '衔住卵粒',
  'shanwei': '尾部摆动',
}; 

function processResult(){
  const keys = Object.keys(store.detectResult);
  keys.forEach((key) => {
    const chineseText = behaviorMapping[key];
    console.log("msd,ke",chineseText)
    if (chineseText) {  
    const targetItem = cdata.value.seriesData.find((item) => item.name === chineseText);  
    if (targetItem) {  
      console.log("找到了qqq",targetItem,targetItem.value); 
      targetItem.value=store.detectResult[key]
      // targetItem.number.number[0]++;  
    }  
  }    
  })

  // 打印更新后的数据
  console.log("Updated seriesData: ", bdata.value.seriesData);
}
function processBehavior(index) {  
  if (!shouldContinue) {  
    return; // 如果不应该继续处理行为，则直接返回  
  }  
  if (index >= store.behavior.length) {  
    console.log('遍历完所有行为');  
    currentIndex = 0;    
    return;  
  }  
  
  const behaviorText = store.behavior[index];  
  console.log("当前行为:", behaviorText);  
  
  // 您的逻辑代码...  
  const chineseText = behaviorMapping[behaviorText];  
  if (chineseText) {  
    const targetItem = cdata.value.seriesData.find((item) => item.name === chineseText);  
    if (targetItem) {  
      console.log("找到了qqq",targetItem,targetItem.value); 
      targetItem.value++
      // targetItem.number.number[0]++;  
    }  
  }  
  
  // 设置下一次遍历的延迟  
  setTimeout(() => {  
    processBehavior(index + 1); // 递归调用，增加索引  
  }, 2000); // 延迟1秒  
}  
onMounted(()=>{
  watch(flag, (newVal, oldVal) => {  
       if(flag){
        processBehavior(currentIndex);
        processResult()
       }
      });  
})
onUnmounted(()=>{
  shouldContinue=true
})

</script>
<style lang='scss' scoped>

</style>