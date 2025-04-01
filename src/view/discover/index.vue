<template>
  <div class="discover">
    <div class="main" ref="main">
      <div
        class="chart"
        ref="chart"
        style="width: 1000px; height: 600px; margin-bottom: -10px"
      ></div>
      <div class="col-md-3 table-responsive">
        <!--            表格展示上报-->
        <table class="table table-bordered" style="margin-top: 20px">
          <thead>
            <tr>
              <th style="color: #ffffff">地区</th>
              <th style="color: #ffffff">上报(次)</th>
              <!--                    <th style="color: #FFFFFF">类型</th>      ?-->
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(item, index) in areaData" :key="index">
              <td>{{ item.area }}</td>
              <td>{{ item.reportNum }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter } from "vue-router";

import * as echarts from "echarts";

import * as echarts4 from "echarts4";
// 中国地图的json https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
import chinaMap from "@/assets/china.json";
// 加载echarts4版本总的china.js
import "echarts4/map/js/china.js";
// 注册地图
echarts4.registerMap("china", chinaMap);
import { reqgetDiscoveryReport } from "../../api";

const props = defineProps({});
const store = FunctionStore();
const router = useRouter();

const chart = ref(null);
const areaData = ref([]);

const myChart = ref(null);

const randomValue = () => Math.round(Math.random() * 1000);
const dataList = ref([
  { name: "南海诸岛", value: randomValue() },
  { name: "北京市", value: randomValue() },
  { name: "天津市", value: randomValue() },
  { name: "上海市", value: randomValue() },
  { name: "重庆市", value: randomValue() },
  { name: "河北省", value: randomValue() },
  { name: "河南省", value: randomValue() },
  { name: "云南省", value: randomValue() },
  { name: "辽宁省", value: randomValue() },
  { name: "黑龙江省", value: randomValue() },
  { name: "湖南省", value: randomValue() },
  { name: "安徽省", value: randomValue() },
  { name: "山东省", value: randomValue() },
  { name: "新疆维吾尔自治区", value: randomValue() },
  { name: "江苏省", value: randomValue() },
  { name: "浙江省", value: randomValue() },
  { name: "江西省", value: randomValue() },
  { name: "湖北省", value: randomValue() },
  { name: "广西壮族自治区", value: randomValue() },
  { name: "甘肃省", value: randomValue() },
  { name: "山西省", value: randomValue() },
  { name: "内蒙古自治区", value: randomValue() },
  { name: "陕西省", value: randomValue() },
  { name: "吉林省", value: randomValue() },
  { name: "福建省", value: randomValue() },
  { name: "贵州省", value: randomValue() },
  { name: "广东省", value: randomValue() },
  { name: "青海省", value: randomValue() },
  { name: "西藏自治区", value: randomValue() },
  { name: "四川省", value: randomValue() },
  { name: "宁夏回族自治区", value: randomValue() },
  { name: "海南省", value: randomValue() },
  { name: "台湾省", value: randomValue() },
  { name: "香港特别行政区", value: randomValue() },
  { name: "澳门特别行政区", value: randomValue() },
]);

const option = ref({
  tooltip: {
    formatter: function (params) {
      return `${params.seriesName}<br />${params.name}：${params.value}`;
    },
  },
  visualMap: {
    min: 0,
    max: 1500,
    left: "20px",
    bottom: "150px",
    text: ["高", "低"], //取值范围的文字
    inRange: {
      color: ["#e0ffff", "#006edd"], //取值范围的颜色
    },
    show: true, //图注
  },
  geo: {
    map: "china",
    roam: true, //开启缩放和平移
    zoom: 1.23, //视角缩放比例
    label: {
      normal: {
        show: true,
        fontSize: "10",
        color: "rgba(0,0,0,0.7)",
      },
    },
    itemStyle: {
      normal: {
        borderColor: "rgba(0, 0, 0, 0.2)",
      },
      emphasis: {
        areaColor: "#F3B329", //鼠标选择区域颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  series: [
    {
      name: "信息量",
      type: "map",
      geoIndex: 0,
      data: [],
    },
  ],
});

async function getAreaData() {
  let res = await reqgetDiscoveryReport();
  console.log(res,"发现3");
  areaData.value = res.areas;

  // 使用扩展运算符和Math.max来获取最大值
  const maxNum = Math.max(...areaData.value.map((item) => item.reportNum));

  // 使用扩展运算符和Math.min来获取最小值
  const minNum = Math.min(...areaData.value.map((item) => item.reportNum));
  areaData.value.forEach((areaItem) => {
    // 查找匹配的name
    const match = dataList.value.find((item) => item.name === areaItem.area);
    if (match) {
      // 如果找到匹配项，更新value
      match.value = areaItem.reportNum;
    }
  });
  //饼图重新赋值data
  option.value.visualMap.min = minNum;
  option.value.visualMap.max = maxNum;
  option.value.series[0].data = dataList.value;
  myChart.value.setOption(option.value);
}

onMounted(() => {
  myChart.value = echarts4.init(chart.value);
  myChart.value.setOption(option.value);
  getAreaData();
  console.log(option.value, "q");
  myChart.value.on("click", function (params) {
    const geoCoord = myChart.value.convertFromPixel("geo", [
      params.event.offsetX,
      params.event.offsetY,
    ]);

    // 使用 toFixed(2) 将经纬度保留两位小数
    const longitude = geoCoord[0].toFixed(2);
    const latitude = geoCoord[1].toFixed(2);
    // 创建包含城市名称、经纬度和上报量的多行消息
    const message = `
    城市：${params.name}
    经纬度：(${longitude}, ${latitude})
    上报量：${params.value}
  `;
    alert(message);
  });
});
// onMounted(() => {
// //   myChart = echarts.init(chart.value);
// });
</script>
<style lang="scss" scoped>
.discover {
  position: relative;
  .main {
    position: absolute;
    width: 100%;
    height: 620px;
    background-color: #2c313a;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
table {
  margin-top: 20px;
  width: 200px;
  border-collapse: collapse;
  position: absolute;
  right: 50px;
  top: 10px;
}

thead {
  width: calc(100% - 1.2em);
}

td,
th {
  border: 1px solid #fff;
  text-align: center;
  color: #fff;
  white-space: nowrap;
  /* 溢出内容隐藏 */
  overflow: hidden;
  /* 使用文本溢出省略号 */
  text-overflow: ellipsis;
}

tbody {
  height: 115px;
  display: block;
  overflow-y: auto;
}

thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  border: 1px solid #fff;
}
// table {
//   margin-top: 20px;
//   width: 200px;
//   //   border-collapse: collapse;
//   border-collapse: separate;
//   position: absolute;
//   right: 50px;
//   top: 10px;
// }
// thead {
//   width: calc(100% - 1.2em);
// }
// td,
// th {
//   border: 1px solid #fff;
//   //   padding: 8px;
//   text-align: center;
//   color: #fff;
// }

// tbody {
//   height: 115px;
//   display: block;
//   overflow-y: auto;
// }

// thead,
// tbody tr {
//   display: table;
//   width: 100%;
//   table-layout: fixed;
//   border: 1px solid #fff;
// }

// thead {
//   width: 100%;
// }
// .table {
//   position: absolute;
//   right: 50px;
//   top: 20px;
//   width: 200px; /* 表格宽度 */
//   border-collapse: collapse; /* 合并边框 */
//   color: #fff;
//   border: 1px solid #fff; /* 表头边框（尽管在这里看起来是无效的，因为背景色也是白色）*/
// }
// // .table thead th {
// //   padding: 10px 20px; /* 内边距，包括右侧内边距以实现距离右边的效果 */
// // }
// table tbody {
//   height: 115px; /* tbody的最大高度，超过此高度将出现滚动条 */
//   overflow-y: scroll; /* 允许垂直滚动 */
//   display: block;
// }
// /*将表头缩进1.2em*/
// table thead {
//   width: calc(100% - 1.2em);
// }
// td,
// th {
//   text-align: center;
//   border: 1px solid #fff; /* 表头边框（尽管在这里看起来是无效的，因为背景色也是白色）*/
// }
// .table tbody tr {
//   border-bottom: 1px solid #ddd; /* tbody中的行边框 */
// }
// .table tbody td {
//   padding: 10px; /* 单元格内边距 */
// }
</style>
