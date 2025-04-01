<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上报时间" prop="time">
        <el-date-picker
          v-model="queryParams.time"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择上报时间"
          :shortcuts="dateShortcuts"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:report:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate(detectionList[ids[0]])"
          v-hasPermi="['system:detection:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:report:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:report:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table 
      v-loading="loading" 
      :data="detectionList" 
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="搅动次数" prop="jiaodong" align="center" />
      <el-table-column label="震动次数" prop="zhendong" align="center" />
      <el-table-column label="甩尾次数" prop="chsihi" align="center" />
      <el-table-column label="进洞次数" prop="jindong" align="center" />
      <el-table-column label="触动次数" prop="chudong" align="center" />
      <el-table-column label="扇尾次数" prop="shanwei" align="center" />
      <el-table-column label="无行为次数" prop="noDetections" align="center" />
      <el-table-column label="用户ID" prop="userId" align="center" />
      <el-table-column label="检测时间" align="center" prop="time" width="180">
        <template #default="scope">
          <span>{{ formatDate(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频地址" prop="oss" align="center" show-overflow-tooltip>
        <template #default="scope">
          <el-link type="primary" :href="scope.row.oss" target="_blank">查看视频</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template #default="{ row }">
          <el-button 
            link 
            type="primary" 
            @click="handleUpdate(row)"
          >修改</el-button>
          <el-button 
            link 
            type="primary" 
            @click="handleDelete(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-container">
      <div class="left">
        共 {{ total }} 条
      </div>
      <div class="right">
        <el-select v-model="queryParams.pageSize" style="width: 120px" @change="handleSizeChange">
          <el-option
            v-for="item in [10, 20, 30, 40]"
            :key="item"
            :label="`${item}条/页`"
            :value="item"
          />
        </el-select>
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          :total="total"
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 添加或修改上报对话框 -->
    <el-dialog 
      :title="title" 
      v-model="open" 
      width="500px" 
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="detectionRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="搅动次数" prop="jiaodong">
          <el-input-number v-model="form.jiaodong" :min="0" />
        </el-form-item>
        <el-form-item label="震动次数" prop="zhendong">
          <el-input-number v-model="form.zhendong" :min="0" />
        </el-form-item>
        <el-form-item label="甩尾次数" prop="chsihi">
          <el-input-number v-model="form.chsihi" :min="0" />
        </el-form-item>
        <el-form-item label="进洞次数" prop="jindong">
          <el-input-number v-model="form.jindong" :min="0" />
        </el-form-item>
        <el-form-item label="触动次数" prop="chudong">
          <el-input-number v-model="form.chudong" :min="0" />
        </el-form-item>
        <el-form-item label="扇尾次数" prop="shanwei">
          <el-input-number v-model="form.shanwei" :min="0" />
        </el-form-item>
        <el-form-item label="无行为次数" prop="noDetections">
          <el-input-number v-model="form.noDetections" :min="0" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" />
        </el-form-item>
        <el-form-item label="检测时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="视频地址" prop="oss">
          <el-input v-model="form.oss" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Detection">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { listDetection, getDetection, delDetection, addDetection, updateDetection } from "@/api/system/detection"
import { ElMessage, ElMessageBox } from 'element-plus'

const detectionList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref("")
const detectionRef = ref(null)
const queryRef = ref(null)

// 查询参数
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userId: undefined,
    time: undefined
  },
  rules: {
    userId: [{ required: true, message: '用户ID不能为空', trigger: 'blur' }],
    time: [{ required: true, message: '检测时间不能为空', trigger: 'blur' }]
  }
})

const { queryParams, form, rules } = toRefs(data)

// 重置表单
function reset() {
  form.value = {
    id: null,
    userId: undefined,
    jiaodong: 0,
    zhendong: 0,
    chsihi: 0,
    jindong: 0,
    chudong: 0,
    shanwei: 0,
    noDetections: 0,
    time: undefined,
    oss: ''
  }
  if (detectionRef.value) {
    detectionRef.value.resetFields()
  }
}

/** 查询列表 */
async function getList() {
  loading.value = true
    const res = await listDetection(queryParams.value)
      detectionList.value = res.records
      total.value = res.total
      loading.value=false
}

/** 提交表单 */
async function submitForm() {
  try {
    await detectionRef.value.validate()
    console.log('提交的表单数据:', form.value)  // 添加日志
    
    if (form.value.id) {
      console.log('执行修改操作，ID:', form.value.id)  // 添加日志
      const res = await updateDetection(form.value)
      console.log('修改返回结果:', res)
      ElMessage.success('修改成功')
      open.value = false
      await getList()
    } else {
      const res = await addDetection(form.value)
      ElMessage.success('新增成功')
      open.value = false
      await getList()
    }
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('操作失败')
  }
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleString()
}

// 取消按钮
function cancel() {
  open.value = false
  reset()
}

/** 搜索按钮操作 */
async function handleQuery() {
  queryParams.value.pageNum = 1
  await getList()
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true
  title.value = "添加上报"
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset()
  try {
    console.log('修改行数据:', row.id)  // 添加日志
    const res = await getDetection(row.id)
    console.log('获取到的详情数据:', res)
    
    // 确保 id 被正确赋值
    form.value = {
      id: row.id,  // 直接使用行数据的 id
      userId: res.userId,
      jiaodong: res.jiaodong || 0,
      zhendong: res.zhendong || 0,
      chsihi: res.chsihi || 0,
      jindong: res.jindong || 0,
      chudong: res.chudong || 0,
      shanwei: res.shanwei || 0,
      noDetections: res.noDetections || 0,
      time: res.time,
      oss: res.oss
    }
    
    console.log('修改表单数据:', form.value)  // 添加日志
    title.value = "修改检测结果"
    open.value = true
  } catch (error) {
    console.error('获取详情失败:', error)
    ElMessage.error('获取详情失败')
  }
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value
  ElMessageBox.confirm('是否确认删除上报编号为"' + _ids + '"的数据项？').then(async () => {
    await delDetection(_ids)
    getList()
    ElMessage.success("删除成功")
  }).catch(() => {})
}

// 处理每页条数变化
const handleSizeChange = (val) => {
  queryParams.value.pageSize = val
  getList()
}

// 处理页码变化
const handleCurrentChange = (val) => {
  queryParams.value.pageNum = val
  getList()
}

// 日期选择器快捷选项
const dateShortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  }
]

/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields()
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    userId: undefined,
    time: undefined
  }
  handleQuery()
}

// 初始化
onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;

  .el-table {
    margin-top: 15px;
    margin-bottom: 0;
    
    :deep(.el-table__header-wrapper) {
      th {
        background-color: #f5f7fa;
      }
    }
    
    :deep(.el-table__body-wrapper) {
      .el-table__row {
        td {
          padding: 8px 0;
        }
      }
    }
  }

  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #fff;
    margin-top: 0;
    border-top: 1px solid #ebeef5;

    .left {
      color: #606266;
      font-size: 13px;
    }

    .right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
