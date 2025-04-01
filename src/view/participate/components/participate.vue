<template>
  <div class="participate-container">
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="wpform-field-container">
          <div class="field-container">
            <label for="age"
              >年龄 <span style="color: #ff0000">*</span></label
            >
            <input
              type="number"
              id="age"
              v-model="formData.age"
              class="item age"
              required
            />
          </div>
          <div class="field-container">
            <label for="phone"
              >电话 <span style="color: #ff0000">*</span></label
            >
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="item"
              required
            ></input>
          </div>
          <div class="field-container">
            <label for="address"
              >家庭住址 <span style="color: #ff0000">*</span></label
            >
            <textarea
              id="address"
              v-model="formData.address"
              class="item"
              required
            ></textarea>
          </div>
          <div class="field-container">
            <label for="experience"
              >志愿经历<span style="color: #ff0000">*</span></label
            >
            <textarea
            id="experience"
              v-model="formData.volunteerExperiences" 
              class="item item2"
              required></textarea>
          </div>
          <div class="field-container">
            <label for="praise"
              >荣誉奖项 <span style="color: #ff0000">*</span></label
            >
            <textarea
            id="praise"
              v-model="formData.awards" 
              class="item item2"
              required></textarea>
            
          </div>
          <div class="field-container">
            <label for="assessment"
              >自我评价 <span style="color: #ff0000">*</span></label
            >
            <textarea  v-model="formData.selfEvaluations" class="item item2" required id="assesment"></textarea>
          </div>
          <div class="field-container">
            <label for="workCount"
              >文章篇数 <span style="color: #ff0000">*</span></label
            >
            <input type="number" id="worksCount" v-model="formData.worksCount" class="item age" required> 
          </div>
        </div>
        <div class="btn"><button type="submit" >提交</button></div>
        
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive } from "vue";
import { useRouter } from "vue-router";

import {reqJoinus} from '@/api'
import { ElMessage } from "element-plus";
import { FunctionStore } from "../../../store/modules/function";
const props = defineProps({});
const router = useRouter();
const store=FunctionStore();

const formData = reactive({
  age: "",
  address: "",
  phone: "",
  volunteerExperiences: "", // 初始化为两个空字符串数组，可以动态增减
  selfEvaluations: "", // 同样初始化为两个空字符串数组
  worksCount: 0,
  awards: "", // 这里可能需要一个方法来添加奖项
});
const extractedSentences = ref<string[]>([]);  //分割后的志愿经历
  

function splitByNumberedItems(text) { 
  console.log(text,'df') 
  // 定义提取分行的函数
      // 将textarea中的文本按行分割
      const lines =text.split('\n');
     // 创建一个空数组来存储分割后的行
const lineArray = [];
      // 遍历行数组并处理
      lines.forEach((line, index) => {
        lineArray.push(line);
        // 这里可以添加更多的处理逻辑
      })
      return lineArray;
};

const submitForm = async() => {
  // 这里可以添加表单提交的逻辑
  console.log(formData);
  console.log(formData.selfEvaluations)
  const re1=splitByNumberedItems(formData.volunteerExperiences)
  const re2=splitByNumberedItems(formData.selfEvaluations)
  const re3=splitByNumberedItems(formData.awards)
  console.log(re1,re2,re3)
  let res=await reqJoinus(formData.age,formData.phone,formData.address,re1,re3,re2,formData.worksCount); 
  ElMessage.success("谢谢您的申请请等待审核！！！")
};
</script>
<style lang="scss" scoped>
.participate-container {
  width: 820px;
  height: 1030px;
  background-color: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-container {
    form {
      //   padding-top: 0;
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
        .item2 {
          height: 130px;
        }
        .age {
          width: 200px;
        }
      
      }
      .btn {
          display: flex;
          justify-content: center;
          button {
            color: #FFFFFF;
            height: 45px;
            width: 308px;
            font-size: 18px;
            border-radius: 8px;
            outline: none;
            cursor: pointer;
            background-image: linear-gradient(to bottom right, #0635F5, #8C09FD); /* 左上到右下 */ 
            border: none;
          }
        }
    }
  }
}
</style>
