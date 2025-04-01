<template>
  <div class="container-scroller" >
 
        <div style="background-color: #f2edf3;display: flex;flex-direction: row;flex-wrap: nowrap;" class="main-panel">
            <div class="left" style=" background: linear-gradient(to right, #ffffff, #f8e9ff);  width: 200px;height: 620px;"></div>
          <div class="right" style="display: flex;align-items: center;justify-content: center;flex-direction: column;height: 620px;width: 90%;margin-left:-60px;">
          <div class="content-wrapper"  style="max-width: 900px;">
            <!-- 自我介绍 -->
            <div id="intro" class="row s-row-center scroll2" v-if="show1">
              <div class="col-md-10 stretch-card grid-margin" style="display: flex;">
                <div class="smr-10" style="margin-right: 10px;">
                  <img src="../../assets/icons/robot.png" class="s-avatar" alt="circle-image" style="height: 30px;width: 30px;"/>
                
              </div>
                <div class="s-card card-img-holder text-white" style="background-color: #fff;border-radius: 5px;padding: 10px 10px 50px 10px">
                  <div class="card-body s-font-color">
                    <div class="card-title">
                      <h3>你好，</h3>
                      <h3>我是您的人工智能助理Alice ！</h3>
                      <p class="s-font-color-2">作为一个人工智能语言模型，我可以回答你的问题，为你提供有用信息，帮助你完成创作。</p>
                      <div class="s-card-blue" style="background-color: #fbf3ff;padding: 10px;margin-top: 10px;border-radius: 5px;">
                        <p class="s-font-blue" style="color: #792ef7;">友情提醒</p>
                        <p class="s-font-tip" style="margin-top: 15px;">请提问时遵循国家法律法规，一切产生的不良后果自行承担。</p> </div>
                    </div>
                   
               </div>
                </div>
              </div>

              <div class="gap2"></div>
             
            </div>
           
<div id="dialogue" class="scroll">
           

          </div>
          <div class="gap-block"></div>
           

            
           
       
          </div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <div class="custom-menu" style="height: 515px;background-color: #f2edf3;width: 50%;margin-left: 20px;padding-top: 20px;">
    <ul>
      <li v-for="(contextMenu,index) in contextMenuList" :key="index" style="margin-bottom: 20px;"
      >
      <img src="../../assets/icons/robot.png" alt="" v-if="contextMenu.type === 2" style="height: 30px;width: 30px;">
      <img :src=store.avatar v-else style="height: 30px;width: 30px;">
      <!-- <img :src="contextMenu.type === 1 ? store.avatar : '../../assets/icons/robot.png'" alt="" style="height: 30px;width: 30px;"> -->
      <span style="background-color: #fdfdfe;border-radius: 10px;padding: 10px;margin-left: 10px;">{{ contextMenu.content }}</span></li>
    </ul>
  </div>
          <footer id="footer" class="footer"  style="max-width: 900px;">
           
            <div class="row s-row-center">
              <div class="col-md-10 s-mb14 stretch-card grid-margin">
                <div class="smr-10 s-visible-no">
                  <!-- <img src="../../assets/icons/user.png" class="s-avatar" alt="circle-image" /> -->
              </div>
                <div class="s-card-transparent card-img-holder text-white">
                  <div class="card-body s-font-color s-pad-0">
                    <div id="topic" class="">

                    <div id="question1"></div>
                  </div>
                    <!-- 对话框 -->
                    <div class="s-rela" style="position: relative;">
                    <div id="temp" class="s-temp s-show-no"></div>
                    <textarea class="form-control s-input" id="input-question" rows="5" style="width: 670px;margin-left: 20px;outline: none;border-radius: 5px;resize: none; padding: 5px; font-size: 16px;" v-model="myInput"
                    @focus="show2=false"
                    @keydown.enter="send"
                    ></textarea>
                    <img src="../../assets/icons/笑脸.svg" alt="发送表情" style="height: 26px;width: 26px;position: absolute;right:60px;top:71px;" @click="show2=true">
                    <span id="send-btn" class="s-send page-title-icon bg-gradient-primary text-white me-2" 
                    @click="send"
                    style="background: linear-gradient(to right, #d98eff, #9c57ff);width: 50px;height: 30px;border-radius: 18px;line-height: 30px;text-align: center;display: inline-block;position: absolute;right:0;bottom:  10px;cursor: pointer;">
                   
                      <img src="../../assets/icons/发送.svg" alt=""style="height: 15px;width: 30px;">
                    </span>
                    <div id="popup" v-if="show2">
                      <EmojiPicker  style="position: absolute;bottom:60px;right:-85px"  @sendEmoji="handEmoji" ></EmojiPicker>
                    </div>
                     
                  </div>
               </div>
                </div>
              </div>
             
            </div>
          
          </footer>
          <!-- partial -->
        </div>
      </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    <!-- </div> -->
</template>
<script lang='ts' setup>
import {ref} from 'vue';
import {UserStore} from '../../store/modules/user'
import {useRouter} from 'vue-router'
import {reqgetaiDialogue} from '../../api'
import EmojiPicker from './components/EmojiPicker.vue'

const store=UserStore();
const router=useRouter();
const show1=ref(true)
const show2=ref(false)

const myInput=ref('')



const contextMenuList=ref([
 
])
function handEmoji(emoji){
  console.log("打印",emoji)
  myInput.value+=emoji
}

async function send(){
  if(!myInput.value)
  return;
  show1.value=false
  let text={content:myInput.value,type:1}
  contextMenuList.value.push(text)
  console.log("aaa",contextMenuList.value)
  let res=await reqgetaiDialogue(myInput.value)
  let response={content:res,type:2}
  myInput.value=""
   // 使用 setTimeout 来在三秒后执行 push 操作  
   setTimeout(() => {  
        contextMenuList.value.push(response);  
    }, 1000);  
}
</script>
<style lang='scss' scoped>
.container-scroller {
    width: 100%;
    position: absolute;
    top:0;
    background-color: #f2edf3;
    z-index:20004;
    height: 1100px;
    -webkit-overflow-scrolling: touch;  
} 
</style>