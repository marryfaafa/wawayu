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
                      <strong>建议</strong>
                      政府机构强化中国大鲵保护力度，完善相关立法，增加对偷捕和不规范放流中国大鲵的执法；
                    </li>
                    <li>
                      <strong>制止</strong>
                      未进行疫病和物种基因检测的放流；（根据法律规定，养殖、运输大鲵必须要办理相关许可和证件，严禁擅自将养殖的中国大鲵放生到自然环境）；
                    </li>
                    <li>
                      <strong>保护</strong>
                      河流和水生生态系统，
                      <strong>减少</strong>
                      对水源的污染；
                    </li>
                    <li>
                      <strong>开展</strong>
                      中国大鲵保护宣传教育和生态旅游
                      <strong>，树立</strong>
                      大鲵文化和生物多样性资源的自豪感；
                    </li>
                    <li>
                      野外发现中国大鲵应
                      <strong>避免干扰</strong>
                      ，更不能私自带回家或售卖获利；（根据《中华人民共和国刑法》第341条之规定：“非法猎捕、杀害国家重点保护的珍贵、濒危野生动物的，处5年以下有期徒刑或者拘役，并处罚金；情节严重的，处5年年以上10年以下有期徒刑，并处罚金；情节特别严重的，处10年以上有期徒刑，并处罚金或者没收财产”。）
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
                    <strong>“甘肃省中国大鲵保护可扩展模式开发”项目</strong>
                    由甘肃省绿驼铃环境发展中心和伦敦动物学会（英文缩写：ZSL）于2021年共同发起，并已完成备案。项目将调查大鲵的养殖方式、贸易网络、贸易对大鲵种群的潜在影响；进行社区问卷调查，了解大鲵的过去和现在所面临的威胁；开展社区宣传和教育，建立社区组织保护大鲵，恢复生态系统；开发甘肃省大鲵保护的可扩展模式。
                  </p>
                  <p>
                    如果您在野外发现中国大鲵，请与我们联系，一起参与中国大鲵的研究和保护。请在“大鲵保育网络”公众号中将您发现中国大鲵的地点、时间告知我们，条件允许请拍照上传。您也可以公众号中获得中国大鲵救助部门的联系方式。
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
