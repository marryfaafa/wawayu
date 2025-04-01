import { requserLogin,reqchangeMessage, reqsearchUsers,reqgetUsers } from "@/api";
import { defineStore } from "pinia";

// 创建一个名为FunctionStore的仓库
export const UserStore = defineStore('UserStore',{
    // 定义仓库的状态
    state: () => ({
      identity:'', //管理员还是用户
      token:'',  //身份码
      id:'',
      username:"",
      avatar:"src/assets/images/avatar.gif",
      nickname:'',
      gender:'',
      userData:[],
      total:0,
      pagenum:1,
      pagesize:10,
      createNum:0,  //发布的文章数量
      formData:[],  //存草稿的文章
      articles:[],   //标签获取的文章
      tap:'',        //标签名字
      editId:0,  //编辑的文章  
      title:'',          //改后的标题
      content:'',        //改后的内容
    }),
    // 定义仓库的操作
     actions: {
        //用户登录
      async  userLogin(username:any,password:any){
           console.log("登录2",username,password)
           let result=await requserLogin(username,password);
           console.log("登录4",result)
           this.token=result.token
           this.id=result.id;
           this.username=result.userName;
           if(result.avatar)
           this.avatar=result.avatar
           this.nickname=result.nickName
           this.gender=result.gender
           console.log(result,"saf")
           this.identity=result.isOrNo
           return result;
        },
        //用户退出登录
        async  userbackLogin(){
          this.token=""
          this.id=""
          this.username=""
          this.avatar=""
          this.gender=""
          this.nickname=""
       },
       //用户修改信息
       async userchangeMessage(nickname:any,email:any,gender:any,avatar:any,imgurl:any){
          let res=await reqchangeMessage(nickname,gender,email,avatar)
          this.nickname=nickname
          this.username=email
          this.gender=gender
          this.avatar=imgurl
       },
       //管理员搜索用户
       async searchUser(userId:any,username:any,startTime:any,endTime:any){
           let res=await reqsearchUsers(userId,username,startTime,endTime,this.pagenum,this.pagesize)
           console.log("搜索用户3",res)
           this.userData=res.record
           this.total=res.total
       },
        //管理员获取用户
        async getUsers(){
          let res=await reqgetUsers(this.pagenum,this.pagesize)
          console.log("获取用户3",res)
          this.userData=res.record
          this.total=res.total
      },


    //     JOINUS(data:any){
    //       console.log("q",data)
    //         this.joinData=data;
    //         console.log("aa",this.joinData)
    //      }
    },
   
  });
  
  // 导出仓库示例
  export function useUserStoreWithOut() {
    return UserStore();
  }
  
