<!-- 志愿者相关统计量图 -->
<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{ "▎ " + showTitle }}</span>
      <span
        class="iconfont title-icon"
        :style="comStyle"
        @click="showChoice = !showChoice"
        >&#xe6eb;</span
      >
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div
          class="select-item"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getThemeValue } from "@/utils/theme_utils";
import * as echarts from "echarts"
import {markRaw} from 'vue'
import {reqgetFas} from '../../../api'
export default {
  data() {
    return {
      chartInstane: null,
      allData: null, // 从服务器中获取的所有数据
      showChoice: false, // 是否显示可选项
      choiceType: "map", // 显示的数据类型
      titleFontSize: 0, // 指明标题的字体大小
    };
  },
  created() {
    // 当浏览器获取到服务器发送过来的数据时就会调用getData方法
    // this.$socket.registerCallBack("trendData", this.getData);
    // console.log("挂在")
    // this.getData()
  },
  mounted() {
    this.initChart();
    this.getData();
    // this.$socket.send({
    //   action: "getData",
    //   socketType: "trendData",
    //   chartName: "trend",
    //   value: "",
    // });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unRegisterCallBack("trendData");
  },
  computed: {
    selectTypes() {
      if (!this.allData) {
        return [];
      } else {
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType;
        });
      }
    },
    showTitle() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.choiceType].title;
      }
    },
    // 设置给标题的样式
    comStyle() {
      return {
        fontSize: this.titleFontSize + "px",
        // color: getThemeValue(this.theme).titleColor,
      };
    },
    marginStyle() {
      return {
        marginLeft: this.titleFontSize + "px",
        // backgroundColor: getThemeValue(this.theme).backgroundColor,
      };
    },
    // ...mapState(["theme"]),
  },
  watch: {
    // theme() {
    //   console.log("Trend 主题切换了！");
    //   // this.chartInstance.dispose(); // 销毁当前的图表
    //   this.chartInstane.dispose();
    //   this.initChart(); // 重新以最新的主题名称初始化图表对象
    //   this.screenAdapter(); // 完成屏幕的适配
    //   this.updateChart(); // 更新图表的展示
    // },
  },
  methods: {
    initChart() {
      this.chartInstane = markRaw(echarts.init(this.$refs.trend_ref,'chilk'));
    //   if (echarts && this.$refs.trend_ref) {
    //     this.chartInstane = echarts.init(this.$refs.trend_ref);
    // } else {
    //     // 处理未定义的情况，可以给出提示或其他处理
    //     console.error("Error: $echarts or $refs.trend_ref is not defined.");
    // }
      const initOption = {
        grid: {
          left: "3%",
          top: "35%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: 20,
          top: "15%",
          icon: "circle",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
      };
      this.chartInstane.setOption(initOption);
    },
    // data：服务器发送过来的图表的数据
    async getData() {
      console.log("获取")
      let res=await reqgetFas()
      console.log("结果",res)
      // this.$http.get("https://mock.apipark.cn/m1/4435779-0-default/fas").then((response) => {
      // this.allData = response.data;
      // console.log(this.allData);
      // this.updateChart();
      // }).catch((error) => {
      //   console.error("请求后端接口出错：", error);
      // });
    },
    updateChart() {
      // 半透明的颜色值
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ];
      // 全透明的颜色值
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ];
      // 处理数据
      // 类目轴的数据
      const timeArr = this.allData.common.month;
      // y轴的数据 series下的数据
      const valueArr = this.allData[this.choiceType].data;
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index],
              }, // %0的颜色值
              {
                offset: 1,
                color: colorArr2[index],
              }, // 100%的颜色值
            ]),
          },
        };
      });
      // 图例的数据
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      const dataOption = {
        xAxis: {
          data: timeArr,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInstane.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.trend_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2,
          },
        },
      };
      this.chartInstane.setOption(adapterOption);
      this.chartInstane.resize();
    },
    handleSelect(currentType) {
      this.choiceType = currentType;
      this.updateChart();
      this.showChoice = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
   //父容器就需要设置为relative
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-con {
    background-color: #222733;
  }
}
</style>
