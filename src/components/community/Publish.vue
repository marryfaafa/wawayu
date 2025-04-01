<template>
  <div class="publish-container">
      <!-- 发表文章表单 -->
      <el-form :model="formModel" ref="formRef" label-width="100px" :rules="formRules" >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <el-select style="width: 300px;" v-model="formModel.cate_id" :multiple="true" >
    <el-option v-for="item in options"  
    :key="item.value"  
    :label="item.label"  
    :value="item.value"
   ></el-option>
  </el-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"><el-upload
  class="avatar-uploader"
  :auto-upload="false"
  :show-file-list="false"
  :on-change="onUploadFile"
>
  <img v-if="imgUrl" :src="imgUrl" class="avatar" />
  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
</el-upload></el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
  <quill-editor
    theme="snow"
    v-model:content="formModel.content"
    contentType="html"
    placeholder="#创作灵感#
    • 记录工作实践、项目复盘
    • 写技术笔记巩固知识要点
    • 发表职场感悟心得
    • 搬运自己的原创文章到这
        "
  >
  </quill-editor>
</div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')">发布文章</el-button>
        <el-button @click="onPublish('草稿')" type="info">存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps, onMounted,reactive} from 'vue';
import {UserStore} from '../../store/modules/user'
import {useRouter} from 'vue-router'
import { ElForm,ElFormItem,ElButton,ElInput ,ElIcon,ElUpload} from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { reqmakeStatement,reqgetEditArticleById,reqeditTheArticle} from '@/api';
import {ElMessage,ElSelect,ElOption} from 'element-plus'

const props=defineProps({});
const store=UserStore();
const router=useRouter();
const validateForm = (formData) => {
  if (!formData.title) {
    return "请填写标题";
  }
  if (!formData.cate_id) {
    return "请选择分类";
  }
  if (!formData.cover_img) {
    return "请上传封面图片";
  }
  if (!formData.content) {
    return "请填写文章内容";
  }
  // 还可以添加其他验证规则
  return null; // 表示验证通过
}
const options=ref([
  {value:'大鲵保护',label:'大鲵保护'},
  {value:'科研发展',label:'科研发展'},
  {value:'繁荣技术',label:'繁荣技术'},
  {value:'遗传分支',label:'遗传分支'},
  {value:'疾病防治',label:'疾病防治'},
  {value:'绿色发展',label:'绿色发展'},
  {value:'产业招商',label:'产业招商'},
  {value:'保护',label:'保护'},
  {value:'养殖',label:'养殖'},
  {value:'科研',label:'科研'},
  {value:'管理',label:'管理'},
])

const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const defaultForm = {
  title: '',
  cate_id: [],
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultForm })

const onPublish = async (state) => {
  if(state==="已发布"){
    const validationError = validateForm(formModel.value);
  if (validationError) {
   ElMessage.error(validationError)
    return; // 验证未通过，不执行后续逻辑
  }else{
    if(store.editId===0){
      console.log("标签",formModel.value.cate_id,formModel.value)
    let res=await reqmakeStatement(formModel.value.title,formModel.value.content,formModel.value.cover_img,formModel.value.cate_id)
     ElMessage.success("发布成功")
    }else{
      let res=await reqeditTheArticle({
        id: store.editId,
        title: formModel.value.title,
        content: formModel.value.content,
        ossAddress: formModel.value.cover_img,
        tagName: formModel.value.cate_id
      })
      ElMessage.success("编辑成功")
    }
      //方便后续回显
      store.editId=-1;
     store.content=formModel.value.content
     store.title=formModel.value.title
    window.history.back(); // 返回到上一个页面
   
   }
  } else {
    console.log("存草稿",store.formData)
    window.history.back(); // 返回到上一个页面
  }
  formModel.value.state = state
  store.formData = formModel.value;
};
/*
将网络图片转成file在显示在Img
*/
async function getEditArticle(id:any) {

  let res=await reqgetEditArticleById(id)
  console.log("aaaasc",res)
  formModel.value.title=res.title
  // formModel.value.cate_id=res.tap
  const mappedCateIds = res.tap.map(tap => {  
  // 假设这里的映射逻辑很简单，即label和value相同（但在实际中可能需要更复杂的逻辑）  
  // 注意：这里为了示例，我们假设value和label确实相同。如果不是，你需要一个映射表或逻辑来转换它们。  
  return options.value.find(option => option.label === tap)?.value;  
});  
  
// 更新formModel.cate_id  
formModel.value.cate_id = mappedCateIds; 
  if(res.ossAddress){
    imgUrl.value=res.ossAddress
  }
  formModel.value.cover_img=res.ossAddress
  formModel.value.content=res.content
}

onMounted(()=>{
    console.log("加载",store.formData,store.editId)
    //如果是编辑原文章
    if(store.editId!==0){
      console.log("编辑")
      getEditArticle(store.editId)
    }
    if(store.formData.state==='草稿'){
      formModel.value=store.formData
      console.log("回显",formModel.value)
    }
})
</script>
<style lang='scss' scoped>
.publish-container {
  position: absolute;
  width: 100%;
  min-height: 700px;
  background-color: #f5f6f7;
  z-index: 1000;
  display: flex;
  justify-content: center;
}
.el-form {
    padding: 30px;
    background-color: #fff;
    width: 80%;
}
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.el-button {
    height: 40px;
    padding: 8px 16px;
    font-size: 16px;
    color: #fff;
    border: none;
    background-color: #fc5531;
    border-radius: 20px;
   
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>