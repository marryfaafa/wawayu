<template>
  <div class="report-container">
    <div class="report-container-box">
      <!-- <div id="container" ref="dom"></div> -->
      <!-- @click="handelClick" -->
      <baidu-map
        class="bm-view"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        v="3.0"
        type="API"
        @click="handelClick"
      >
        <!-- 二维地图和卫星地图 -->
        <bm-map-type
          :map-types="['BMAP_HYBRID_MAP','BMAP_NORMAL_MAP' ]"
          :current-type="currentMapType" 
        ></bm-map-type>
        <!-- 城市列表-选择城市搜索城市(支持市级以上搜索) -->
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <!-- 点标记 -->
        <!-- :dragging="true"
          :raiseOnDrag="true"
          :position="autoLocationPoint"
          :icon="iconProps" -->
        <!-- <bm-marker
          :dragging="true"
          :raiseOnDrag="true"
          :position="autoLocationPoint"
          :icon="iconProps"
          v-if="initLocation"
        >
          <bm-info-window @close="show = false" @open="show = true">
            {{ infoWindowContent }}
          </bm-info-window>
        </bm-marker> -->
        <!-- 定位 -->
        <!-- <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="false"
          :autoLocation="true"
          :locationIcon="{ url: h1, size: { width: 18, height: 18 } }"
          @locationSuccess="getLoctionSuccess"
          @locationError="getLocationError"
        >
        </bm-geolocation> -->
        <!-- <bm-geolocation
          anchor="BMAP_ANCHOR_TOP_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
          @locationSuccess="handleLocationSuccess"
          @locationError="handleLocationError"
        ></bm-geolocation> -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :enableAutoLocation="true"
          :locationIcon="{
            url: h1,
            size: { width: 18, height: 18 },
          }"
          @locationSuccess="handleLocationSuccess"
          @locationError="handleLocationError"
        ></bm-geolocation>
      </baidu-map>
      <div class="show-box">
        <rightShow @ReportBody="handleReport"></rightShow>
      </div>
      <div class="table-box" v-if="showTable">
        <reportTable></reportTable>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import reportTable from "./components/reportTable.vue";
import rightShow from "./components/rightShow.vue";
import { ref, defineProps, reactive, onMounted,computed ,watch} from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

// import { BMapGL } from "vue-baidu-map";
import h1 from "../../assets/icons/定位.svg";
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
const route = useRoute();

 // 当前地图类型，默认为混合地图  
 const currentMapType = ref('BMAP_HYBRID_MAP');


const center = ref({ lng: 110.47988, lat: 29.12202});
// const center = ref({ lng: 10, lat: 39.924823 });
const zoom = ref(15);
const autoLocationPoint = ref(null);
const add = ref("");
const infoWindowContent = ref("这里是地址信息"); // 信息窗口的内容
const show = ref(false);
const show1=computed(()=>store.showTable)
const state = reactive({
  lng: 116.403401,
  lat: 39.924823,
});
const showTable = ref(true);
const flag=computed(()=>store.flag)

watch(flag,(newValue,oldValue)=>{
  show.value=true
})

// 定义 icon 属性
const iconProps = {
  url: h1, // 注意：在某些构建配置中，这可能需要特别处理
  size: { width: 18, height: 18 },
};
const initLocation = ref(false);
// const map = ref(null); // 地图实例

//上报
function handleReport() {
  console.log("shangbao");
  if (add.value) {
    console.log("aa", add.value);
    showTable.value = false;
    router.push({
      name: "Detail",
      params: {
        address: add.value,
      },
    });
  } else {
    // 处理 add.value 无效的情况
    console.error("Address is not valid");
  }
}
function handleLocationSuccess() {
  console.log("定位成功");
}
function handleLocationError() {
  console.log("定位失败");
}
const handelClick = (e) => {
  console.log(e, "saf");
  show.value = false;
  state.lng = e.point.lng;
  state.lat = e.point.lat;
  console.log("fdsf", state);
  const geocoder = new window.BMap.Geocoder();

  // 解析地址
  geocoder.getLocation(e.point, (res) => {
    if (res) {
      show.value = true;
      add.value = res.address;
    }
  });
  console.log("123", add.value);
};

// function handleLocationSuccess() {
//   console.log("自动定位");
//   ElMessage.success("自动定位成功");
// }

// function handleLocationError() {
//   console.log("自动定位失败");
//   ElMessage.success("自动定位失败，请刷新重试");
// }
// 地图加载完成后的回调
// 地图加载完成后的回调函数
// const handlerMapReady = () => {
//   // map.value = new BMap.Map("allmap"); // 创建地图实例
//   // map.value.centerAndZoom(
//   //   new BMap.Point(center.value.lng, center.value.lat),
//   //   zoom.value
//   // ); // 设置中心点和缩放级别

//   // 添加自动定位控件
//   const geolocation = new BMap.GeolocationControl();
//   map.value.addControl(geolocation);

//   // 定位成功后添加标注和图标
//   geolocation.addEventListener("locationSuccess", function (e) {
//     const location = e.point; // 获取当前位置坐标
//     const marker = new BMap.Marker(location); // 创建标注
//     map.value.addOverlay(marker); // 将标注添加到地图上

//     // 可以添加更多标注的配置，例如设置图标
//     marker.setIcon(new BMap.Icon("path/to/icon.png", new BMap.Size(20, 20)));
//   });

//   // 定位失败的处理
//   geolocation.addEventListener("locationError", function (e) {
//     console.error("定位失败");
//   });
// };
watch(show1, (newVal, oldVal) => {  
       if(show1){
        console.log("变化")
        showTable.value = true;
       }
      });  
onMounted(() => {
  console.log("挂在")
  console.log("dsfas", route.name);
  // 你可以根据路由名称或其他条件来设置初始值
  if (route.name === "report") {
    showTable.value = true;
  }
});
</script>
<style lang="scss" scoped>
.report-container {
  //   position: absolute;
  //   background-color: #fff;
  .report-container-box {
    width: 100%;
    min-height: 800px;
    position: absolute;
    background-color: #fff;
    .bm-view {
      position: absolute;
      height: 600px;
      width: 100%;
    }
    .show-box {
      position: absolute;
      right: 3%;
      height: 495px;
      width: 440px;
      background-color: #7d8889;
      margin-top: 100px;
    }
    .table-box {
      position: absolute;
      height: 630px;
      width: 100%;
      top: 650px;
    }
  }
}
</style>
