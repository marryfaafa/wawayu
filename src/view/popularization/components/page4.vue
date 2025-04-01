<template>
    <div class="slide3">
      <div class="elementor-container">
        <div class="elementor-column">
          <div class="elementor-wrap">
            <div class="column">
              <div class="elementor-populated1">
                <div class="elementor-widget-editor">
                  <div>
                    <ul
                      style="
                        margin: 0 0 2.1em 3em;
                        line-height: 28px;
                      "
                      class="dot"
                    >
                      <li>
                        <strong>背景</strong>
                        鲵，是现生地球上最大的两栖动物，其最大个体接近2m，体质量超过50kg。传说中大鲵能够发出像婴儿般哭泣的声音，故得名娃娃鱼。
                      </li>
                      <li>
                        <strong>误解</strong>
                        但这可能是对它最大的误解之一，因为从解剖学上而言，娃娃鱼并没有用于发声的器官。大鲵又常被称为水中“活化石”，这源自它的骨骼形态自1.6亿年以来基本无变化。
                      </li>
                      <li>
                        <strong>特征</strong>
                        大鲵具有肉食性、夜行性
                        <strong>夜行性</strong>
                        和穴居性特征，具雄性护幼行为（爸爸带孩子）。
                      </li>
                      <li>
                        <strong>分布</strong>
                        中国的大鲵曾广泛分布于黄河、长江和珠江
                        <strong>黄河、长江和珠江</strong>
                        三大水系，但如今在野外很多地区均难觅踪影。
                      </li>
                      <li>
                        野生大鲵对栖息地具有选择性，一般比较
                        <strong>偏好两类栖息地</strong>
                        ：一类是天然的暗河或者溶洞，另一类是由河道中巨石与河底形成的间隙。它们对生境的要求较为苛刻，因此栖息地的丧失和破坏成为了大鲵的主要致危因素之一。在我国，大鲵人工养殖也已有60多年历史，形成了比较成熟的人工繁殖技术，在全国多地都有一定的养殖规模，所以野生大鲵的保护通常又跟人工养殖大鲵的问题交织在一起。
                      </li>
                      <li>
                        如野外发现受伤或被困的中国大鲵，应立即向当地林业、动物管理站或保护区汇报，并在专业人员的指导下
                        <strong>参与救助</strong>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="elementor-widget-editor">
                  <div>
                    <p style="margin-bottom: 25px">
                      <strong>目前我国大鲵的保护主要有两种方式：</strong>
                      一种是栖息地保护，也就是成立各种自然保护区进行野外种群保护。1982年到现在，全国已经成立了53个涉及到大鲵的保护区，其中以大鲵为主要保护对象的就有38个。
                    </p>
                    <p>
                        另一种是人工增殖放流。大鲵放流非常普遍，从2002年起，全国有16个省市开展过大鲵的人工增殖放流活动，放流数目数十万尾。国家农业部每年6月6日组织的全国放鱼日，也会有不少地区开展大鲵的人工放流活动。
                    </p>
                  </div>
                </div>
                <div class="elementor-widget-image" style="margin-top: 40px">
                  <div>
                    <img src="../../../assets/images/erweima.jpg" alt="" />
                    <div
                      class="caption"
                      style="color: #f9f8f8; margin: 0.8075em 0"
                    >
                      扫码关注微信公众号
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column1">
              <div class="elementor-populated2">
                <div class="elementor-element" style="margin-bottom: 10px">
                  <div>
                    <h5 style="color: #ffffffa6; line-height: 0">
                      How You Can Help
                    </h5>
                  </div>
                </div>
                <div class="elementor-element" style="margin-top: -10px">
                  <div>
                    <h2 style="color: #fff; font-size: 2.2666666666667rem">
                      如何提供帮助
                    </h2>
                  </div>
                </div>
                <div class="elementor-element">
                  <div style="margin: 0 0 75px 0">
                    <div>
                      <img
                        src="../../../assets/images/photo6.jpg"
                        alt=""
                        style="width: 510px; height: 340px"
                      />
                      <div class="underline">©ZSL|英国伦敦动物学会</div>
                    </div>
                  </div>
                </div>
                <div class="elementor-element">
                  <div style="margin: 0 0 50px 0">
                    <div>
                      <img
                        src="../../../assets/images/photo7.jpg"
                        alt=""
                        style="width: 510px; height: 480px"
                      />
                      <div class="underline">©ZSL|英国伦敦动物学会</div>
                    </div>
                  </div>
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
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  const props = defineProps({});
  const store = useStore();
  const router = useRouter();
  </script>
  <style lang="scss" scoped>
  .dot li {
    list-style: disc;
  }
  .underline {
    color: #f9f8f8;
    text-align: center;
    margin: 0.8075em 0;
  }
  .elementor-element {
    text-align: center;
    margin-bottom: 10px;
  }
  .slide3 {
    width: 1472px;
    height: 1325px;
    .elementor-container {
      max-width: 1170px;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .elementor-column {
        width: 100%;
        min-width: 768px;
        .elementor-wrap {
          align-items: center;
          // align-content: center;
          width: 100%;
          position: relative;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-between; /* 水平分布项目（可选） */
          .column {
            width: 50%;
            position: absolute;
            margin-left: -38px;
            .elementor-populated1 {
              padding: 100px 100px 0 0;
              .elementor-widget-editor {
                text-align: justify;
                color: #ffffffa6;
                margin-bottom: 10px;
              }
              .elementor-widget-image {
                text-align: center;
              }
            }
            .elementor-populated2 {
              padding: 0px 0 0 75px;
            }
          }
          .column1 {
            width: 50%;
            float: right;
            margin-top: 80px;
          }
        }
      }
    }
  }
  </style>
  