<template>
  <div class="detail-container">
    <div class="detail-container-box">
      <div class="detail-box">
        <div class="wpforms-container">
          <form @submit.prevent="submitForm">
            <div class="wpform-head-container">
              <div class="wp-form-title">报告发现中国大鲵的情况</div>
            </div>
            <div class="wpform-field-container">
              <div class="field-container">
                <label for="field"
                  >发现位置 <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  id="field"
                  class="item"
                  disabled
                  v-model="form.add"
                />
              </div>
              <div class="field-container">
                <label for="describe"
                  >大鲵体长、形态、发现过程等描述
                  <span style="color: #ff0000">*</span></label
                >
                <textarea
                  type="text"
                  id="describe"
                  class="item"
                  required
                  v-model="form.describe"
                  :disabled="flag"
                ></textarea>
              </div>
              <div class="field-container">
                <label for="photo">上传大鲵或发现地相片 </label>
                <input
                  class="file"
                  type="file"
                  @change="handleFileChange"
                  v-if="!imageUrl"
                />
                <div class="overlay" v-if="!imageUrl">
                  <el-icon style="color: #8c939d"
                    ><Plus
                      style="width: 50px !important; height: 50px !important"
                  /></el-icon>
                </div>
                <el-image
                  :src="imageUrl"
                  alt="Uploaded image"
                  v-if="imageUrl"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[imageUrl]"
                />
                <el-icon v-if="imageUrl && !flag" @click="handDelete"
                  ><Delete
                    style="
                      height: 25px;
                      width: 25px;
                      margin-left: 10px;
                      cursor: pointer;
                    "
                /></el-icon>
              </div>
            </div>
            <button type="submit">提交</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted } from "vue";
import { FunctionStore } from "../../store/modules/function";
import { useRouter, useRoute } from "vue-router";

import { ElImage, ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps();
const store = FunctionStore();
const router = useRouter();
const route = useRoute();
const form = reactive({
  add: "",
  describe: "",
});
const file = ref<File | null>(null);
const imageUrl = ref<string>("");
const flag = ref(false); //上报是否成功

const handleFileChange = (event: Event) => {
  console.log("aasd");
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    imageUrl.value = URL.createObjectURL(file.value);
  }
};

function submitForm() {
  if (form.describe) {
    store.userReport(form, file.value).then(() => {
      ElMessage.success("上报成功");
      flag.value = true;
       // 设置下一次遍历的延迟  
  setTimeout(() => {  
    router.push({name:'Report'})
    store.showTable=true
  }, 2000); // 延迟1秒 
      
    });
  }
}

function handDelete() {
  imageUrl.value = "";
}

onMounted(() => {
  console.log("接收", route.params.address);
  form.add = route.params.address;
  console.log("a", form.add);
  store.flag=true
});
</script>
<style lang="scss" scoped>
.detail-container {
  box-sizing: border-box;
  width: 100%;
  height: 680px !important;
  position: absolute;
  margin-top: -24px;
  .detail-container-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 24px;
    .detail-box {
      position: absolute;
      //   width: 100%;
      //   height: 100%;
      margin: 20px 20% 0 20%;
      .wpforms-container {
        margin-bottom: 26px;
        height: 500px;
        .wp-form-title {
          font-size: 26px;
          margin: 0 0 10px 0;
        }
        .wpform-field-container {
          margin-top: 20px;
          .field-container {
            margin-bottom: 25px;
            label {
              display: block;
              font-weight: 700;
            }
            .item {
              color: #666;
              padding: 0.75em;
              border: 1px solid #ddd;
              border-radius: 2px;
              display: block;
              //   width: 100%;
              outline: none;
              margin-top: 10px;
              width: 382px;
              height: 42px;
              box-sizing: border-box;
            }
            textarea {
              height: 120px !important;
              width: 637px !important;
              font-size: 1rem;
              font-weight: 400;
            }
            .error-message {
              color: #990000;
              font-size: 0.9em;
              margin-top: 5px;
            }
            .file {
              margin-top: 10px;
              width: 200px;
              height: 200px;
              border: 1px dashed var(--el-border-color);
              cursor: pointer;
              position: relative;
              opacity: 0;
              z-index: 120;
            }
            .overlay {
              position: absolute;
              bottom: 72px;
              width: 200px;
              height: 200px;
              border: 1px dashed var(--el-border-color);
              cursor: pointer;
              z-index: 100;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .file:hover {
              border-color: var(--el-color-primary);
            }
            .el-image {
              width: 200px !important;
              height: 200px !important;
              margin-top: 10px;
              object-fit: cover; /* 让图片按比例填充容器，并裁剪外部部分，可能会剪裁图片 */
            }
          }
        }

        button {
          float: left;
          width: 100px;
          height: 47px;
          color: #fff;
          background-color: #d94948;
          border-color: #d94948;
          padding: 16px 30px;
          font-weight: 600;
          line-height: 1em;
          border-radius: 100px;
          display: block;
          text-align: center;
          border: none;
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
