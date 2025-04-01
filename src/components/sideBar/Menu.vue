<template>
  <div id="menu" class="menu">
    <tbody>
      <tr>
        <!-- 使用v-if或v-show来控制哪一组菜单项被渲染 -->
        <td v-for="(item, index) in displayedMenuItems" :key="index">
          <router-link :to="item.route">{{ item.name }}</router-link>
        </td>
      </tr>
      <tr>
        <td
          v-for="(item, index) in displayedMenuItems1"
          :key="index"
          class="english"
        >
          <router-link :to="item.route">{{ item.name }}</router-link>
        </td>
      </tr>
    </tbody>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed } from "vue";
import { UserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = UserStore();
const router = useRouter();
const menuItems = ref([
  { name: "首页", route: "/home" },
  { name: "大鲵科普", route: "/popularization" },
  { name: "行为识别", route: "/recognition" },
  { name: "上报定位", route: "/report" },
  { name: "社区交流", route: "/community" },
  { name: "了解更多", route: "/learn" },
  { name: "加入我们", route: "/participate" },
  { name: "联系我们", route: "/help" },
]);

const admenuItems = ref([
  { name: "首页", route: "/admin" },
  { name: "志愿者管理", route: "/volunteer" },
  { name: "发现报告", route: "/discovery" },
  { name: "教育和资料库", route: "/resource" },
  { name: "志愿审核", route: "/volunteer-audit" },
  { name: "上报管理", route: "/admin-report" },
  { name: "检测结果管理", route: "/detection" },
  { name: "资料管理", route: "/popular-science" },
]);
const menuItems1 = ref([
  { name: "Home", route: "/home" },
  { name: "Science Popularization", route: "/popularization" },
  { name: "Behavior Recognition", route: "/recognition" },
  { name: "Report Position", route: "/report" },
  { name: "Community Engagement", route: "/community" },
  { name: "Learn more", route: "/learn" },
  { name: "Join us", route: "/participate" },
  { name: "Contact us", route: "/help" },
]);

const admenuItems1 = ref([
  { name: "Home", route: "/admain" },
  { name: "Volunteer Management", route: "/volunteer" },
  { name: "Discovery Report", route: "/discovery" },
  { name: "Tech Database", route: "/resource" },
  { name: "volunteer Audit", route: "/volunteer-audit" },
  { name: "admin Report", route: "/admin-report" },
  { name: "detection", route: "/detection" },
  { name: "Science Popularization", route: "/popular-science" },
]);

// 创建一个计算属性来决定显示哪个菜单
const displayedMenuItems = computed(() => {
  console.log("a", store.identity);
  return store.identity === "admins" ? admenuItems.value : menuItems.value;
});
// 创建一个计算属性来决定显示哪个菜单
const displayedMenuItems1 = computed(() => {
  return store.identity === "admins" ? admenuItems1.value : menuItems1.value;
});
</script>
<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: space-around;
  tbody {
    text-align: center;
    tr {
      vertical-align: top;
      // height: 50px;
      td {
        padding: 0 15px;
      }
      td a {
        text-decoration: none;
        color: #fff;
        margin: 0 5px;
        font-family: "Montserrat", sans-serif;
      }
      .english a {
        font-size: 11px;
      }
    }
  }
}
// .menu ul {
//   list-style-type: none;
//   display: flex;
//   justify-content: space-around;
//   a {
//     text-decoration: none !important;
//     color: #fff !important;
//   }
// }
</style>
