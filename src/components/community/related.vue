<template>
  <div>
    <div class="relate">
         <div class="top" >宣传栏</div>
         <!--  -->
         <ul >
          <li v-for="(item,index) in related" :key="index" @click="toOther(item)"> 
            <span style="font-size: 16px;color: #129D69;">{{item.title}}</span>
            <span style="font-size: 14px;color: #727B82;">{{item.content}}</span>
          </li>
         </ul>
      </div>
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps, onMounted} from 'vue';
import {FunctionStore} from '../../store/modules/function'
import {useRouter,useRoute} from 'vue-router'
const route=useRoute()
const router=useRouter()
const store=FunctionStore();
const props=defineProps({
    message:{
        type:Object,
        require:true
    }
});


const related=ref([])

function toOther(item){
  router.push({ path: route.path, params: { articleid: item.id },});
  store.article=item
}
onMounted(()=>{
    if(props.message){
        related.value=props.message;
    }
})

</script>
<style lang='scss' scoped>
.top {
    height: 40px;
    border-bottom: 1px solid #F0F0F0;
    line-height: 40px;
    padding-left: 15px;
  }
  ul {
    padding: 15px 15px;
    li {
      margin-bottom: 10px;
      cursor: pointer;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;

      }
    }
  }
</style>