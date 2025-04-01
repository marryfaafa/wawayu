<template>
    <div class="if-container">
        <iframe :src="store.url" style=" height: 620px;width: 100%; "></iframe>
    </div>
</template>
<script lang='ts' setup>
import {ref,defineProps,onMounted} from 'vue';
import {FunctionStore} from '../../store/modules/function'
import {useRouter,useRoute} from 'vue-router'
const props=defineProps({});
const store=FunctionStore();
const router=useRouter();
const route=useRouter();



onMounted(()=>{
    console.log("½øÀ´")
})

</script>
<style lang='scss' scoped>
.if-container {
    top:0;
    position: absolute;
    background-color: #e9ecef;
    height: 620px;
    width: 100%;  
    z-index: 1000;
    
}
</style>