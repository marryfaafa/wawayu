<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { UserStore } from "./store/modules/user";
import { useRouter, useRoute } from "vue-router";
const store = UserStore();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  if( localStorage.getItem("username"))
  store.userLogin(
    localStorage.getItem("username"),
    localStorage.getItem("password")
  );
});
</script>

<style scoped></style>
