<template>
  <div class="admin">
    <div class="admin-container">
      <iframe src="http://47.121.184.198:8889/#/screen" style=" height: 690px;width: 100%; "></iframe>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
* {
  color: #fff;
  text-align: center;
}
.admin {
  position: relative;
  .admin-container {
    position: absolute;
    width: 100%;
   
  }
}
</style>
