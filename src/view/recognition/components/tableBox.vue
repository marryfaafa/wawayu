<template>
  <div class="table-box-container">
    <div class="top-echart" >
      <TopEchart></TopEchart>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed,watch ,onUnmounted} from 'vue';
import TopEchart from '../../../components/echarts/recognition.vue'

import {reqvideoCall} from '../../../api'
import { FunctionStore } from "../../../store/modules/function";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
const flag = computed(() => store.recog);  //检测成功


</script>
<style lang="scss" scoped>
.table-box-container {
  position: absolute;
  width: 100%;
  height: 100%;
  .top-echart {
    width: 100%;height: 50%;position: absolute;
    .TopEchart{
      width: 100%;height: 50%;position: absolute;
    }
  }
}
 
</style>
