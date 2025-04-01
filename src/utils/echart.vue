<template>
    <div :id="id" :class="className" :style="{ height: height, width: width }" ></div>
</template>
<script lang='ts' setup>

import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue';
import * as echarts from 'echarts'; // 引入 ECharts 库

const props = defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  id: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '2.5rem'
  },
  options: {
    type: Object as () => {},
    default: () => ({})
  }
});

const chartRef = ref(null); // 用于获取 DOM 元素的引用

const chart = ref(null); // ECharts 实例的引用

// 初始化 ECharts 图表
const initChart = () => {
  chart.value = echarts.init(chartRef.value as HTMLElement);
  chart.value.setOption(props.options, true);
};

// 销毁 ECharts 图表
const disposeChart = () => {
  if (chart.value !== null) {
    chart.value.dispose();
  }
};

// 监听 options 变化并更新图表
watch(() => props.options, (newOptions) => {
  chart.value.setOption(newOptions, true);
}, { deep: true });

// 在组件挂载后初始化图表
onMounted(() => {
  initChart();
});

// 在组件销毁前销毁图表
onBeforeUnmount(() => {
  disposeChart();
});

// 定义模板的样式
const style = ref({
  height: props.height,
  width: props.width
});
</script>
<style lang='scss' scoped>

</style>