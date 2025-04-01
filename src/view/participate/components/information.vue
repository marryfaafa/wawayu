<template>
  <div class="information-container">
    <div class="side"></div>
    <div class="right-show">
      <div class="show-box">
        <div class="top-name item">
          <img
            src="../../../assets/images/avatar.gif"
            alt=""
            style="width: 100px; height: 120px"
          />
          <div class="person-data">
            <div class="name">{{ store.nickname }}</div>
            <div class="tel">
              {{ Data.tel }}
            </div>
            <div class="mix">
              <span>{{ Data.age }}岁</span><span class="fenge"></span
              ><span>{{ Data.add }}</span>
            </div>
          </div>
        </div>
        <div class="item experience">
          <div class="tap">
            <div class="box"></div>
            <div class="item-name">
              志愿经历
              <span class="gang"></span>
            </div>
          </div>
          <div class="experience-item">
            <ul>
              <li
                v-for="(item, index) in Data.volunteerExperiences"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="item praise">
          <div class="tap">
            <div class="box"></div>
            <div class="item-name">
              荣誉奖项
              <span class="gang"></span>
            </div>
          </div>
          <div class="experience-item">
            <ul>
              <li v-for="(item, index) in Data.awards" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="item assessment">
          <div class="tap">
            <div class="box"></div>
            <div class="item-name">
              自我评价
              <span class="gang"></span>
            </div>
          </div>
          <div class="experience-item">
            <ul>
              <li v-for="(item, index) in Data.selfEvaluations" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="item assessment">
          <div class="tap">
            <div class="box"></div>
            <div class="item-name">
              作品链接
              <span class="gang"></span>
            </div>
          </div>
          <div class="experience-item">
            <ul>
              <li>
                <router-link :to="{ path: 'community' }" style="color: #3727e1"
                  >https://www.mockpluscn</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";

import { reqgetResume } from "../../../api";
const props = defineProps({});
const store = UserStore();
const router = useRouter();
// const age = ref("");
// const tel = ref("");
// const add = ref("");
const Data = ref({
  age: "",
  tel: "",
  add: "",
  volunteerExperiences: [],
  selfEvaluations: [],
  awards: [],
});
const experienceItems = ref([
  { index: 0, content: "sfjksndgkjan" },
  { index: 1, content: "sfjksndgkjan" },
  { index: 2, content: "sfjksndgkjan" },
]);

const praiseItems = ref([
  { index: 0, content: "sfjksndgkjan" },
  { index: 1, content: "sfjksndgkjan" },
  { index: 2, content: "sfjksndgkjan" },
]);

const assessmentItems = ref([
  { index: 0, content: "sfjksndgkjan" },
  { index: 1, content: "sfjksndgkjan" },
  { index: 2, content: "sfjksndgkjan" },
]);

async function getResumeData() {
  let res = await reqgetResume();
  console.log(res);
  // age.value = res.age;
  // tel.value = res.tel;
  // add.value = res.add;
  // console.log(age.value, tel.value, add.value, "wfdsc");
  Data.value = { ...Data.value, ...res };
  // console.log(resumeData.value, "hjsa", resumeData.value.tel);
}

onMounted(() => {
  getResumeData();
});
</script>
<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  color: #333;
}
.tap {
  height: 34px;
  width: 100%;
  display: flex;
  align-items: center;
  .box {
    width: 34px;
    height: 34px;
    border-radius: 34px;
    background-color: #5974d4;
    margin-top: 0;
    margin-right: 20px;
  }
  .item1-name {
    font-size: 16px;
  }
}
.gang {
  display: inline-block;
  width: 570px;
  height: 1px;
  background-color: #d3d3d3;
  vertical-align: middle;
  margin-left: 5px;
}
.information-container {
  width: 820px;
  height: 1030px;
  background-color: #fff;
  display: flex;
  .side {
    width: 44px;
    height: 100%;
    background-color: #5974d4;
  }
  .right-show {
    width: 95%;
    padding: 0 35px;
    .show-box {
      height: 100%;
      .top-name {
        height: 150px;
        .person-data {
          width: 70%;
          height: 120px;
          padding: 15px 30px;
          .name {
            font-size: 24px;
            color: #333;
          }
          .tel {
            margin-top: 10px;
            color: #999;
          }
          .mix {
            margin-top: 10px;
            color: #999;
            font-size: 14px;
            .fenge {
              display: inline-block;
              height: 15px;
              width: 1px;
              background-color: #999;
              margin: 0 20px;
              margin-bottom: -2px;
            }
          }
        }
      }
      .experience,
      .praise,
      .assessment {
        height: 200px;
        display: block;

        .experience-item {
          ul {
            list-style-type: none; /* 移除默认的序列标记 */
            padding: 0; /* 移除默认的内边距 */
            color: #333333;
            li {
              line-height: 40px;
            }
          }
          ul li:before {
            content: "•"; /* 设置自定义的序列标记，比如实心圆点 */
            color: #858585; /* 设置序列标记的颜色 */
            margin-right: 5px; /* 设置序列标记的间距 */
          }
        }
      }
    }
  }
}
</style>
