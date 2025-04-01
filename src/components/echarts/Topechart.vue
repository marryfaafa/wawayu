<template>
    <div >
    <echart
      :options="internalOptions"
      id="centreLeft1Chart"
      style="height: 260px;width: 320px;"
      ref="chartRef" 
    ></echart>
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps,watch,onBeforeUnmount,onMounted} from 'vue';
import {useRouter} from 'vue-router'
import * as echarts from 'echarts';
const router=useRouter();

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

watch(  
  () => props.cdata,  
  (newData) => {  
    internalOptions.value = {  
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
    // orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: newData.seriesData.map(data => ({
            value: data.value,
            name: data.name
          })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
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