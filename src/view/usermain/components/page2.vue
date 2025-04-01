<template>
  <div class="page2-container">
    <div class="slide" :class="sliderClasses"></div>
    <div class="left">
      <div class="top">
        <div class="main" ref="mainElement">
          <div class="title" style="color: #333">
            <p>基地动态</p>
            <div class="icon-right">
              <img
                src="https://file.panda.org.cn/skin/cn/images/left-top.png"
                alt=""
              />
            </div>
          </div>
          <div class="main-box" style="display: flex;">
            <div class="swiper-wrap">
              <div
                class="img"
                style="width: 100%; overflow: hidden; height: 366px"
              >
                <img
                  src="https://file.panda.org.cn/d/file/p/2024/06-27/a06427f142d58028767cd56a9bea8b7d.png"
                  alt=""
                  style="width: 100%; transition: all 0.25s; object-fit: cover;height: 315px;"
                />
                <div class="text">
                <p class="swiper-title"> 大鲵基地与华大智造签署战略合作协议                                                                    </p>
            </div>
              </div>
            </div>
            <div class="top-text">
                <div class="top-text-title-wrap">
                    <p class="top-text-title">大鲵基地与华大智造签署战略合作协议</p>
                    <p class="top-text-desc"></p>
                    <p class="line"></p>
                </div>
                <div class="top-text-nav">
                    <p>全国科技活动周--重点（国家） 实验室开放系列活动在大鲵基地举行                                                            </p>
                    <p>全国科技活动周--重点（国家） 实验室开放系列活动在大鲵基地举行                                                            </p>
                    <p>全国科技活动周--重点（国家） 实验室开放系列活动在大鲵基地举行                                                            </p>
                    <p> 全国科技活动周--重点（国家） 实验室开放系列活动在大鲵基地举行                                                            </p>
                                    </div>
            </div>
           
          </div>
        </div>
      </div>
      <div class="bottom" style="z-index: 1;">
        <div class="main">
            <div class="title" style="color: #333;margin-bottom: 15px;">
                <p>单位公告</p>
                <div class="icon-right">
                    <img src="https://file.panda.org.cn/skin/cn/images/left-bottom.png" alt="" style="width: 72px;">
                </div>
            </div>
            <div class="main-box">
                 <div class="bottom-text">
                    <div class="top-text-title" style=" -webkit-line-clamp: 1;">
                        成都市公园城市建设管理局所属5家事业单位2024年公开考试招聘8名工作人员面试成绩、考试总成绩及进入体检人员名单公示                                                        
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
    <div class="right">
      <transition name="fade" appear>
        <div class="top" v-show="showTop">
          <div class="main">
            <div class="title">
              <p>焦点活动</p>
              <div class="icon-right">
                <img
                  src="https://file.panda.org.cn/skin/cn/images/right-top.png"
                  alt=""
                  style="width: 72px"
                />
              </div>
            </div>
            <div class="main-box">
              <div class="img"></div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade" appear>
        <div class="bottom" v-show="showTop">
          <div class="main">
            <div class="title">
              <p>大鲵趣闻</p>
              <div class="icon-right">
                <img
                  src="https://file.panda.org.cn/skin/cn/images/right-bottom.png"
                  alt=""
                  style="margin-top: 10px; box-sizing: border-box"
                />
              </div>
            </div>
            <div class="main-box">
              <div class="bottom-text-nav">
                <p><span> 庆重阳与福双的友谊</span></p>
                <p><span>夏日心动</span></p>
                <p><span>越过水池</span></p>
                <p><span>“绿毯”上的家欣</span></p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({});
const router = useRouter();
const sliderClasses = ref("slider");
const showTop = ref(false); // 控制显示的响应式变量
const mainElement = ref(null);


// 页面加载完成后触发动画
onMounted(() => {
  console.log("进入页面2");
  setTimeout(() => {
    showTop.value = true; // 在一秒后设置为 true 来显示 .top 元素
  }, 1500);
});
</script>
<style lang="scss" scoped>
.title {
  font-weight: 700;
  font-size: 30px;
  text-align: left;
  color: #fff;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .icon-right {
    cursor: pointer;
    display: flex;
    align-items: flex-end;
  }
}
.fade-enter-from,
.fade-appear-from {
  opacity: 0;
}

.fade-enter-active,
.fade-appear-active {
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 1s;
}
@keyframes slideToRight {
  0% {
    left: -70%; /* 起始位置 */
  }
  100% {
    left: 68.75%; /* 终止位置，右边会隐藏一部分 */
  }
}
@keyframes moveDown {
            from {
                top: -80px;
            }
    
            to {
                top: 250px;
                opacity: 1;
            }
        }
        @keyframes moveDown1 {
            from {
                top: -80px;
            }
    
            to {
                top: 60px;
                opacity: 1;
            }
        }
        @keyframes moveDown2 {
            from {
                top: -80px;
            }
    
            to {
                top: 90px;
                opacity: 1;
            }
        }
.top-text-title {
            font-size: 24px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
        }
.page2-container {
  width: 100%;
  height: 730px;
  position: relative;
  overflow: hidden;
  background: url(https://file.panda.org.cn/skin/cn/images/pic.jpg) no-repeat;
  background-size: cover;
  .slider {
    width: 69%; /* 滑块宽度为页面宽度的70% */
    height: 100%; /* 与容器等高 */
    background-color: orange; /* 橙色背景 */
    position: absolute;
    left: -70%; /* 初始位置在容器左边，完全不可见 */
    // animation: slideToRight 1s ease-in-out forwards; /* 应用动画 */
    animation: slideToRight 1s ease-in-out forwards; /* 第二个动画延迟2秒开始 */
    z-index: 1000;
  }
  .left {
    width: 68.75%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    padding-top: 70px;
    position: relative;
    .top {
      width: 100%;
    height: 56%;
        min-height: 500px;
        position: relative;
        margin-top: -70px;
    
        .main {
            margin: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            animation: moveDown 1s ease-in-out forwards; 
            opacity: 0;
            animation-delay: 2s;
            .text {
                width: 472px;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 60px;
                background: rgba(0, 0, 0, .3);
    
                .swiper-title {
                    font-size: 18px;
                    color: #fff;
                    display: inline-block;
                    width: 85.5%;
                    line-height: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    padding-left: 8px;
                }
            }
    
            .top-text {
                width: 40%;
                display: inline-block;
                position: relative;
                margin-left: 30px;
    
                .top-text-title-wrap {
                    cursor: pointer;
    
                    .top-text-desc {
                        font-size: 16px;
                        color: #999;
                        margin: 10px 0 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        text-indent: 2em;
                    }
    
                    .line {
                        width: 100%;
                        height: 1px;
                        background: #e8e8e8;
                    }
                }
    
                .top-text-nav {
                    font-size: 18px;
                    color: #666;
                    margin-top: 25px;
    
                    p {
                        padding-left: 20px;
                        position: relative;
                        margin-top: 32px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        cursor: pointer;
                    }
    
                    p:before {
                        position: absolute;
                        top: 10px;
                        left: 4px;
                        content: "";
                        width: 6px;
                        height: 6px;
                        border: 1px solid #666666;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
  .bottom {
    width: 100%;
    height: 44%;
    background: url(https://file.panda.org.cn/skin/cn/images/bgh.jpg) no-repeat;
    background-size: cover;
    position: relative;
    .main{
        margin: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 27%;
    width: 80%;
    animation: moveDown1 1s ease-in-out forwards; 
            opacity: 0;
            animation-delay: 3s;
   
    }
  }
}
  .right {
    position: absolute;
    width: 31.25%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    right: 0;
    z-index: 3000;
    .top {
      width: 100%;
      height: 72%;
      background-image: url(https://file.panda.org.cn/skin/cn/images/bg2.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #fff;
      position: relative;
      .main {
        margin: auto;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 13%;
        max-width: 460px;
        min-width: 360px;
        width: 80%;
        .main-box {
          height: 265px;
          position: relative;
          padding: 10px;
          background: rgba(255, 255, 255, 0.4);
          width: 360px;
          .img {
            background: url(../../../assets/images/222.jpg);
            background-size: cover;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }
    }

    .bottom {
      width: 100%;
      height: 29%;
      background-image: url(../../../assets/images/333.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-color: #fff;
      position: absolute;
      top: 71%;
      .main {
        margin: auto;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        max-width: 460px;
        min-width: 360px;
        width: 80%;
        animation: moveDown2 1s ease-in-out forwards; 
            opacity: 0;
            animation-delay: 2.5s;
        .main-box {
          .bottom-text-nav {
            font-size: 18px;
            color: #fff;
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            p {
              margin-bottom: 20px;
              padding-left: 20px;
              position: relative;
              width: 48%;
              height: 24px;
              cursor: pointer;
              span {
                width: 138px;
                border-bottom: 1px solid transparent;
                padding-bottom: 3px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
            p:hover {
              /* 鼠标悬停时添加白色下划线 */
              text-decoration: underline;
              color: white; /* 设置下划线颜色为白色 */
            }
          }
        }
      }
    }
  }
}
</style>
