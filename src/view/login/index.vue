<!-- <template>
  <div>登录</div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
// import { FunctionStore } from "/store/modules/function";
import { useRouter } from "vue-router";
const props = defineProps({});
// const store = FunctionStore();
const router = useRouter();
</script>
<style lang="scss" scoped></style> -->
<template>
  <div class="cotn_principal">
    <div class="main-content">
      <h5 class="welcome-message">欢迎来到</h5>
      <section class="header-section">
        <h1 class="heading-title">中国大鲵的世界</h1>
      </section>
    </div>
    <div class="cont_centrar">
      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <div class="col_md_login">
            <div class="cont_ba_opcitiy">
              <h2>登录</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button class="btn_login" @click="change_to_login()">登录</button>
            </div>
          </div>
          <div class="col_md_sign_up">
            <div class="cont_ba_opcitiy">
              <h2>注册</h2>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

              <button class="btn_sign_up" @click="change_to_sign_up()">
                注册
              </button>
            </div>
          </div>
        </div>

        <div class="cont_back_info">
          <div class="cont_img_back_grey">
            <!-- <img src="../../assets/images/photo1.jpg" alt="" /> -->
          </div>
        </div>
        <div class="cont_forms">
          <div class="cont_img_back_">
            <!-- <img src="../assets/图片-0.jpg" alt="" /> -->
          </div>
          <div class="cont_form_login">
            <a @click="hidden_login_and_sign_up()"
              ><i class="material-icons">返回</i></a
            >
            <h2>登录</h2>
            <input type="text" placeholder="账号" v-model="username1" />
            <input type="password" placeholder="密码" v-model="password1" />
            <button class="btn_login" @click="denglu()">登录</button>
          </div>

          <div class="cont_form_sign_up">
            <a @click="hidden_login_and_sign_up()"
              ><i class="material-icons">返回</i></a
            >
            <h2>注册</h2>
            <input v-model="username" type="text" placeholder="QQ邮箱" />
            <input v-model="password" type="password" placeholder="密码" />
            <input
              v-model="passworder"
              type="password"
              placeholder="确认密码"
            />
            <div class="form-item">
              <input
                v-model="msgCode"
                class="inp"
                placeholder="请输入短信验证码"
                type="text"
              />
              <el-button
                @click="getCode"
                icon="el-icon-s-promotion"
                class="el-bt"
                :disabled="second != 60"
              >
                {{ second === 60 ? "获取验证码" : second + "秒后重新发送" }}
              </el-button>
            </div>
            <button class="btn_sign_up" @click="zhuce">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { UserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { requserGetcode, requserRegister } from "../../api/index";
const props = defineProps({});
const store = UserStore();
const router = useRouter();

const time_to_show_login = ref(400);
const time_to_hidden_login = ref(200);
const time_to_show_sign_up = ref(100);
const time_to_hidden_sign_up = ref(400);
const time_to_hidden_all = ref(500);
const msgCode = ref(""); //填写的
const username = ref("");
const password = ref("");
const passworder = ref("");
const username1 = ref("");
const password1 = ref("");
const code = ref(""); //发送的
const second = ref(60);
const timer = ref(null);

function denglu() {
  if (username1 && password1) {
    store.userLogin(username1.value, password1.value).then(() => {
      console.log("登录3");
      ElMessage.success("登录成功");
      localStorage.setItem("username", username1.value);
      localStorage.setItem("password", password1.value);
      localStorage.setItem("token", store.token);
      if(store.identity=='user')
      router.push({ name: "Home", query: { userid: store.id } });
    else 
    router.push({ name: "Admin"});
    });
  }
}
function zhuce() {
  if (username == "" || password == "") {
    ElMessage.warning("请填写完整");
    return;
  }
  if (msgCode.value == code.value) {
    postZhuce()
   
  } else {
    ElMessage.error("验证码错误");
  }
}
async function  postZhuce() {
  let res =await requserRegister(username.value,password.value);
  ElMessage.success("注册成功");
}
async function getCode() {
  if (!username.value) {
    ElMessage.warning("请输入邮箱");
    return;
  }
  var emailRegex = /^[\w-]+(\.[\w-]+)*@qq\.(com|cn)$/;
  if (emailRegex.test(username.value)) {
    if (second.value == 60) {
      let res = await requserGetcode(username.value);
      console.log("res",res)
      code.value = res;
      console.log("验证码3", res);
      startCountdown();
    }
  } else {
    ElMessage.warning("qq邮箱格式错误");
  }
}

function startCountdown() {
  console.log("开始");
  if (second.value == 60)
    timer.value = setInterval(() => {
      if (second.value > 1) {
        second.value--;
      } else {
        resetCountdown(); // 倒计时结束，重置
      }
    }, 1000);
}
// 重置倒计时
function resetCountdown() {
  clearInterval(timer.value); // 清除定时器
  second.value = 60;
}

function change_to_sign_up(at) {
  document.querySelector(".cont_forms").className =
    "cont_forms cont_forms_active_sign_up";
  document.querySelector(".cont_form_sign_up").style.display = "block";
  document.querySelector(".cont_form_login").style.opacity = "0";

  setTimeout(() => {
    document.querySelector(".cont_form_sign_up").style.opacity = "1";
  }, time_to_show_sign_up.value);

  setTimeout(() => {
    document.querySelector(".cont_form_login").style.display = "none";
  }, time_to_hidden_sign_up.value);
}

function change_to_login() {
  document.querySelector(".cont_forms").className =
    "cont_forms cont_forms_active_login";
  document.querySelector(".cont_form_login").style.display = "block";
  document.querySelector(".cont_form_sign_up").style.opacity = "0";

  setTimeout(() => {
    document.querySelector(".cont_form_login").style.opacity = "1";
  }, time_to_show_login.value);

  setTimeout(() => {
    document.querySelector(".cont_form_sign_up").style.display = "none";
  }, this.time_to_hidden_login);
}

function hidden_login_and_sign_up() {
  document.querySelector(".cont_forms").className = "cont_forms";
  document.querySelector(".cont_form_sign_up").style.opacity = "0";
  document.querySelector(".cont_form_login").style.opacity = "0";

  setTimeout(() => {
    document.querySelector(".cont_form_sign_up").style.display = "none";
    document.querySelector(".cont_form_login").style.display = "none";
  }, time_to_hidden_all.value);
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px auto;
  padding: 0px;
  text-align: center;
  font-family: "Open Sans", sans-serif;
}

.cotn_principal {
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
  background: #cfd8dc;
  background-image: url("../../assets/images/back.jpg");
  background-size: cover;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cfd8dc', endColorstr='#b0bec5', GradientType=1);
}
.main-content {
  position: absolute;
  top: 25%;
}

el-button,
a {
  cursor: pointer;
}

.cont_centrar {
  display: flex;
  align-self: center;
  width: 100%;
  position: absolute;
  top: 40%;
}

.cont_login {
  position: relative;
  width: 640px;
  .cont_info_log_sign_up {
    background: rgba(207, 216, 220, 0.5);
  }
}

.cont_back_info {
  position: relative;
  float: left;
  width: 640px;
  height: 280px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.cont_forms {
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 0px;
  width: 320px;
  height: 280px;
  background-color: #eee;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_login {
  box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
  height: 420px;
  top: -60px;
  left: 0px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_sign_up {
  box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
  height: 420px;
  top: -60px;
  left: 320px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_img_back_grey {
  position: absolute;
  width: 950px;
  top: -80px;
  left: -116px;
}

.cont_img_back_grey > img {
  width: 100%;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.2;
  animation-name: animar_fondo;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.cont_img_back_ {
  position: absolute;
  width: 950px;
  top: -80px;
  left: -116px;
}

.cont_img_back_ > img {
  width: 100%;
  opacity: 0.3;
  animation-name: animar_fondo;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.cont_forms_active_login > .cont_img_back_ {
  top: -20px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_sign_up > .cont_img_back_ {
  top: -20px;
  left: -435px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_info_log_sign_up {
  position: absolute;
  width: 640px;
  height: 280px;
  top: 0px;
  z-index: 1;
}

.col_md_login {
  position: relative;
  float: left;
  width: 50%;
}

.col_md_login > h2 {
  font-weight: 400;
  margin-top: 70px;
  color: #757575;
}

.col_md_login > p {
  font-weight: 400;
  margin-top: 15px;
  width: 80%;
  color: #37474f;
}

.btn_login {
  background-color: #26c6da;
  border: none;
  padding: 10px;
  width: 200px;
  border-radius: 3px;
  box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
}

.col_md_sign_up {
  position: relative;
  float: left;
  width: 50%;
}

.cont_ba_opcitiy > h2 {
  font-weight: 400;
  color: #fff;
}

.cont_ba_opcitiy > p {
  font-weight: 400;
  margin-top: 15px;
  color: #fff;
}

/* ----------------------------------
background text
------------------------------------
 */
.cont_ba_opcitiy {
  position: relative;
  background-color: rgba(120, 144, 156, 0.55);
  width: 80%;
  border-radius: 3px;
  margin-top: 60px;
  padding: 15px 0px;
}

.btn_sign_up {
  background-color: #ef5350;
  border: none;
  padding: 10px;
  width: 200px;
  border-radius: 3px;
  box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
}

.cont_forms_active_sign_up {
  z-index: 2;
}

@-webkit-keyframes animar_fondo {
  from {
    -webkit-transform: scale(1) translate(0px);
    -moz-transform: scale(1) translate(0px);
    -ms-transform: scale(1) translate(0px);
    -o-transform: scale(1) translate(0px);
    transform: scale(1) translate(0px);
  }

  to {
    -webkit-transform: scale(1.5) translate(50px);
    -moz-transform: scale(1.5) translate(50px);
    -ms-transform: scale(1.5) translate(50px);
    -o-transform: scale(1.5) translate(50px);
    transform: scale(1.5) translate(50px);
  }
}

@-o-keyframes identifier {
  from {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  to {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
}

@-moz-keyframes identifier {
  from {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  to {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
}

@keyframes identifier {
  from {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  to {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
}

.cont_form_login {
  position: absolute;
  opacity: 0;
  display: none;
  width: 320px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_login {
  z-index: 2;
}

.cont_form_sign_up {
  position: absolute;
  width: 320px;
  float: left;
  opacity: 0;
  display: none;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_form_sign_up > input {
  text-align: left;
  padding: 15px 5px;
  margin-left: 10px;
  margin-top: 20px;
  width: 260px;
  border: none;
  color: #757575;
}

.cont_form_sign_up > h2 {
  margin-top: 50px;
  font-weight: 400;
  color: #757575;
}

.cont_form_login > input {
  padding: 15px 5px;
  margin-left: 10px;
  margin-top: 20px;
  width: 260px;
  border: none;
  text-align: left;
  color: #757575;
}

.cont_form_login > h2 {
  margin-top: 110px;
  font-weight: 400;
  color: #757575;
}

.cont_form_login > a,
.cont_form_sign_up > a {
  color: #757575;
  position: relative;
  float: left;
  margin: 10px;
  margin-left: 30px;
}

.form-item {
  margin-left: 10px;
  margin-top: 20px;
}

.form-item .inp {
  text-align: left;
  height: 44px;
}

.form-item .el-bt {
  height: 47px;
  padding: 1px 10px;
  color: #ef5350;
}

/* .form-item {
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
} */
*,
*:before,
*:after {
  box-sizing: inherit;
  /* margin: 0; */ /* 注释掉或者删除这行 */
  padding: 0;
}
.cotn_principal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh; /* 取决于你需要的高度，这个例子将其设置为视口高度 */
}
.main-content {
  text-align: center;
}
.heading-title {
  font-size: 3em; /* 字体大小，此处设为3em，您可以根据需要进行调整 */
  font-weight: bold; /* 字体加粗 */
  color: #ffffff; /* 字体颜色，此处设为较深的灰色，您也可以替换为其他颜色 */
  font-family: "Times New Roman", Times, serif; /* 指定字体，“Times New Roman”看起来更为正式，如果您有其他首选字体也可以进行替换 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加文字阴影，增强立体感和对比度 */
}
.welcome-message {
  color: #ffffff; /*将字体颜色更改为白色*/
}
</style>
