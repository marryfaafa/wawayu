import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
// import { useUserStoreHook } from "../store/modules/";
import { ResultEnum } from "@/enums/ResultEnum";
import { TOKEN_KEY } from "@/enums/CacheEnum";
import { ElMessage,  ElMessageBox } from "element-plus";

// 创建 axios 实例
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout: 50000,
  // headers: { "Content-Type": "application/json;charset=utf-8" },
});

// // 请求拦截器
// service.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const accessToken = localStorage.getItem(TOKEN_KEY);
//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );
//请求拦截器:在发送请求之前,请求拦截器可以检测到,可以在发之前做一些事情
service.interceptors.request.use((config) => {
  //config:配置对象,对象有一个属性很重要,header请求
  let token=localStorage.getItem('token');
  if (token) {
    console.log("aaa",token)
    config.headers["token"] = token;
  }
  return config;
});
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    console.log("拦截", response);
    // if (
    //   response.config.responseType === "blob" ||
    //   response.config.responseType === "arraybuffer"
    // ) {
    //   return response;
    // }

    const { code, data, msg } = response.data;
    console.log("拦截信息", data,code)
    if (code == ResultEnum.SUCCESS) {
      return data;
    }

    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    console.log("异常",error)
    // 异常处理
    if (error.response.data) {
      const { code, msg } = error.response.data;
      if (code === ResultEnum.TOKEN_INVALID) {
        ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // const userStore = useUserStoreHook();
          // userStore.resetToken().then(() => {
          //   location.reload();
          // });
        });
      } else {
        ElMessage.error(msg || "系统出错");
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
