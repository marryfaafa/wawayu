<template>
  <div class="volunteer">
    <div class="volunteer-container">
      <!-- <div class="navtop">
        <TopNav></TopNav>
      </div> -->
      <div class="tablemain">
        <TableMain></TableMain>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { UserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";
import TableMain from "./components/TableMain.vue";
import TopNav from "./components/TopNav.vue";
const props = defineProps({});
const store = UserStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.volunteer {
  position: relative;
  .volunteer-container {
    width: 100%;
    height: 900px;
    // background-color: #2d2e32;
    background-color: #061b29;
    position: relative;
    .navtop {
      width: 100%;
      position: absolute;
      height: 100px;
    }
    .tablemain {
      width: 100%;
      position: absolute;
  
      height: 700px;
    }
  }
}
</style>
