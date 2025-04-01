<template>
  <div >
    <echart
      :options="internalOptions"
      id="centreLeft1Chart"
      style="height: 370px;width: 420px;"
      ref="chartRef" 
    ></echart>
  </div>
</template>
<script lang='ts' setup>
// import Echart from '../../utils/echart.vue'
import { ref, watch, onMounted,onBeforeUnmount,watchEffect,computed } from 'vue';
import { FunctionStore } from '../../store/modules/function';
const store=FunctionStore()
import * as echarts from 'echarts';


// 定义接口来描述 cdata 的结构  
interface CData {  
  xData: string[];  
  seriesData: { value: number; name: string }[];  
}  
  
// 使用 defineProps 定义组件的 props，并指定其类型  
// 注意：在 <script setup> 中，你不需要使用 defineProps，props 会自动暴露为函数  
const props = defineProps<{  
  cdata: CData;  
}>();  
  
// 使用 ref 创建响应式的数据对象来存储 options  
const internalOptions = ref({}); // 使用 internalOptions 而不是 options，以避免与 prop 名称冲突  
  
// 初始化图表的引用  
const chartRef = ref<HTMLElement | null>(null);  
let chartInstance: echarts.ECharts | null = null;  
const  color=[
         '#5470c6',
         '#91cc75',
         '#fac858',
         '#ee6666',
         '#73c0de',
         '#3ba272',
      ];
watch(  
  () => props.cdata,  
  (newData) => {  
    internalOptions.value = {  
      xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: newData.xData,
    inverse: true,
    animationDuration: 500,
    animationDurationUpdate: 500,
    max: 5 // only the largest 6 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: '动作频率排序',
      type: 'bar',
      data:newData.seriesData.map((data,index) => ({
            value: data.value,
            name: data.name,
            itemStyle:{
              color: color[index ] 
            }
          })),
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
     
    };  
  
    // 如果图表实例已经存在，则直接更新 options  
    if (chartInstance) {  
      chartInstance.setOption(internalOptions.value);  
    }  
  },  
  { immediate: true, deep: true }  
);  
  
// 初始化图表  
onMounted(() => {  
    console.log("初始化")
  if (chartRef.value) {  
    console.log("进来")
    chartInstance = echarts.init(chartRef.value);  
    chartInstance.setOption(internalOptions.value);
    console.log("iption",internalOptions.value,chartInstance.getOption())  
  }  
});  
  
// 在组件卸载时，销毁图表实例  
onBeforeUnmount(() => {  
  if (chartInstance) {  
    chartInstance.dispose();  
    chartInstance = null;  
  }  
});
</script>
<style lang='scss' scoped>

</style>