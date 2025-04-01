<template>
  <div class="myHeading-container">
    <div class="user-head-t">
      <div class="user-avatar">
        <img
          :src="store.avatar"
          alt=""
          style="height: 90px; width: 90px; border-radius: 50%"
        />
      </div>
      <div class="user-info">
        <div class="user-head-info-r-t">
          <div class="user-name">{{ store.nickname }}</div>
          <div class="submit" @click="submit">发表文章</div>
        </div>
        <div class="user-head-info-r-c">
          <ul
            style="
              display: flex;
              list-style: none;
              padding-left: 0;
              padding-top: 0px;
            "
          >
            <li v-for="(item,index) in infoItems" :key="index">
              <span
                style="
                  color: #222226;
                  font-weight: 600;
                  font-size: 20px;
                  line-height: 24px;
                  margin-right: 4px;
                "
                >{{ item.number }}</span
              >
              <span
                style="
                  color: #555666;
                  font-size: 14px;
                  line-height: 16px;
                  margin-top: 2px;
                "
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="user-head-b">
      <div class="join-time">加入社区时间:{{joinTime}}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";

const props = defineProps({
  parentData:{
    type:Object,
    require:true
  }
});
const store = UserStore();
const router = useRouter();
const emit = defineEmits(["SubmitBody"]);

const infoItems = ref([
  {name: "总访问量", number: 0 },
  {name: "原创", number: 0 },
]);
const joinTime=ref('')

function submit() {
  emit("SubmitBody");
}
onMounted(()=>{
  console.log("我的fdbgtrhbzv",props.parentData,props.parentData.totalView)
  infoItems.value[0].number=props.parentData.totalView
  infoItems.value[1].number=props.parentData.createNum
  joinTime.value=props.parentData.joinTime
  store.createNum=props.parentData.createNum
})
</script>
<style lang="scss" scoped>
.myHeading-container {
  position: absolute;
  height: 157px;
  width: 86%;
  padding-left: 16px;
  padding-right: 24px;
  background-color: #fff;
  .user-head-t {
    width: 100%;
    height: 102px;
    display: flex;
    // justify-content: space-between;
    .user-avatar {
      margin-top: 12px;
      width: 90px;
      height: 90px;
      border: 4px solid #f0f0f2;
      border-radius: 50%;
    }
    .user-info {
      margin-left: 16px;
      width: 90%;
      .user-head-info-r-t {
        display: flex;
        align-items: center;
        margin-top: 16px;
        justify-content: space-between;
        .user-name {
          color: #222226;
          font-size: 22px;
          line-height: 24px;
        }
        .submit {
          height: 39px;
          width: 100px;
          background-color: #00965e;
          color: #fff;
          border-radius: 4px;
          line-height: 39px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          margin-right: 48px;
        }
      }
      .user-head-info-r-c {
        margin-top: 10px;
        width: 90%;
        li {
          margin-right: 32px;
        }
      }
    }
  }
  .user-head-b {
    padding-left: 118px;
    margin-top: 10px;
    .join-time {
      font-size: 14px;
      color: #555556;
      line-height: 22px;
    }
  }
}
</style>
