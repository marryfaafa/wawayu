<template>
  <div style="position: absolute;z-index: 1000;width: 100%;height: 1100px;" class="dani-base">
    <component :is="currentComponent"></component>  
    <!-- <div style="height: 700px;width: 100%;">
       <Base v-if="route.params.id=='大鲵的前世今生'"></Base>
       <Palicy v-if="route.params.id=='国家出台政策'"></Palicy>
    </div> -->
  </div>
</template>
<script lang='ts' setup>
import {ref,defineProps,defineAsyncComponent,onMounted} from 'vue';
import {useRouter,useRoute} from 'vue-router'
const router=useRouter();
import Base from '../base.vue'
import Palicy from './palicy.vue'
const currentComponent = ref(null);  
const route = useRoute();  
onMounted(()=>{
    console.log("dani",route.params.id)
if (route.params.id=='大鲵的前世今生') { 
    console.log("对对对")
  currentComponent.value = defineAsyncComponent(() =>  
    import("../base.vue")  
  );  
} else if(route.params.id=='国家出台政策'){  
    currentComponent.value = defineAsyncComponent(() =>  
    import("./palicy.vue")  
  );
} else if(route.params.id=='困境与挑战'){
    currentComponent.value = defineAsyncComponent(() =>  
    import("../base.vue")  
  );  
}else{
    currentComponent.value = defineAsyncComponent(() =>  
    import("./palicy.vue")  
  );
}
})
const props = defineProps({
});
// onMounted(()=>{
//     console.log("sdjkvnalewtry")
// })

</script>
<style lang='scss' scoped>
.dani-base {
    position: absolute;
    z-index: 8000;
    width: 100%;
    height: 700px;
}
</style>