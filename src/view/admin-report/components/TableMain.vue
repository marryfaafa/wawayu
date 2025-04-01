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
      <el-form-item label="上报地址" prop="reportAddress">
        <el-input
          v-model="queryParams.reportAddress"
          placeholder="请输入上报地址"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片地址" prop="pictureAddress">
        <el-input
          v-model="queryParams.pictureAddress"
          placeholder="请输入图片地址"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上报时间" prop="escalationTime">
        <el-date-picker
          v-model="queryParams.escalationTime"
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
          @click="handleUpdate"
          v-hasPermi="['system:report:edit']"
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
      :data="reportList" 
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="用户id" prop="userId" align="center" />
      <el-table-column label="上报地址" prop="reportAddress" align="center" show-overflow-tooltip />
      <el-table-column label="图片地址" prop="pictureAddress" align="center" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" align="center" />
      <el-table-column label="上报时间" align="center" prop="escalationTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.escalationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:report:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:report:remove']">删除</el-button>
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
      <el-form ref="reportRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="上报地址" prop="reportAddress">
          <el-input v-model="form.reportAddress" placeholder="请输入上报地址" />
        </el-form-item>
        <el-form-item label="图片地址" prop="pictureAddress">
          <el-input v-model="form.pictureAddress" placeholder="请输入图片地址" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="上报时间" prop="escalationTime">
          <el-date-picker
            v-model="form.escalationTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择上报时间"
            :shortcuts="dateShortcuts"
            style="width: 100%"
          />
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

<script setup name="Report">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { listReport, getReport, delReport, addReport, updateReport, exportReport } from "@/api/system/report"
import { ElMessage, ElMessageBox } from 'element-plus'

const reportList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref("")
const reportRef = ref(null)
const queryRef = ref(null)

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userId: null,
    reportAddress: null,
    pictureAddress: null,
    escalationTime: null
  },
  rules: {
  }
})

const { queryParams, form, rules } = toRefs(data)

function resetForm(formRef) {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

function reset() {
  form.value = {
    id: null,
    userId: null,
    reportAddress: null,
    pictureAddress: null,
    remark: null,
    escalationTime: null
  }
  resetForm(reportRef)
}

/** 重置按钮操作 */
function resetQuery() {
  resetForm(queryRef)
  handleQuery()
}

/** 查询上报列表 */
async function getList() {
  loading.value = true
    const res = await listReport(queryParams.value)
    console.log("表格数据:", res)
    reportList.value = res.records
    total.value = res.total
    console.log("处理后的数据:", reportList.value)
    loading.value = false  
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
function handleUpdate(row) {
  reset()
  const _id = row.id || ids.value
  getReport(_id).then(res => {
    console.log('获取到的详情数据:', res) // 添加日志
    form.value = {
      id: res.id,
      userId: res.userId,
      reportAddress: res.reportAddress,
      pictureAddress: res.pictureAddress,
      remark: res.remark,
      escalationTime: res.escalationTime
    }
    title.value = "修改上报"
    open.value = true
  }).catch(error => {
    console.error('获取详情失败:', error)
    ElMessage.error('获取详情失败')
  })
}

/** 提交按钮 */
async function submitForm() {
  try {
    await reportRef.value.validate()
    if (form.value.id != null) {
      await updateReport(form.value)
      ElMessage.success("修改成功")
    } else {
      await addReport(form.value)
      ElMessage.success("新增成功")
    }
    open.value = false
    await getList()
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('操作失败')
  }
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value
  ElMessageBox.confirm('是否确认删除上报编号为"' + _ids + '"的数据项？').then(async () => {
    await delReport(_ids)
    getList()
    ElMessage.success("删除成功")
  }).catch(() => {})
}

/** 导出按钮操作 */
async function handleExport() {
  try {
    loading.value = true
    const params = {
      ...queryParams.value,
      pageNum: undefined,
      pageSize: undefined
    }
    const res = await exportReport(params)
    
    if (res.type === 'application/json') {
      // 如果返回的是 JSON，说明可能是错误信息
      const reader = new FileReader()
      reader.onload = (e) => {
        const error = JSON.parse(e.target.result)
        ElMessage.error(error.msg || '导出失败')
      }
      reader.readAsText(res)
      return
    }
    
    // 创建 Blob 对象
    const blob = new Blob([res], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    
    // 创建下载链接
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `report_list_${new Date().getTime()}.xlsx`
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    
    // 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
    
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  } finally {
    loading.value = false
  }
}

// 添加日期格式化函数
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
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

// 使用 onMounted 确保组件挂载后获取数据
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
