<template>
  <div class="modify">
    <div class="top-tap">添加博客</div>
    <form @submit.prevent="modify">
      <div class="item">
        <label for="title">*博客标题:</label>
        <input
          type="text"
          id="title"
          placeholder="请输入"
          class="com"
          v-model="modifyData.title"
          required
        />
      </div>
      <div class="item">
        <label for="description">*描述:</label>
        <el-input
          style="width: 518px; border: 1px solid #797979; margin-left: 8px"
          autosize
          type="textarea"
          id="description"
          placeholder="请输入"
          v-model="modifyData.des"
        />
      </div>
      <div class="item">
        <label for="description">*链接:</label>
        <input
          type="text"
          id="title"
          placeholder="请输入"
          class="com"
          v-model="modifyData.link"
          required
        />
      </div>
      <div class="item">
        <div class="btns">
          <button
            style="color: #fff; background-color: #8080ff"
            @click="submit"
          >
            确定
          </button>
          <button style="color: #000; background-color: #fff" @click="cancel">
            <img
              src="../../../assets/icons/闪电.svg"
              alt=""
              style="
                height: 10px;
                width: 10px;
                position: absolute;
                right: 5px;
                top: 5px;
              "
            />
            取消
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, reactive } from "vue";
import { FunctionStore } from "../../../store/modules/function";
import { useRouter } from "vue-router";
import { ElInput, ElMessage } from "element-plus";

const props = defineProps({});
const store = FunctionStore();
const router = useRouter();
const emit = defineEmits(["cancel"]);
const modifyData = reactive({
  title: "",
  link: "",
  des: "",
});
function cancel() {
  emit("cancel");
}
async function modify() {
  store
    .publicSciene(modifyData.link, modifyData.des, modifyData.title)
    .then(() => {
      ElMessage.success("发布成功");
      emit("cancel");
    });
}
</script>
<style lang="scss" scoped>
* {
  font-size: 18px;
  color: #000;
}

.el-input {
  width: 518px;
  height: 35px;
  border: 1px solid #797979;
  margin-left: 8px;
}
.com {
  width: 518px;
  height: 35px;
  border: 1px solid #797979;
  margin-left: 8px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modify {
  width: 100%;
  height: 610px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .top-tap {
    width: 999px;
    height: 44px;
    background-color: #1b0173;
    line-height: 44px;
    padding-left: 15px;
    color: #fff;
  }
  form {
    width: 999px;
    height: 450px;
    background-color: #fff;
    color: #000 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .item {
      margin-bottom: 30px;
      position: relative;
      label {
        text-align: right;
        width: 100px; /* 可以根据需要调整宽度 */
        display: inline-block;
        vertical-align: middle;
        line-height: 35px;
      }
      .btns {
        width: 158px;
        height: 35px;
        display: flex;
        justify-content: space-between;
        button {
          font-size: 16px;
          line-height: 35px;
          padding: 0 1.2em;
          border: 1px solid #797979;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
