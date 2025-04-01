import { defineStore } from "pinia";

import { reqReport,reqgetPopularScience,reqpublishMaterials,reqleaveComment } from "../../api";

// 创建一个名为FunctionStore的仓库
export const FunctionStore = defineStore('FunctionStore',{
    // 定义仓库的状态
    state: () => ({
      joinData:[
      ],   //加入我们的信息
       articleData:[],  //文章标题
       clearFlag:false,   //是否清空搜索
       searchTerm:'' ,     //社区搜索条件
       blogId:'',         //修改博客的id
       article: {
         id: null,
       },      //文章详情
       like:0,            //文章点赞还是取消点赞，1，-1
       url:'' ,           //内嵌链接
       theme:'chalk',
       recog:false,       //检测的标志
       behavior:[],       //检测动作
       detectResult:null,   //检测结果总和
       showTable:false,   //是否显示上报记录
       comment:null,      //我发表的评论
       flag:false,        //是否进入上报界面 
    }),
    // 定义仓库的操作
     actions: {

      //格式化时间
      FormatTime(){
        let now = new Date();  
let year = now.getFullYear();  
let month = String(now.getMonth() + 1).padStart(2, '0'); // 注意月份是从 0 开始的，所以需要 +1  
let day = String(now.getDate()).padStart(2, '0');  
// let hour = String(now.getHours()).padStart(2, '0');  
// let minute = String(now.getMinutes()).padStart(2, '0');  
// let second = String(now.getSeconds()).padStart(2, '0');  
  
// let formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;  
let formattedDate = `${year}-${month}-${day}`
return formattedDate;
      },
        //用户上报
      async  userReport(form:any,file:any){
           console.log("saf",form,file)
           let result=await reqReport(form.add,file,form.describe);
           console.log(result,"saf")
           return 'ok'
        },
        //加入志愿
        JOINUS(data:any){
          console.log("q",data)
            this.joinData=data;
            console.log("aa",this.joinData)
         },
         //发表评论
         async Publish(id:any,content:any,time:any){
          let res=await reqleaveComment(id,content,time)
          return 'ok'
         },
         //管理员
         //获取资料
         async getSciene(){
           let res=await reqgetPopularScience()
           console.log("资料3",res)
           return res
         },
         //发布资料
         async publicSciene(link:any,des:any,title:any){
           let res=await reqpublishMaterials(link,des,title,this.blogId)
         }

    },
   
  });
  
  // 导出仓库示例
  export function useFunctionStoreWithOut() {
    return FunctionStore();
  }
  
