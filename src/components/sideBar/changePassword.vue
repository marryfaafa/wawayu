<template>
  <div class="password-container" style="z-index: 1000000;">
    <div class="icon">
      <img
        src="../../assets/icons/线性左箭头.svg"
        alt=""
        style="height: 28px; width: 28px; cursor: pointer"
        @click="back"
      />
    </div>
    <h4>Set New password</h4>
    <!-- 修改密码表单 -->
    <form @submit.prevent="submit">
      <input
        type="password"
        placeholder="New password"
        v-model="password.old"
      />
      <input
        type="password"
        placeholder="Password Again"
        v-model="password.new"
      />
      <button type="submit">Finish</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from "vue";
import { UserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";
import { reqchangePassword } from "../../api";
import { ElMessage } from "element-plus";
const props = defineProps({});
const emit = defineEmits(["close"]); // 定义名为 'close' 的自定义事件
const store = UserStore();
const router = useRouter();
const password = reactive({
  old: "",
  new: "",
});

function back() {
  console.log("发送");
  emit("close", "auaq关闭"); // 触发 'close' 事件，并传递一个参数
}

async function submit() {
  if (password.old == password.new && password.old != "") {
    let res = await reqchangePassword(password.new);
    ElMessage.success("密码修改成功");

    localStorage.setItem("password", password.new);
    emit("close", "auaq关闭"); // 触发 'close' 事件，并传递一个参数
  } else if (password.old != password.new) {
    ElMessage.error("两次密码输入不匹配");
  } else {
    ElMessage.warning("请输入密码");
  }
}
</script>
<style lang="scss" scoped>
h4 {
  font-size: 35px;
  color: #333;
  text-align: center;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
input {
  width: 344px;
  height: 58px;
  border-radius: 8px;
  border: 1px solid #797979;
  margin-bottom: 30px;
  padding-left: 30px;
  border: none;
  box-sizing: border-box;
}
button {
  display: block;
  width: 344px;
  height: 58px;
  background-color: #27bd8b;
  font-size: 18px;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
