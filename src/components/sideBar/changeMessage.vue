<template>
  <div class="message-container" style="z-index: 1000000;">
    <div class="icon">
      <img
        src="../../assets/icons/线性左箭头.svg"
        alt=""
        style="height: 28px; width: 28px; cursor: pointer"
        @click="back"
      />
    </div>
    <form @submit.prevent="changeMessage">
      <div class="item">
        <label for="username">昵称：</label>
        <input
          type="text"
          id="username"
          v-model="user.nickname"
          value="store.nickname"
        />
      </div>
      <div class="item">
        <label for="enail">邮箱解绑：</label>
        <input type="text" value="store.username" v-model="user.email" />
        <!-- <span style="color: #00cccc; cursor: pointer; margin-left: 20px"
          >解绑</span
        > -->
      </div>
      <div class="item">
        <label for="sex">性别：</label>
        <el-radio-group v-model="user.gender" size="medium" id="sex">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </div>
      <div class="itemm item2">
        <label for="avatar">头像：</label>
        <img :src="user.imageUrl" alt="" />
        <span style="color: #00cccc; cursor: pointer; margin-left: 28px"
          >上传新头像</span
        >
        <input
          type="file"
          style="
            height: 40px;
            width: 85px;
            position: absolute;
            right: 113px;
            opacity: 0;
          "
          accept="image/*"
          @change="handleFileUpload"
        />
      </div>
      <div class="item item1">
        <button class="button1" @click="clear">重置</button
        ><button class="button2" @click="submit">提交</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits } from "vue";
import { UserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";
import { ElRadioGroup, ElRadio, ElMessage } from "element-plus";
import Submit from "../community/submit.vue";

const props = defineProps({});
const store = UserStore();
const router = useRouter();
const emit = defineEmits(["close"]); // 定义名为 'close' 的自定义事件
const user = reactive({
  nickname: store.nickname,
  gender: store.gender,
  imageUrl: store.avatar,
  email: store.username,
});

const avatarInput = ref<HTMLInputElement | null>(null);
let selectedFile: File | null = null;

function clear() {
  console.log(store.gender);
  user.gender = store.gender;
  user.nickname = store.nickname;
  user.email = store.username;
}

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile = target.files[0];
    console.log("头像", selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      // 当文件读取完成后，将结果（数据 URL）设置为图片的 src
      user.imageUrl = e.target?.result as string;
    };

    // 读取文件为 DataURL
    reader.readAsDataURL(selectedFile);
    console.log(user.imageUrl);

    // 你可以在这里添加其他逻辑，如校验文件类型、大小等
  }

  // 在这里可以添加预览功能或校验文件类型、大小等
};
async function changeMessage() {
  store
    .userchangeMessage(
      user.nickname,
      user.email,
      user.gender,
      selectedFile,
      user.imageUrl
    )
    .then(() => {
      ElMessage.success("修改成功");
      localStorage.setItem("username", user.email);
      emit("close");
    });
}

function back() {
  console.log("发送");
  emit("close", "auaq关闭"); // 触发 'close' 事件，并传递一个参数
}
</script>
<style lang="scss" scoped>
.message-container {
  font-size: 16px;
  height: 530px;
}

.icon {
  margin-bottom: 40px;
}
label {
  width: 80px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
}

.item {
  height: 40px;
  color: #000;
  margin-bottom: 30px;
  display: flex;
}
.item1 {
  display: flex;
  justify-content: space-around;
}
.item2 {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
input {
  height: 40px;
  border: 1px solid #cccccc;
  width: 270px;
}
img {
  height: 107px;
  width: 107px;
  border-radius: 54px;
}

span {
  line-height: 40px;
}
button {
  height: 40px;
  width: 120px;
  cursor: pointer;
}
.button1 {
  background-color: #fff;
  border: 1px solid #00cccc;
  color: #00cccc;
}
.button2 {
  background-color: #00cccc;
  color: #fff;
}
.avatar-uploader {
  width: 107px !important;
  height: 107px;
}
</style>
