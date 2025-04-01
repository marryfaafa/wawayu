<template>
  <div class="integrity-v" v-show="route.meta.showFather">
    <div class="video">
      <div class="video-inner">
        <span class="v1">科普</span>
        <span class="v2">大家</span>
      </div>
    </div>
    <div class="fan-con">
      <div class="family-swiper swiper-pointer-events">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in items" :key="index">
            <div class="famoall">
              <div class="famo">
                <img
                  :src="item.avatar"
                  alt=""
                />
              </div>
              <div class="name">
                <ul>
                  <li>
                    <a href="" style="font-size: 22px; color: #0568b0"
                      >{{item.name}}</a
                    >
                  </li>
                  <li>{{item.identy}}</li>
                </ul>
              </div>
              <div class="celebrity" >
                <div v-for="(item1,index) in item.behavior" :key="index"><span>
                    <a href=""> {{item1}} </a>
                </span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import {useRouter,useRoute} from 'vue-router'
const route=useRoute()

const items=ref([
    {avatar:'https://statics.kjrb.com.cn/files/template/202402/27/ea96c5db-4566-4763-80d8-af14d3ef4297.jpg',
    name:'王渝生',identy:'科学史家，科普名家，国家教育咨询委员会委员',
    behavior:['舵引航向 乘风破浪',' 科普作家王渝生走进南渝集团校大学城第三中学校',' 风箱推拉乾坤动 ']},
    {avatar:'https://statics.kjrb.com.cn/files/template/202402/28/905248c4-045a-4fca-b7bc-7b6397db979b.jpg',
    name:'周忠和',identy:'中国科学院院士，中国科普作家协会理事长',
    behavior:['周忠和院士：科学家做科普绝不是不务正业',' 科普精品怎样“炼”成？周忠和院士提到了这几个方面',' 周忠和院士谈“为什么还要关注古生物学”  ']},
    {avatar:'https://statics.kjrb.com.cn/files/template/202402/28/0b721c83-ebc6-4443-9a60-0c4e49e2efcf.jpg',
    name:'郭 耕',identy:'中国科普作家协会生态专业委员会副主任，北京市生物多样性保护研究中心研究员',
    behavior:['灰瓣蹼鹬  来自北冰洋的“稀客”',' 龙头上为何生鹿角',' 蹄兔的近亲竟然是大象 ']},
    {avatar:'https://statics.kjrb.com.cn/files/template/202402/28/315b77ab-1c51-4553-b515-f4840e103c1a.jpg',
    name:'陈柳岐',identy:'中国科普作家协会科普教育专业委员会副秘书长',
    behavior:['别因AI工具丧失你的思考力',' 谨防过度沉迷，给虚拟世界加把“锁”',' 连接已知与未知的桥梁 ']}
])
</script>
<style lang="scss" scoped>
.video {
  margin-top: 28px;
  text-align: center;
  font-family: "microsoft yahei";
  font-size: 36px;
  margin-bottom: 30px;
  position: relative;
  background: url(../../../assets/images/line.png) repeat-x 0 27px;
  .video-inner {
    background: #fff;
    display: inline-block;
    .v1 {
      color: #0568b0;
      padding-left: 14px;
    }
    .v2 {
      padding-right: 14px;
    }
  }
}
.fan-con {
  height: 410px;
  text-align: center;
  margin: auto;
  .family-swiper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .swiper-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      transition-property: transform;
      box-sizing: content-box;
      .swiper-slide {
        width: 25%;
        flex-shrink: 0;
        height: 100%;
        position: relative;
        transition-property: transform;
        .famoall {
          height: 410px;
          position: relative;
          width: 207px;
          margin: auto;
          display: inline-block;
          .famo {
            position: relative;
            height: 207px;
            border-radius: 50%;
            img {
              background-size: cover;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .name {
            position: relative;
            text-align: center;
            margin-top: 23px;
            li:last-child {
              min-height: 38px;
              margin-top: 10px;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              color: #999999;
              font-family: "microsoft yahei";
            }
          }
          .celebrity {
            width: 100%;
            margin-top: 12px;
            margin-bottom: 25px;
            div {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: left;
                color: #666;
               span>a{
                width: 132px;
                  padding-left: 13px;
                  color: #666;
                  background-image: url(../../../assets/images/famouszz.png);
                  background-repeat: no-repeat;
                  background-position: 0 4px;
                  line-height: 32px;
                  font-size: 14px;
                  font-family: 'microsoft yahei';
                }
            }
          }
        }
      }
    }
  }
  .swiper-pointer-events {
    touch-action: pan-y;
  }
}
</style>
