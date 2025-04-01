<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            <img
              :src="column.icon"
              alt=""
              style="
                width: 20px;
                height: 20px;
                margin-right: 10px;
                vertical-align: middle;
              "
            />{{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <!-- Record列特殊处理，显示头像和用户名 -->
          <td class="record">
            <el-avatar
              :size="28"
              :src="row.ossAvatar || defaultAvatarUrl"
              style="vertical-align: middle; margin-right: 10px"
            />
            <span>{{ row.username }}</span>
          </td>
          <td
            v-for="(column, columnIndex) in columns.slice(1)"
            :key="`${rowIndex}-${columnIndex}`"
          >
            <!-- 判断是否为志愿者列 -->
            <template v-if="column.field === 'volunteer'">
              <img
                v-if="row[column.field] == 1"
                src="../../../assets/icons/打勾1.svg"
                alt="True"
                style="height: 20px; width: 20px"
              />
              <img
                v-else
                src="../../../assets/icons/打叉.svg"
                alt="False"
                style="height: 20px; width: 20px"
              />
            </template>
            <!-- 判断是否是原创 -->
            <template v-else-if="column.field === 'createNum'">
              <span
                :class="getClass(row, column)"
                style="
                  display: inline-block;
                  padding: 0 10px;
                  border-radius: 4px;
                "
                >{{ row[column.field] }}</span
              >
            </template>
            <template
              v-else-if="
                column.field === 'reportNum' ||
                column.field === 'recognitionNum'
              "
            >
              <span
                :class="getClass(row, column)"
                style="
                  height: 14px;
                  width: 14px;
                  border-radius: 7px;
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 10px;
                "
              ></span
              >{{ row[column.field] }}
            </template>
            <!-- 判断是否是权限 -->
            <template v-else-if="column.field === 'escalationPermissions'">
              <el-icon
                style="height: 30px; width: 30px; vertical-align: middle"
              >
                <Position
                  v-if="row[column.field] === 1"
                  :style="{ color: '#13ce66' }"
                />
                <Position v-else :style="{ color: '#e74744' }" />
              </el-icon>
              <span
                style="color: #0600ff; cursor: pointer"
                @click="centerDialogVisible = true"
                >修改权限</span
              >
              <el-dialog
                v-model="centerDialogVisible"
                title="Warning"
                width="500"
                align-center
              >
                <span style="color: #606266; text-align: center"
                  >Are you sure you want to modify the permissions?</span
                >
                <template #footer>
                  <div class="dialog-footer">
                    <el-button
                      @click="centerDialogVisible = false"
                      style="color: #606266"
                      >Cancel</el-button
                    >
                    <el-button
                      type="primary"
                      @click="changePermission(row, column)"
                    >
                      Confirm
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </template>

            <!-- 如果不是志愿者列则显示默认值 -->
            <template v-else>
              {{ row[column.field] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[8, 10, 12, 14]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: center"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, onMounted, reactive, watch } from "vue";
import { UserStore } from "../../../store/modules/user";
import { useRouter } from "vue-router";
import {
  ElAvatar,
  ElIcon,
  ElDialog,
  ElButton,
  ElMessage,
  ElPagination,
  ElTag,
} from "element-plus";
import { reqgetUsers,reqChangePermission } from "../../../api";

const props = defineProps({});
const store = UserStore();
const router = useRouter();

const centerDialogVisible = ref(false); //修改权限对话框
let create = reactive({
  less: 0,
  center: 0,
  top: 0,
});
let report = reactive({
  less: 0,
  center: 0,
  top: 0,
});
let recognition = reactive({
  less: 0,
  center: 0,
  top: 0,
});
const pagesize = ref(10);
const currentPage = ref(1);
// 假设的默认头像URL
const defaultAvatarUrl =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

// 表格列定义
interface Column {
  header: string;
  field: string;
  icon: String;
}
// 表格数据
const tableData = computed(() => store.userData);
const total = computed(() => store.total);

//获取表头图标
const getImg = (name) => {
  return `/src/assets/icons/${name}.svg`;
};
// 根据 row 和 column 的值计算 span 的类名  ，设置背景颜色
const getClass = computed(() => {
  return (row: any, column: any) => {
    const value = row[column.field];
    if (column.field === "createNum") {
      if (value < create.less) {
        return "bg-less";
      } else if (value >= create.center && value < create.top) {
        return "bg-equal";
      } else {
        return "bg-greater";
      }
    } else if (column.field === "reportNum") {
      if (value < report.less) {
        return "circle-less";
      } else if (value >= report.center && value < report.top) {
        return "circle-equal";
      } else {
        return "circle-greater";
      }
    } else {
      if (value < recognition.less) {
        return "circle-less";
      } else if (value >= recognition.center && value < recognition.top) {
        return "circle-equal";
      } else {
        return "circle-greater";
      }
    }
  };
});

// 表格列定义
const columns = ref<Column[]>([
  {
    header: "Record",
    field: "record",
    icon: getImg("用户"),
  },
  { header: "Email", field: "email", icon: getImg("邮箱") },
  { header: "Recognition", field: "recognitionNum", icon: getImg("识别") },
  { header: "Report", field: "reportNum", icon: getImg("已上报") },
  { header: "Created", field: "createNum", icon: getImg("创造力") },
  { header: "Volunteer?", field: "volunteer", icon: getImg("打勾") },
  { header: "JoinTime", field: "joinTime", icon: getImg("时间") },
  {
    header: "Permission",
    field: "escalationPermissions",
    icon: getImg("坐标"),
  },
]);
//换页
function handleCurrentChange(currentpage) {
  currentPage.value = currentpage;
  store.pagenum = currentPage.value;
  getUsers();
  console.log("修改页码",store.pagenum)
}
//修改页数大小
function handleSizeChange(size) {
  pagesize.value = size;
  store.pagesize = pagesize.value;
  getUsers();
  console.log("修改页数",store.pagesize)
}
//修改权限
async function changePermission(row: any, column: any) {
  let res=await reqChangePermission(row.id)
  centerDialogVisible.value = false;
  ElMessage.success("修改成功");
  console.log("膝盖", row, column, column.field, row[column.field]);
  if (row[column.field] == 0) row[column.field] = 1;
  else {
    row[column.field] = 0;
  }
  console.log("膝盖", row[column.field]);

  
}

async function getUsers() {
  let res = await reqgetUsers(currentPage.value, pagesize.value);
  console.log("表格", res);
  store.userData = res.record;
  store.total = res.total;
  console.log("表格", tableData.value);
  create = Calculate("createNum");
  report = Calculate("reportNum");
  recognition = Calculate("recognitionNum");
}
//计算三个等级
function Calculate(name: any) {
  // 遍历tableData数组，找出report字段的最大值和最小值
  let minVal = Infinity;
  let maxVal = -Infinity;
  tableData.value.forEach((item) => {
    const create = item[name];
    minVal = Math.min(minVal, create);
    maxVal = Math.max(maxVal, create);
  });
  // 计算等级边界
  const less = (maxVal - minVal) / 3 + minVal;
  const center = ((maxVal - minVal) * 2) / 3 + minVal;
  const top = maxVal;

  // 返回一个包含等级边界的对象
  return { less, center, top };
}

onMounted(() => {
  getUsers();
});

// watch(tableData, (newValues, oldValues) => {
//   console.log("心得", tableData);
// });
</script>
<style lang="scss" scoped>
* {
  color: #ffffff;
  font-family: "Script Fonts", sans-serif;
  text-align: left;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.el-pagination {
  margin-top: 40px;
}
table {
  border-collapse: collapse; /* 合并相邻边框 */
  width: 95%;
  border-spacing: 0 10px; /* 设置thead和tbody之间的垂直距离为10像素 */
}
table td {
  border: 1px solid #3c3d41; /* 边框样式 */
  height: 46px;
  padding-left: 20px;
  /* 防止内容换行 */
  white-space: nowrap;
  /* 溢出内容隐藏 */
  overflow: hidden;
  /* 使用文本溢出省略号 */
  text-overflow: ellipsis;
}

/* 排除第一列的边框 */
table tr td:first-child {
  border-left: none; /* 移除左侧边框 */
}

/* 排除最后一列的边框 */
table tr td:last-child {
  border-right: none; /* 移除右侧边框 */
}
thead th {
  font-size: 16px;
  font-weight: normal;
  padding-left: 20px;
}

.record {
  text-align: left;
}
.bg-less {
  background-color: #857c2e;
}
.bg-equal {
  background-color: #85692e;
}
.bg-greater {
  background-color: #855c2e;
}
.circle-less {
  background-color: #29aad0;
}
.circle-equal {
  background-color: #294cd0;
}
.circle-greater {
  background-color: #d06829;
}
</style>
