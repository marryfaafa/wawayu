//当前模块:API进行统一管理
//引入二次封装的axios
import requests from "../utils/request.ts";
import { serverAddress } from './config.ts'

//用户登录
export const requserLogin = (username,password) => {
  console.log("登录信息:",username,password )
  const url = `${serverAddress}/user/login`
  //const url=`https://apifoxmock.com/m1/4435779-0-default/admin/login/login`
  const data={username,password}
  console.log("11",url)
  return requests({ url, method: "post", data });
};

//用户获取验证码
export const requserGetcode = (email) => {
  console.log("验证码2:",email );
  const url = `${serverAddress}/user/getcode`;
  const params={email}
  return requests({ url, method: "get", params:params });
};

//用户注册
export const requserRegister = (username,password) => {
  console.log("注册2:",username,password );
  const url = `${serverAddress}/user/register`;
  const data={username,password}
  return requests({ url, method: "post", data});
};

//用户修改密码
export const reqchangePassword = (newPassword) => {
  console.log("密码2:",newPassword );
  const url = `${serverAddress}/changePassword`;
  const data={newPassword}
  return requests({ url, method: "post", data});
};


//用户修改信息
export const reqchangeMessage = (nickName,gender,email,avatar) => {
  const formData=new FormData();
  formData.append('nickName',nickName)
  formData.append('gender',gender)
  formData.append('email',email)
  formData.append('avatar',avatar)
  console.log("信息2:", nickName,gender,email,avatar);
  const url = `${serverAddress}/changeMeaasge`;
  return requests({ url, method: "post", data:formData});
};

//用户识别
export const reqvideoCall = (file) => {
  console.log("识别信息:", file);
  const url = `${serverAddress}/algorithmDetection/videoCall`;
  // const url=`http://127.0.0.1:4523/m1/4435779-0-default/algorithmDetection/videoCall`
  let formData = new FormData();
  // append方法把文件添加到 FormData实例对象中 第一个参数：文件名 第二个参数：要上传的文件
 //const data={file}
  formData.append("file", file);
  return requests({ url, method: "post", data:formData });
};

//用户上报
export const reqReport = (reportAddress, pictureAddress,remark) => {
    console.log("上报信息:", reportAddress, pictureAddress,remark);
    const url = `${serverAddress}/report/report`;
    let formData = new FormData();
    // append方法把文件添加到 FormData实例对象中 第一个参数：文件名 第二个参数：要上传的文件
    formData.append("pictureAddress", pictureAddress);
    formData.append("reportAddress",reportAddress);
    formData.append("remark", remark);
    console.log(formData)
    return requests({ url, method: "post", data:formData });
  };

  //上报定位获取数据
export const reqReportgetData = () => {
  const url = `${serverAddress}/report/getData`;
  console.log("上报2")
  return requests({ url, method: "get"});
};

  //上报定位获取上报记录
  export const reqReportgetTable = () => {
    const url = `${serverAddress}/report/getReportTable`;
    console.log("记录2")
    return requests({ url, method: "get"});
  };

    //加入我们
    export const reqJoinus = (age,tel,add,volunteerExperiences,awards,selfEvaluations,worksCount) => {
      const url = `${serverAddress}/user/joinUs`;
      console.log("加入2")
      const data={age,tel,add,volunteerExperiences,awards,selfEvaluations,worksCount}
      return requests({ url, method: "post",data:data});
    };

    //获取个人简历
    export const reqgetResume = () => {
      const url = `${serverAddress}/user/getResume`;
      console.log("简历2")
      return requests({ url, method: "get"});
    };
     //社区交流推荐文章获取
     export const reqRecommend = (pageNum,option) => {
      const url = `${serverAddress}/community-exchanges/getStatement`;
      console.log("推荐2")
      const params={pageNum,option}
      return requests({ url, method: "get",params});
    };

      //社区交流文章搜索
         export const reqSearchArticle = (query,pageNum) => {
          const url = `${serverAddress}/community-exchanges/searchArticle`;
          console.log("搜索2",query,pageNum)
          const params={query,pageNum}
          return requests({ url, method: "get",params});
        };
        //社区交流获取热门标签
     export const reqgetHotTap = () => {
      const url = `${serverAddress}/tags/getHotTap`;
      console.log("热门2")
      return requests({ url, method: "get"});
    };

      //社区交流获取热门文章
      export const reqgetHotArticle = () => {
        const url = `${serverAddress}/community-exchanges/getHotArticle`;
        console.log("文章2")
        return requests({ url, method: "get"});
      };

       //社区交流我的获取基本信息
       export const reqgetInformation = () => {
        const url = `${serverAddress}/community-exchanges/getMyInformation`;
        console.log("我的2")
        return requests({ url, method: "get"});
      };

      
      //社区交流发表评论
      export const reqleaveComment = (communityId,comment,commentTime) => {
        const url = `${serverAddress}/comments/leaveComment`;
        console.log("发表2")
        const data={communityId,comment}
        return requests({ url, method: "post",data});
      };

       //社区交流点击具体某文章
       export const reqgetStatementById = (id) => {
        const url = `${serverAddress}/community-exchanges/getStatementById`;
        console.log("具体2")
        const params={id}
        return requests({ url, method: "get",params});
      };
      
       //社区交流获取我的文章
       export const reqgetMyArticle = (option,choice) => {
        const url = `${serverAddress}/community-exchanges/getMyArticle`;
        console.log("获取2")
        const params={option,choice}
        return requests({ url, method: "get",params});
      };

     
       //社区交流发表文章
       export const reqmakeStatement = (title,content,ossAddress,tagName) => {
        const url = `${serverAddress}/community-exchanges/makeStatement`;
        console.log("发表2")
        let formData = new FormData();
        // append方法把文件添加到 FormData实例对象中 第一个参数：文件名 第二个参数：要上传的文件
        formData.append("title", title);
        formData.append("content",content);
        formData.append("ossAddress", ossAddress);
        formData.append("tagName", tagName);
        return requests({ url, method: "post",data:formData});
      };

       //社区交流根据标签获取文章
       export const reqgetArticleByTap = (tap,option) => {
        const url = `${serverAddress}/community-exchanges/getArticleByTap`;
        console.log("标签获取2",tap,option)
        const params={tap,option}
        return requests({ url, method: "get",params});
      };

      //社区交流根据id获取编辑文章
      export const reqgetEditArticleById = (id) => {
        const url = `${serverAddress}/community-exchanges/getEditArticleById`;
        console.log("标签2")
        const params={id}
        return requests({ url, method: "get",params});
      };

      //社区交流编辑文章
      export const reqeditTheArticle = (data) => {
        const formData = new FormData()
        formData.append('id', data.id)
        formData.append('title', data.title)
        formData.append('content', data.content)
        formData.append('ossAddress', data.ossAddress)
        data.tagName.forEach(tag => formData.append('tagName', tag))

        const url = `${serverAddress}/community-exchanges/editTheArticle`
        return requests({ 
          url, 
          method: "post",
          data: formData
        })
      }

      //社区交流点赞
      export const reqgetLikes = (id) => {
        const url = `${serverAddress}/like-record/likes`;
        console.log("点赞2")
        const params={id}
        return requests({ url, method: "get",params});
      };
       //社区交流取消点赞
       export const reqgetconcelLikes = (id) => {
        const url = `${serverAddress}/like-record/cancelLikes`;
        console.log("取消点赞2")
        const params={id}
        return requests({ url, method: "get",params});
      };
      
     
      //智能客服
      export const reqgetaiDialogue = (str) => {
        const url = `${serverAddress}/aiDialogue/ai`;
        console.log("对话2",str)
        const params={str}
        return requests({ url, method: "get",params});
      };

      //管理员
      //获取用户
      export const reqgetUsers = (pageId,pageSize) => {
        const url = `${serverAddress}/user/getUsers`;
        //const url = ` http://127.0.0.1:4523/m1/4435779-0-default/user/getUsers?apifoxApiId=174429936`;
        console.log("用户2")
        const params={pageId,pageSize}
        return requests({ url, method: "get",params});
      };

      export const reqgetUsers2 = (pageId,pageSize) => {
        const url = `${serverAddress}/user/getUsers2`;
        //const url = ` http://127.0.0.1:4523/m1/4435779-0-default/user/getUsers?apifoxApiId=174429936`;
        console.log("用户2")
        const params={pageId,pageSize}
        return requests({ url, method: "get",params});
      };

      //搜索用户
      export const reqsearchUsers = (userId,username,startTime,endTime,pageId,pageSize) => {
        const url = `${serverAddress}/user/search`;
        console.log("搜索用户2",userId,username,startTime,endTime,pageId,pageSize)
        const params={userId,username,startTime,endTime,pageId,pageSize}
        return requests({ url, method: "get",params});
      };
     
      //获取资料
      export const reqgetPopularScience = () => {
        const url = `${serverAddress}/popular-science/getPopularScience`;
        //const url = 'localhost:8080/popular-science/getPopularScience';
        console.log("资料2")
        return requests({ url, method: "get"});
      };

       //修改资料
       export const reqpublishMaterials = (linksProfiles,description,title,id) => {
        const url = `${serverAddress}/popular-science/publishMaterials`;
        //const url = 'https://apifoxmock.com/m1/4435779-0-default/popular-science/getPopularScience?apifoxApiId=171997967';
        console.log("发布资料2")
        const data={linksProfiles,description,title,id}
        return requests({ url, method: "post",data});
      };

      //获取发现报告
      export const reqgetDiscoveryReport = () => {
        const url = `${serverAddress}/report/getDiscoveryReport`;
        console.log("报告2")
        return requests({ url, method: "get"});
      };

      //首页左上角
      export const reqgetFas = () => {
        const url = `http://127.0.0.1:4523/m1/4435779-0-default/fas`;
        console.log("趋势")
        return requests({ url, method: "get"});
      };

      //首页左下角
      export const reqgetHotproduct = () => {
        const url = `http://127.0.0.1:4523/m1/4435779-0-default/api/hotproduct`;
        console.log("提交")
        return requests({ url, method: "get"});
      };
      
       //首页中下角
       export const reqgetArearank = () => {
        const url = `http://127.0.0.1:4523/m1/4435779-0-default/b'bbb`;
        console.log("地区")
        return requests({ url, method: "get"});
      };
       //首页中上角
       export const reqgetMap = () => {
        const url = `http://127.0.0.1:4523/m1/4435779-0-default/lll`;
        console.log("地图")
        return requests({ url, method: "get"});
      };
      
       //首页右上角
       export const reqgetVolunteerRank = () => {
        const url = `http://127.0.0.1:4523/m1/4435779-0-default/aa`;
        console.log("志愿占比")
        return requests({ url, method: "get"});
      };
     
      //首页右下角
      export const reqgetVolunteerVolumn = () => {
        const url = ` http://127.0.0.1:4523/m1/4435779-0-default/ttt`;
        console.log("志愿统计量")
        return requests({ url, method: "get"});
      };
      //管理用户修改管理员权限
      export const reqChangePermission =(id) =>{
        const url = ` ${serverAddress}/user/modifyPermissions`;
        const params={id}
        return requests({ url, method: "get",params});
      }

      export const reqChangeAudit =(id) =>{
        const url = ` ${serverAddress}/user/volunteerAudit`;
        const params={id}
        return requests({ url, method: "get",params});
      }

   