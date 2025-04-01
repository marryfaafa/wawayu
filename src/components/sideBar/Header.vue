<template>
  <div class="header-container">
    <!-- 遮盖层 -->
    <div v-if="showPasswordBox || showMessageBox" class="overlay">
      <!-- 弹出盒子 -->
      <div v-if="showPasswordBox" class="password-box">
        <ChangePassword @close="handleClose"></ChangePassword>
      </div>
      <!-- 弹出盒子 -->
      <div
        v-if="showMessageBox"
        class="password-box"
        style="
          background-color: #fff;
          width: 470px;
          height: 550px;
          flex-direction: column;
        "
      >
        <ChangeMessage @close="handleClose"></ChangeMessage>
      </div>
    </div>
    <div class="grid-row">
      <div class="left-logo">
        <img src="../../assets/images/head.png" alt="" style="height: 75px" />
      </div>
      <Menu></Menu>
      <div
        class="right-avatar"
        @mouseover="showDiv2"
        @mouseleave="hideDiv2IfNeeded"
        id="right-avatar"
      >
        <img
          src="../../assets/images/avatar.gif"
          alt=""
          v-if="store.token"
          class="com"
        />
        <div class="Unlogin com" v-else @click="toLogin">登录</div>
        <span style="color: #fff">{{ store.nickname }}</span>
      </div>
      <div class="second-menu" id="second-menu" v-if="isDiv2Visible">
        <ul @click="isDiv2Visible = false">
          <li @click="showPasswordBox = true">修改密码</li>
          <li @click="showMessageBox = true">修改信息</li>
          <li @click="backLogin">退出登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { UserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";
import ChangePassword from "./changePassword.vue";
import ChangeMessage from "./changeMessage.vue";
import Menu from "./Menu.vue";
import { ElMessage } from "element-plus";

const props = defineProps({});
const store = UserStore();
const router = useRouter();
const showPasswordBox = ref(false);
const showMessageBox = ref(false);

const isDiv2Visible = ref(false); // 初始状态为隐藏

// 显示div2
const showDiv2 = () => {
  if (store.token) isDiv2Visible.value = true;
};

// 隐藏div2（如果鼠标离开了div1且没有进入div2）
const hideDiv2IfNeeded = (event: MouseEvent) => {
  // 检查鼠标是否离开了div1且没有进入div2
  const div2 = document.getElementById("second-menu");
  const div1 = document.getElementById("right-avatar");
  if (
    !div1.contains(event.relatedTarget as Node) &&
    !div2.contains(event.relatedTarget as Node)
  ) {
    isDiv2Visible.value = false;
  }
};
function toLogin() {
  router.push({ name: "Login" });
}

//退出登录
function backLogin() {
  console.log(localStorage.getItem("username"));
  localStorage.removeItem("username"); // 假设'userToken'是存储用户会话信息的键
  localStorage.removeItem("password");
  console.log(localStorage.getItem("username"));
  store.userbackLogin().then(() => {
    ElMessage.success("退出成功");
  });
}

function handleClose(message) {
  console.log("子组件关闭了，并传递了消息：", message);
  // 在这里处理关闭事件和消息
  showPasswordBox.value = false;
  showMessageBox.value = false;
}
</script>
<style lang="scss" scoped>
.header-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: grid;
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 900;
    .password-box {
      width: 414px;
      padding: 20px;
      height: 500px;
      background-color: #f3f5f6;
      z-index: 999;
      position: relative;
      margin-top: 55px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .grid-row {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    grid-column-gap: 20px;
    overflow-wrap: anywhere;

    .right-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 100%;
      .com {
        width: 50px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
      .Unlogin {
        height: 50px;
        background-color: #64d9d6;
        line-height: 50px;
        text-align: center;
        color: #fff;
      }
    }

    .second-menu {
      position: absolute;
      top: 65px;
      right: 50px;
      border-radius: 16px;
      box-shadow: 0 16px 32px 0 rgba(53, 48, 48, 0.08);
      width: 200px;
      height: 150px;
      overflow: hidden;
      background-color: #fff;
      z-index: 800;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-top: 5px;
        li {
          margin: 0;
          line-height: 45px;
          width: 100%;
          margin: 2px 5px;
          padding-left: 33px;
          cursor: pointer;
        }
        li:hover {
          background-color: #f8f6f6;
        }
      }
    }
  }
}
</style>
