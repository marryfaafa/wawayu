<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="time">
        <el-date-picker
          v-model="queryParams.time"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择发布时间"
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
          @click="handleUpdate(scienceList[ids[0]])"
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
      :data="scienceList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="标题" prop="title" align="center" show-overflow-tooltip />
      <el-table-column label="描述" prop="description" align="center" show-overflow-tooltip />
      <el-table-column label="资料链接" prop="linksProfiles" align="center">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.linksProfiles" target="_blank">查看资料</el-link>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center" prop="time" width="180">
        <template #default="scope">
          <span>{{ formatDate(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleUpdate(row)">修改</el-button>
          <el-button link type="primary" @click="handleDelete(row)">删除</el-button>
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

    <!-- 添加或修改资料对话框 -->
    <el-dialog 
      :title="title" 
      v-model="open" 
      width="500px" 
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="scienceRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input 
            v-model="form.description" 
            type="textarea" 
            :rows="4"
            placeholder="请输入描述" 
          />
        </el-form-item>
        <el-form-item label="资料链接" prop="linksProfiles">
          <el-input 
            v-model="form.linksProfiles" 
            placeholder="请输入资料链接" 
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

<script setup name="Science">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { listScience, getScience, delScience, addScience, updateScience } from "@/api/system/popular-science"
import { ElMessage, ElMessageBox } from 'element-plus'

const scienceList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref("")
const scienceRef = ref(null)
const queryRef = ref(null)

// 查询参数
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    time: undefined
  },
  rules: {
    title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
    description: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
    linksProfiles: [{ required: true, message: '资料链接不能为空', trigger: 'blur' }]
  }
})

const { queryParams, form, rules } = toRefs(data)

// 重置表单
function reset() {
  form.value = {
    id: null,
    title: '',
    description: '',
    linksProfiles: '',
    time: undefined
  }
  if (scienceRef.value) {
    scienceRef.value.resetFields()
  }
}

/** 查询列表 */
async function getList() {
  loading.value = true
  try {
    console.log('查询参数:', queryParams.value)
    const res = await listScience({
      pageNum: queryParams.value.pageNum,
      pageSize: queryParams.value.pageSize,
      title: queryParams.value.title,
      time: queryParams.value.time
    })
    console.log('返回数据:', res)
    if (res.data) {
      scienceList.value = res.data.records || []
      total.value = res.data.total || 0
    } else {
      scienceList.value = res.records || []
      total.value = res.total || 0
    }
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error('获取列表失败')
    scienceList.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

/** 提交表单 */
async function submitForm() {
  try {
    await scienceRef.value.validate()
    if (form.value.id) {
      await updateScience(form.value)
      ElMessage.success('修改成功')
    } else {
      await addScience(form.value)
      ElMessage.success('新增成功')
    }
    open.value = false
    await getList()
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('操作失败')
  }
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset()
  try {
    const res = await getScience(row.id)
    form.value = {
      id: row.id,
      title: res.title,
      description: res.description,
      linksProfiles: res.linksProfiles,
      time: res.time
    }
    title.value = "修改资料"
    open.value = true
  } catch (error) {
    console.error('获取详情失败:', error)
    ElMessage.error('获取详情失败')
  }
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value
  ElMessageBox.confirm('是否确认删除编号为"' + _ids + '"的资料？').then(async () => {
    await delScience(_ids)
    getList()
    ElMessage.success("删除成功")
  }).catch(() => {})
}

/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true
  title.value = "添加资料"
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

// 处理每页条数变化
const handleSizeChange = (val) => {
  console.log('每页条数变化:', val)
  queryParams.value.pageSize = val
  queryParams.value.pageNum = 1
  getList()
}

// 处理页码变化
const handleCurrentChange = (val) => {
  console.log('页码变化:', val)
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
