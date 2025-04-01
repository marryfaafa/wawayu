<template>
  <div class="resource">
    <div class="resource-container">
      <div class="blog-box" v-if="!showDialog">
        <BlogShow @modify="showDialog = true"></BlogShow>
      </div>
      <div class="input-box" v-if="showDialog">
        <ModifyBlog @cancel="showDialog = false"></ModifyBlog>
      </div>
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
import BlogShow from "./components/blogShow.vue";
import ModifyBlog from "./components/modifyBlog.vue";

const showDialog = ref(false);
</script>
<style lang="scss" scoped>
.resource {
  position: relative;
  .resource-container {
    width: 100%;
    height: 610px;
  }
}
</style>
