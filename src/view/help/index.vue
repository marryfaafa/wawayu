<template>
  <div class="help-container">
    <div class="message-box">
      <div class="left-section">
        <h2 style="color: #fff">合作伙伴</h2>
        <div class="textwidget">
          <p>
            <img
              src="http://giantsalamanders.cn/wp/wp-content/uploads/2022/06/ZSL.png"
              alt=""
              style="vertical-align: baseline"
            />
          </p>
          <p style="color: #fff; line-height: 29px">
            伦敦动物学会（The Zoological Society
            ofLondon，简称ZSL）：是1826年4月<br />
            成立于伦敦的一个学术团体。伦敦动物学会已经发展成一个国际化的科研、自然保护和<br />
            教育慈善机构。它的主要作用是对动物及其栖息地进行保护。它管辖的动物园除了伦<br />
            敦动物园以外，还有惠普斯奈德动物园。伦敦动物学会在世界范围内拥有大量的专业<br />
            研究者和动物保护工作者。他们的工作内容有肉食动物种群数量估计的遗传分析、野<br />
            生大猩猩的健康监测、红树林的恢复及全球生物多样性指数的完善等。<br />
          </p>
        </div>
      </div>
      <div class="right-section">
        <h2 style="color: #fff">联系我们</h2>
        <div class="textwidget">
          <p>
            <img
              src="../../assets/images/erweima.jpg"
              alt=""
              style="vertical-align: baseline; height: 80px"
            />
          </p>
          <p style="color: #fff; line-height: 29px">
            <b>吉首大学</b>
            （Gansu “Green Camel Bell”<br />
            Environment and Development Center）<br />
            网站：<a
              href="http://localhost:5173/#/home"
              style="color: #fff; text-decoration: none"
              >http://localhost:5173/#/home</a
            ><br />
            地址： 兰州市七里河区明仁花苑17幢4单元102室 <br />
            邮政编码：730050<br />
            电子邮件：1950697817@126.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.help-container {
  //   background-color: #011627 !important;
  z-index: 10000;
  display: grid;
  .message-box {
    display: grid;
    padding-top: 75px;
    padding-left: 135px;
    padding-bottom: 25px;
    padding-right: 25px;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 50px;
    align-items: flex-start;
    .left-section {
      text-align: left;
      //   z-index: 100;
    }
    .right-section {
      text-align: left;
    }
  }
}
</style>
