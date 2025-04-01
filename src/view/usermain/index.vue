<template>
  <div class="home-container">
      <!-- <div class="swiper-wrapper" :style="wrapperStyle">
        <component :is="currentPage" />
      </div> -->
      <div class="swiper-container" @wheel="handleWheel">  
    <transition name="fade" mode="out-in">  
      <component :is="currentPageComponent" class="page" />  
    </transition>  
  </div>  
    </div>  
      <!-- <div class="section1">
    
   </div> -->
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted ,onUnmounted,computed} from "vue";
import Page1 from './components/page1.vue'
import Page2 from './components/page2.vue'
import Page3 from './components/page3.vue'
const pages = [Page1, Page2,Page3];  
const currentPageIndex = ref(0);  
  
// 使用计算属性来获取当前应该渲染的组件  
const currentPageComponent = computed(() => pages[currentPageIndex.value]);  
  
function handleWheel(event: WheelEvent) {  
  const delta = event.deltaY;  
  if (delta < 0 && currentPageIndex.value > 0) {  
    currentPageIndex.value--;  
  } else if (delta > 0 && currentPageIndex.value < pages.length - 1) {  
    currentPageIndex.value++;  
  }  
}  

// const currentPage = ref(Page1);

// // 定义当前的 translate3d 偏移量
// const wrapperStyle = ref({
//   transform: 'translate3d(0px, 0px, 0px)',
//   transitionDuration: '0ms'
// });

// // 页面高度，每个页面偏移量
// const pageHeight = 700;

// // 监听鼠标滚轮事件
// const handleWheel = (event: WheelEvent) => {
//   // 阻止默认滚动行为
//   event.preventDefault();

//   // 检查滚动方向
//   const direction = event.deltaY > 0 ? 'down' : 'up';
//   console.log("方向",direction)

//   // 计算新的偏移量
//   const currentTranslate = parseInt(wrapperStyle.value.transform.split(',')[1], 10);
//   let newTranslate = direction === 'down' ? currentTranslate + pageHeight : currentTranslate - pageHeight;
//    console.log(currentTranslate,newTranslate)
//   // 更新样式
//   wrapperStyle.value = {
//     transform: `translate3d(0px, ${newTranslate}px, 0px)`,
//     transitionDuration: '0ms'
//   };
//   console.log("as",wrapperStyle)
  
// };


// // 组件挂载后添加事件监听
// onMounted(() => {
//   window.addEventListener('wheel', handleWheel);
// });

// // 组件卸载前移除事件监听
// onUnmounted(() => {
//   window.removeEventListener('wheel', handleWheel);
// });
// function getPageStyle(index) {  
//   const transformY = index - currentPage.value === 0 ? '0' : '100%'; // 只显示当前页面  
//   return { transform: `translateY(${transformY})` };  
// }
  
// function handleWheel(event) {  
//   const delta = event.deltaY; // 滚动量，正数表示向下滚动，负数表示向上滚动  
//   console.log("向下还是",delta)
  
//   if (delta < 0 && currentPage.value>0) {  
//     // 向上滚动，且未到达最后一个页面  
//     currentPage.value--;  
//   } else if (delta > 0 && currentPage.value<pages.value.length - 1) {  
//     // 向下滚动，且未到达第一个页面  
//     currentPage.value++;  
//   }  
//   console.log("当前业务",currentPage.value)
  
//   // 这里可以添加动画逻辑，比如使用Vue的nextTick来确保DOM更新后再执行动画  
//   // 但在这个简单的例子中，我们假设CSS过渡已经足够  
// }   
</script>
<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 620px;
  position: relative;
  .swiper-container{
    overflow: hidden;  
  /* 根据需要设置高度 */  
  height: 720px;  
  // display: flex;  
  // align-items: center;  
  // justify-content: center; 
  .page {  
  width: 100%; /* 或其他适当的宽度 */  
  /* 如果有必要，可以添加动画效果的初始状态样式 */  
  transition: opacity 0.5s ease;  
  opacity: 1;  
      // 初始位置（如果需要）  
      // transform: translateY(100%); // 初始时组件在容器外部  
      // transition: transform 0.5s ease, opacity 0.5s ease;  
      // opacity: 0;  
    
}  
  
/* 过渡效果 */  
// .fade-enter-active, .fade-leave-active {  
//   transition: opacity 0s;  
// }  
// .fade-enter-from, .fade-leave-to {  
//   opacity: 0;  
// }   
  }
 
  
}
</style>
