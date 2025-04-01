<template>
  <div class="tap-container" style="height: 100px">
    <input type="number" placeholder="输入ID查找" v-model="search.id" />
    <input
      type="text"
      disabled
      style="width: 44px; height: 32px"
      placeholder="and"
    />
    <input
      type="text"
      style="width: 202px"
      placeholder="输入用户名查找"
      v-model="search.username"
    />
    <span style="font-size: 16px">or</span>
    <el-date-picker
      v-model="start"
      type="date"
      placeholder="Pick a day"
      class="el-date-picker__editor"
    />
    <input
      type="text"
      disabled
      style="width: 35px; height: 32px"
      placeholder="to"
    />
    <el-date-picker
      v-model="end"
      type="date"
      placeholder="Pick a day"
      style="border-color: #1d1d1e"
    />
    <button @click="searchUser">查询</button>
    <button @click="clear">重置</button>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, computed, watch } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";
import dayjs from 'dayjs';  
import { ElDatePicker } from "element-plus";
const props = defineProps({});
const store = UserStore();
const router = useRouter();
const start=ref('')
const end=ref('')
const search = reactive({
  id: "",
  username: "",
  startTime: "",
  endTime: "",
});
const flag = ref(false);

async function searchUser() {
   // 使用dayjs直接解析并格式化时间字符串  
   search.startTime= dayjs(start.value).format('YYYY-MM-DD');  
   search.endTime= dayjs(end.value).format('YYYY-MM-DD');  
   console.log(search,"sjkfhie")
  store.searchUser(
    search.id,
    search.username,
    search.startTime,
    search.endTime

  );
  flag.value = true;
}

function clear() {
  search.endTime = "";
  search.id = "";
  search.startTime = "";
  search.username = "";
  start.value=''
  end.value=''
  flag.value = false;
  store.getUsers();
}

const pageId = computed(() => store.pagenum);
const pageSize = computed(() => store.pagesize);

watch([pageId, pageSize], (newValues, oldValues) => {
  if (flag.value) {
    console.log("传递搜索")
    store.searchUser(
      search.id,
      search.username,
      search.startTime,
      search.endTime
    );
  } else {
    console.log("传递获取")
    store.getUsers();
  }
});
</script>
<style lang="scss" scoped>
* {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 14px;
}
input {
  background-color: #1d1d1e;
  border-radius: 7px;
  height: 32px;
  width: 230px;
  color: #fff;
  padding-left: 10px;
}
/* 假设输入框的类名是 .el-date-picker__editor */
.el-date-picker__editor {
  background-color: #f0f0f0; /* 设置为你想要的颜色 */
}
//设置内部样式
input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #fff;
}
button {
  height: 32px;
  width: 96px;
  background-color: #6c6d70;
  border-radius: 4px;
  cursor: pointer;
}
</style>
