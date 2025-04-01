<template>
  <div class="table-container">
    <div class="inner-table-container">
      <div class="tap">
        <div class="title">上报记录</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>图片</th>
            <th>上报地点</th>
            <th>上报时间</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in tableItems"
            :key="item.index"
            style="height: 72px !important"
          >
            <td class="image-cell">
              <img
                :src="pictureAddress"
                alt=""
                style="height: 50px; width: 50px"
              />
            </td>
            <td>{{ item.reportAddress }}</td>
            <td>{{ item.escalationTime }}</td>
            <td>{{ item.remark }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";

import { reqReportgetTable } from "@/api/index";
import { getDefaultLibFileName } from "typescript";
const props = defineProps({});
const store = UserStore();
const router = useRouter();

async function getTable() {
  let res = await reqReportgetTable();
  console.log("记录3", res);
  const responseData = res;

  // 在每个数据对象中添加index属性
  const dataWithIndex = responseData.map((item, index) => ({
    ...item,
    index,
  }));

  tableItems.value = dataWithIndex;
}

onMounted(() => {
  getTable();
  console.log("状态",store.token)
});

const tableItems = ref([]);
</script>
<style lang="scss" scoped>
* {
  font-size: 14px;
  text-align: center;
  color: #2e3032;
}
.table-container {
  background-color: #fff;
  height: 630px;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner-table-container {
    position: absolute;
    width: 90%;
    // height: 100%;
    height: 600px;
    overflow-y: auto; /* 启用垂直滚动条 */
    border: 1px solid #ccc; /* 可选：添加边框以查看容器 */
    .tap {
      height: 25px;
      background-color: #f2f2f2;
      margin-bottom: 20px;
      .title {
        height: 24px;
        width: 72px;
        background-color: #e4f1ff;
        color: #1485fe;
        line-height: 24px;
      }
    }
    table {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      width: 90%;
      height: 600px;

      thead {
        background-color: #738394;
        height: 42px;
        th {
          color: #fff;
        }
      }
      th:nth-child(1) {
        width: 142px;
      }
      tbody {
        tr {
          td {
            white-space: wrap; /* 允许内容换行 */
            overflow: hidden; /* 内容超出部分隐藏 */
            text-overflow: ellipsis; /* 超出部分显示省略号 */
          }
          td:nth-child(2) {
            width: 206.4px; /* 设置最大宽度，根据需要调整 */
          }
          td:nth-child(3) {
            width: 222px; /* 设置最大宽度，根据需要调整 */
          }
          td:nth-child(4) {
            width: 292px; /* 设置最大宽度，根据需要调整 */
          }
        }
      }
    }
  }
}
</style>
