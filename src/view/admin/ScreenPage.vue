<!-- <template>
  <div class="iframe-container">
    <iframe :src="iframeSrc" frameborder="0" class="iframe"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeSrc: 'http://8.134.156.107:8889/#/screen'
    };
  }
};
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh; /* 设置为视口高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style> -->
<template>
  <div class="screen-container" style="background-color: black;">
    <header class="screen-header" style="background-color: black;">
      <div>
        <img src="../../../public/static/img/header_border_dark.png" alt="" />
      </div>
      <span class="logo">
        <img src="../../../public/static/img/logo_dark.png" alt="" />
      </span>
      <span class="title">大鲵实时监控系统</span>
      <div class="title-right">
        <img src="../../../public/static/img/qiehuan_dark.png" class="qiehuan" @click="handleChangeTheme" />
        <span class="datetime">{{ nowTime }}</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div
          id="left-top"
          :class="[fullScreenStatus.trend ? 'fullscreen' : '']"
        >
          <!-- 数量趋势图表 -->
          <Trend ref="trend"></Trend>
          <!-- 用于全屏切换的图标 -->
          <div class="resize">
            <!-- 缩放的效果 -->
            <!-- icon-compress-alt -->
            <!-- 通过点击改变fullScreenStatus中的图表全屏状态 -->
            <span
              @click="changeSize('trend')"
              :class="[
                'iconfont',
                fullScreenStatus.trend
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="left-bottom"
          :class="[fullScreenStatus.seller ? 'fullscreen' : '']"
        >
          <!-- 大鲵提交统计图表 -->
          <Seller ref="seller"></Seller>
          <!-- 用于全屏切换的图标 -->
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('seller')"
              :class="[
                'iconfont',
                fullScreenStatus.seller
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div
          id="middle-top"
          :class="[fullScreenStatus.map ? 'fullscreen' : '']"
        >
          <!-- 大鲵分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('map')"
              :class="[
                'iconfont',
                fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="middle-bottom"
          :class="[fullScreenStatus.rank ? 'fullscreen' : '']"
        >
          <!-- 地区排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('rank')"
              :class="[
                'iconfont',
                fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 志愿者占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('hot')"
              :class="[
                'iconfont',
                fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="right-bottom"
          :class="[fullScreenStatus.stock ? 'fullscreen' : '']"
        >
          <!-- 数量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('stock')"
              :class="[
                'iconfont',
                fullScreenStatus.stock
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hot from "../admin/components/Hot.vue";
import Map from "../admin/components/Map.vue";
import Rank from "../admin/components/Rank.vue";
import Seller from "../admin/components/Seller.vue";
import Stock from "../admin/components/Stock.vue";
import Trend from "../admin/components/Trend.vue";
// import { mapState } from "vuex";
import { getThemeValue,theme } from "../../utils/theme_utils";
import { FunctionStore } from "../../store/modules/function";
const store = FunctionStore();

export default {
  created() {
  //   // 只要接收到数据就会调用该回调函数
    // // 注册接收到数据的回调函数
    // this.$socket.registerCallBack("fullScreen", this.recvData);
    // this.$socket.registerCallBack("themeChange", this.recvThemeChange);
    this.getTime();
  },
  beforeDestroy() {
    // this.$socket.unRegisterCallBack("fullScreen");
    // this.$socket.unRegisterCallBack("themeChange");
    clearInterval(this.timeId);
  },
  data() {
    return {
      // 定义每一个图表的全屏状态，并且只有一个图表是全屏的状态
      // 直接在/screen路由上展示全屏
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false,
      },
      timeId: null,
      nowTime: null,
    };
  },
  methods: {
    changeSize(chartName) {
      // 1.改变fullScreenStatus的数据
      // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      // 2.需要调用每一个图表组件的screenAdapter的方法
      // this.$refs[chartName].screenAdapter()
      // 数据变化后更新渲染
      // this.$nextTick(() => {
      //   this.$refs[chartName].screenAdapter()
      // })
      // 将数据发送给服务端
      // const targetValue = !this.fullScreenStatus[chartName];
      // // 只有发送全屏数据给服务器，服务器才会将数据推送给每一个处于连接状态的客户端
      // this.$socket.send({
      //   action: "fullScreen",
      //   socketType: "fullScreen",
      //   chartName: chartName,
      //   value: targetValue,
      // });
    },
    // 接收到全屏数据之后的处理
    recvData(data) {
      // 取出是哪一个图表需要进行切换
      const chartName = data.chartName;
      // 取出, 切换成什么状态
      const targetValue = data.value;
      this.fullScreenStatus[chartName] = targetValue;
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter();
      });
    },
    handleChangeTheme() {
      // 修改VueX中数据
      // this.$store.commit("changeTheme");
      store.changeTheme()
      // 只有发送全屏数据给服务器，服务器才会将数据推送给每一个处于连接状态的客户端
      // this.$socket.send({
      //   action: "themeChange",
      //   socketType: "themeChange",
      //   chartName: "",
      //   value: "",
      // });
    },
    recvThemeChange() {
      store.changeTheme()
    },
    // 获取当前的时间
    getTime() {
      this.timeId = setInterval(() => {
        let timeDate = new Date();
        let year = timeDate.getFullYear();
        let mounth = timeDate.getMonth() + 1;
        let day = timeDate.getDate();
        let hours = timeDate.getHours();
        hours = hours >= 10 ? hours : "0" + hours;
        let minutes = timeDate.getMinutes();
        minutes = minutes >= 10 ? minutes : "0" + minutes;
        let seconds = timeDate.getSeconds();
        seconds = seconds >= 10 ? seconds : "0" + seconds;
        let week = timeDate.getDay();
        let weekArr = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
        ];
        this.nowTime = `${year}/${mounth}/${day} ${hours}:${minutes}:${seconds} ${weekArr[week]}`;
      }, 1000);
    },
  },
  components: {
    Hot,
    Map,
    Rank,
    Seller,
    Stock,
    Trend,
  },
  computed: {
    // logoSrc() {
    //   return "public/static/img" + getThemeValue(theme).logoSrc;
    // },
    // headerSrc() {
    //   return "public/static/img" + getThemeValue(theme).headerBorderSrc;
    // },
    // themeSrc() {
    //   return "public/static/img" + getThemeValue(theme).themeSrc;
    // },
    // containerStyle() {
    //   return {
    //     backgroundColor: getThemeValue(theme).backgroundColor,
    //     color: getThemeValue(theme).titleColor,
    //   };
    // },
    // ...mapState(["theme"]),
  },
};
</script>
<style lang="scss" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
  background-color: #fff !important;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
  background-color: #fff;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  // height: 100%;
  height: 550px;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  // 为了定位到右上角
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
