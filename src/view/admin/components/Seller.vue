<!-- 大鲵提交统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { getThemeValue } from "@/utils/theme_utils";
import * as echarts from 'echarts'
import {markRaw} from 'vue'
import {reqgetHotproduct} from '../../../api'

export default {
  data() {
    return {
      chartInstance: null,
      allData: null, // 服务器返回的数据
      currentPage: 1, // 当前显示的页数
      totalPage: 0, // 一共有多少页
      timerId: null, // 定时器的标识
    };
  },
  computed: {
    // ...mapState(["theme"]),
  },
  watch: {
    // theme() {
    //   // console.log("Seller 主题切换了！");
    //   this.chartInstance.dispose(); // 销毁当前的图表
    //   this.initChart(); // 重新以最新的主题名称初始化图表对象
    //   this.screenAdapter(); // 完成屏幕的适配
    //   this.updateChart(); // 更新图表的展示
    // },
  },
  created() {
    // 当浏览器获取到服务器发送过来的数据时就会调用getData方法
    // this.$socket.registerCallBack("sellerData", this.getData);
  },
  mounted() {
    this.initChart();
    this.getData();
    // this.$socket.send({
    //   action: "getData",
    //   socketType: "sellerData",
    //   chartName: "seller",
    //   value: "",
    // });
    window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter();
  },
  beforeDestroy() {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
    // this.$socket.unRegisterCallBack("sellerData");
  },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = markRaw(echarts.init(
        this.$refs.seller_ref,
        // this.theme
      ));
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: "▎大鲵提交数统计",
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true, // 距离是包含坐标轴上的文字
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                // color: getThemeValue(this.theme).titleColor,
              },
            },
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 百分之0状态之下的颜色值
                {
                  offset: 0,
                  color: "#5052EE",
                },
                // 百分之100状态之下的颜色值
                {
                  offset: 1,
                  color: "#AB6EE5",
                },
              ]),
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      // 对图表对象进行鼠标事件的监听
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    // 获取服务器的数据
    // async getData() {
    //   // http://127.0.0.1:8888/api/seller
    //   const { data: ret } = await this.$http.get("seller");
    //   this.allData = ret;
    //   // 对数据排序
    //   this.allData.sort((a, b) => {
    //     return a.value - b.value; // 从小到大的排序
    //   });
    //   // 每5个元素显示一页
    //   this.totalPage =
    //     this.allData.length % 5 === 0
    //       ? this.allData.length / 5
    //       : this.allData.length / 5 + 1;
    //   this.updateChart();
    //   // 启动定时器
    //   this.startInterval();
    // },
    // data：服务器发送过来的图表的数据
    // getData(ret) {
    //   this.allData = ret;
    //   // 对数据排序
    //   this.allData.sort((a, b) => {
    //     return a.value - b.value; // 从小到大的排序
    //   });
    //   // 每5个元素显示一页
    //   this.totalPage =
    //     this.allData.length % 5 === 0
    //       ? this.allData.length / 5
    //       : this.allData.length / 5 + 1;
    //   this.updateChart();
    //   // 启动定时器
    //   this.startInterval();
    // },
    // 获取服务器的数据
    async getData() {
      let ret=await reqgetHotproduct()
      console.log("排名",ret)
         this.allData = ret;
      // 对数据排序
      this.allData.sort((a, b) => {
        return a.value - b.value; // 从小到大的排序
      });
      // 每5个元素显示一页
      this.totalPage =
        this.allData.length % 5 === 0
          ? this.allData.length / 5
          : this.allData.length / 5 + 1;
      this.updateChart();
      // 启动定时器
      this.startInterval();
    //data：服务器发送过来的图表的数据
    // getData(ret) {
    //   this.allData = ret;
    //   // 对数据排序
    //   this.allData.sort((a, b) => {
    //     return a.value - b.value; // 从小到大的排序
    //   });
    //   // 每5个元素显示一页
    //   this.totalPage =
    //     this.allData.length % 5 === 0
    //       ? this.allData.length / 5
    //       : this.allData.length / 5 + 1;
    //   this.updateChart();
    //   // 启动定时器
    //   this.startInterval();
      // 假设你的Spring Boot后端接口的路径是 http://localhost:8080/api/sellerData
      // 注意：这里使用了 async/await 语法进行异步处理，确保你的环境支持或做好相应的polyfill
      // this.$http.get("https://apifoxmock.com/m1/4435779-0-default/api/hotproduct").then((response) => {
      //   const ret = response.data;
      //   console.log(ret);
      //   this.allData = ret.data;
      //   // 对数据排序
      //   this.allData.sort((a, b) => {
      //     return a.value - b.value; // 从小到大的排序
      //   });
      //   // 每5个元素显示一页
      //   this.totalPage =
      //     this.allData.length % 5 === 0
      //       ? this.allData.length / 5
      //       : Math.floor(this.allData.length / 5) + 1; // 修正计算总页数的逻辑
      //   this.updateChart();
      //   // 启动定时器
      //   this.startInterval();
      // }).catch((error) => {
      //   console.error("请求后端接口出错：", error);
      // });
    },
    // 更新图表
    updateChart() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.allData.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      const dataOption = {
        yAxis: {
          data: sellerNames,
        },
        series: [
          {
            data: sellerValues,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateChart();
      }, 3000);
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter() {
      const titleFontSize = (this.$refs.seller_ref.offsetWidth / 100) * 3.6;
      // 和分辨率大小相关的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize();
    },
  },
};
</script>

<style lang="less" scoped></style>
