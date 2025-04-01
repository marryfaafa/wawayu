<template>
  <div></div>
  <div class="container">
    <div class="container-box">
      <div class="left-choice">
        <ul>
          <li :class="{ active: 0 == isActive }" @click="isActive = 0">
            简历投递
          </li>
          <li :class="{ active: 1 == isActive }" @click="isActive = 1">
            个人简历
          </li>
        </ul>
      </div>
      <div class="participate-box" v-show="isActive == 0">
        <participate></participate>
      </div>
      <div class="participate-box" v-show="isActive == 1">
        <information></information>
      </div>

      <!-- <div class="video-box" v-show="isActive == 0">
        <Video src="../../assets/aaa.mp4" :poster="poster"></Video>
      </div>
      <div class="check" v-show="isActive == 1">
        <div class="check-box">
          <videoCheck></videoCheck>
        </div>
      </div>

      <div class="table-box" v-show="isActive == 1">
        <tableBox></tableBox>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import information from "./components/information.vue";
import participate from "./components/participate.vue";
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = useStore();
const router = useRouter();

const isActive = ref(0);
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  // min-height: 603px;
  // overflow-y: hidden;
  .container-box {
    background: #f0f1f6;
    position: absolute;
    height: 1053px;
    width: 100%;
    .left-choice {
      width: 207px;
      height: 107px;
      background-color: #fff;
      font-size: 16px;
      color: #333;
      //   border: 1px solid #797979;
      margin-left: 30px;
      margin-top: 20px;
      ul {
        list-style: none;
        padding: 16px;
        li {
          margin-bottom: 15px;
          cursor: pointer;
        }
        li:hover {
          color: #7373e5;
        }
        .active {
          color: #7373e5;
        }
      }
    }
    .participate-box {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      height: 600px;
      top: 20px;
    }
  }
}
</style>
