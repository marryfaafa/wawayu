<template>
  <div v-show="route.meta.showFather">
    <div class="dani-content1-new" @click="toOther(1)">
        <div class="dani-content1-newtt">
            <h2>大鲵的前世今生</h2>
            <h3></h3>
        </div>
        <section class="clearfix mt20" >
            <div class="dani-content1-new-left">
                <img src="../../../assets/images/444.jpg" alt="" style="width: 180px;height: 156px;">
            </div>
            <div class="dani-content1-new-right">
                <ul>
                    <li>史前奇迹：大鲵的远古起源...</li>
                    <li>水下幽灵：揭秘大鲵的生活习性...</li>
                    <li>生存挑战：大鲵面临的环境危机...</li>
                    <li>进化之谜：大鲵如何适应现代世界...</li>
                    <li>神话与现实：大鲵在文化中的地位...</li>
                </ul>
            </div>
        </section>
    </div>
    <div class="dani-content1-new m120" @click="toOther(2)">
        <div class="dani-content1-newtt">
            <h2>国家出台政策</h2>
            <h3></h3>
        </div>
        <section class="clearfix mt20">
            <div class="dani-content1-new-left">
                <img src="../../../assets/images/555.jpg" alt="" style="width: 180px;height: 156px;">
            </div>
            <div class="dani-content1-new-right">
                <ul>
                    <li>珍稀生灵的守护令：国家政策全面解读...</li>
                    <li>从边缘到中心：大鲵保护的国家行动...</li>
                    <li>政策春风：大鲵种群复兴的希望...</li>
                    <li>政策之光：照亮大鲵的未来之路...</li>
                    <li>与时间赛跑：紧急政策拯救濒危大鲵...</li>
                </ul>
            </div>
        </section>
    </div>
    <div class="dani-content1-new" @click="toOther(3)">
        <div class="dani-content1-newtt">
            <h2>困境与挑战</h2>
            <h3></h3>
        </div>
        <section class="clearfix mt20">
            <div class="dani-content1-new-left">
                <img src="../../../assets/images/th.jpg" alt="" style="width: 180px;height: 156px;">
            </div>
            <div class="dani-content1-new-right">
                <ul>
                    <li>生存边缘：大鲵面临的生态危机...</li>
                    <li>水域的哀歌：大鲵栖息地的消失...</li>
                    <li>污染的代价：大鲵与水质恶化的斗争...</li>
                    <li>非法捕猎的阴影：大鲵的无声呼救...</li>
                    <li>法律与执行的空隙：大鲵保护的法律挑战...</li>
                </ul>
            </div>
        </section>
    </div>
    <div class="dani-content1-new m120" @click="toOther(4)">
        <div class="dani-content1-newtt">
            <h2>养殖的原罪：大鲵</h2>
            <h3></h3>
        </div>
        <section class="clearfix mt20">
            <div class="dani-content1-new-left">
                <img src="../../../assets/images/777.jpg" alt="" style="width: 180px;height: 156px;">
            </div>
            <div class="dani-content1-new-right">
                <ul>
                    <li>养殖之问：大鲵的自然权利与人类的需求...</li>
                    <li>道德边界：养殖大鲵的伦理困境...</li>
                    <li>疾病传播的隐忧：养殖大鲵的健康风险...</li>
                    <li>养殖与野化：大鲵的自然回归之路...</li>
                    <li>消费者的责任：选择养殖大鲵的道德考量...</li>
                </ul>
            </div>
        </section>
    </div>  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps} from 'vue';
import {useRouter,useRoute} from 'vue-router'
const route=useRoute()
const props=defineProps({});
const router=useRouter();

const showFather=ref(false)

//跳转具体科普
function toOther(id:any){
    console.log("跳转",id)
    let par=''
    if(id==1){
        par='大鲵的前世今生'
    }else if(id==2){
        par='国家出台政策'
    }else if(id==3){
        par='困境与挑战'
    }else{
        par='养殖的原罪：大鲵'
    }
    console.log("sfdb",par)
    router.push({name:'PopularizationSubject',params:{id:par}})
}
</script>
<style lang='scss' scoped>
.m120 {
    margin-left: 20px;
}
.dani-content1-new{
    width: 490px;
    float: left;
    height: 220px;
    margin-top: 20px;
    .dani-content1-newtt {
        height: 40px;
        line-height: 40px;
        position: relative;
        // background: #f3f3f3;
        h2 {
            width: 180px;
            text-align: center;
            color: #fff;
            // background: #4ba243;
            background: #0568b0;
            float: left;
            font-size: 18px;
            font-family: 'Microsoft YaHei';
        }
    }
    .mt20 {
        margin-top: 20px;
        .dani-content1-new-left {
            width: 180px;
            height: 156px;
            float: left;
        }
        .dani-content1-new-right{
            float: left;
            margin-left: 10px;
            width: 300px;
            li {
                line-height: 30px;
               text-indent: 14px;
               font-size: 14px;
               cursor: pointer;
            //    color: #fff
            }
            li:hover {
                color: red; /* 字体变红 */  
            text-decoration: underline; /* 出现下划线 */  
            text-decoration-color: red;
            }
        }
    }
}
</style>