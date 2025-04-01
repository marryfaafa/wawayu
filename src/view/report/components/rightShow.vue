<template>
  <div class="right-container">
    <div class="map-item">
      <div class="home">【 全国 】</div>
      <button @click="handleReport">上报</button>
    </div>
    <div class="map-num">
      <div class="tab-item">
        <div class="table">
          <div
            class="td"
            v-for="item in tableItems"
            :key="item.index"
            :class="{
              num7: item.index == 7,
              num8: item.index == 8 || item.index == 9,
              num6: item.index == 6,
            }"
          >
            <div class="num">
              {{ item.index == 3 ? item.num + "%" : item.num }}
            </div>
            <div class="p">{{ item.name }}</div>
          </div>
        </div>
        <div class="p-mor">
          说明：数据来自国务院及国家文化和旅游行政主管部门公开信息，台湾省暂无数据，数据统计截至2024年07月02日
          。
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { reqReportgetData } from "@/api";
const props = defineProps({});
// 定义要触发的事件
const emit = defineEmits(["ReportBody"]); // 声明要触发的事件名
const store = useStore();
const router = useRouter();

const tableItems = ref([]);

function handleReport() {
  console.log("上报");
  // 触发ReportBody事件
  emit("ReportBody");
}

const getData = async () => {
  let res = await reqReportgetData();
  console.log("获取数据3", res);
  const data = [
    { name: "志愿者总数", num: res.VolunteersNum },
    { name: "总上报数", num: res.ReportNum },
    { name: "上报数榜首", num: res.ReportTop },
    { name: "本月上报增幅", num: res.ReportGrowth },
    { name: "上报地点榜首", num: res.ReportAreaTop },
    { name: "志愿时长榜首", num: res.ServiceTop },
    { name: "个人上报数", num: res.PersonalReport },
    { name: "个人热门上报地点", num: res.PersonalHotReport },
    { name: "加入志愿时长", num: res.JoinTime },
    { name: "献身公益时长", num: res.DedicateTime },
  ];
  // 转换数据到tableItems所需的格式，并设置index
  tableItems.value = data.map((item, index) => ({
    index,
    ...item, // 使用展开运算符来合并对象
  }));
  console.log(tableItems.value);
};
onMounted(() => {
  getData();
});
</script>
<style lang="scss" scoped>
.right-container {
  position: absolute;
  width: 440px;
  height: 495px;
  //   padding-top: 26px;
  //   padding-left: 14px;
  //   padding-right: 14px;
  box-sizing: border-box;
  padding: 26px 24px 14px 26px;
  //   padding: 26px 14px;
  box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.48);
  .map-item {
    width: 391px;
    font-family: "微软雅黑";
    text-align: center;
    .home {
      margin-bottom: 22px;
      font-size: 24px;
      line-height: 1.2;
      color: #fff;
      display: inline-block;
    }
    button {
      display: inline-block;
      cursor: pointer;
      height: 35px;
      width: 70px;
      position: absolute;
      right: 35px;
      background-color: #40525f;
      color: #fff;
      font-size: 18px;
      line-height: 35px;
      text-align: center;
    }
  }
  .map-num {
    position: relative;
    .table {
      margin-bottom: 13px;
      //   margin-right: -5px;
      overflow: hidden;
      padding-left: 0;
      margin-left: -10px;
      .td {
        float: left;
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 10px 0;
        width: 127px;
        background-color: #96aaad;
        .num {
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: 30px;
          color: #fff;
          text-align: center;
          height: 36.8px;
          overflow: hidden; /* 当内容超出时隐藏 */
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .p {
          margin: 0 25px;
          font-size: 15px;
          color: #fff;
          text-align: center;
        }
      }
      .num6 {
        height: 125px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .num7 {
        width: 97px;
        height: 125px;
        .num {
          height: auto;
        }
      }
      .num8 {
        width: 157px;
        height: 60px;
        display: flex;
        padding: 0;
        line-height: 60px;
        .num {
          padding-left: 10px;
          height: auto;
        }
        .p {
          margin-left: 5px;
          margin-right: 0;
        }
      }
    }
    .p-mor {
      margin: 0 10px;
      color: #fff;
      padding: 0;
    }
    .total {
      display: inline-block;
      padding: 0 42px;
      vertical-align: top;
      font-size: 16px;
    }
  }
}
</style>
