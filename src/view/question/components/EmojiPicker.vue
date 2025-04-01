<template>  
	<div class="emoji_picker">  
		<div class="picker_container">  
			<div class="category" v-for="category in categories" :key="`category_${category}`">  
				<span>{{ category }}</span>  
				<div class="emojis_container">  
					<button  
						@click="handleEmojiClick(emoji)"  
						v-for="(emoji, index) in categoryEmojis(category)"  
						:key="`emoji_${category}_${index}`"  
					>  
						{{ emoji }}  
					</button>  
				</div>  
			</div>  
		</div>  
		<div class="bottom_arrow" v-if="show_arrow"></div>  
	</div>  
</template>  
  
<script setup lang="ts">  
import { ref,defineEmits } from 'vue';  
const emit=defineEmits(['sendEmoji'])
import data from '../../../assets/emoji.json';
  
// 假设的 categories 数据（在真实应用中，你可能需要从 props、Vuex 或 API 获取）  
const categories = ref(['Smileys', 'People', 'Nature', 'Food']);  
  
// 假设的 categoryEmojis 函数，它应该返回一个表情数组  
function categoryEmojis(category) {  
	// 这里应该根据 category 返回对应的表情数组  
	// 为了示例，我们为每个类别返回相同的静态数组  
    return data[category] || []; // 如果找不到对应的 category，则返回空数组
}  
  
// 处理点击事件的方法  
function handleEmojiClick(emoji) {  
	// 处理点击事件的逻辑  
	console.log(emoji); 
	emit('sendEmoji',emoji)
	 
}  
  
// 控制是否显示箭头的 ref  
const show_arrow = ref(true);  
  
// 如果有 props，使用 defineProps 定义它们  
// const props = defineProps({  
//   // 定义你的 props  
// });  
</script> 
<style scoped>

.emoji_picker
{
	position: relative;
	display: flex;
	flex-direction: column;
	width: 20rem;
	height: 20rem;
	max-width: 100%;
}

.emoji_picker,
.bottom_arrow
{
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, .0975);
}

.emoji_picker,
.picker_container
{
	border-radius: 0.5rem;
	background: white;
}

.picker_container
{
	position: relative;
	padding: 1rem;
	overflow: auto;
	z-index: 1;
}

.category
{
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
	color: rgb(169, 169, 169);
}

.emojis_container
{
	display: flex;
	flex-wrap: wrap;
}

.category button
{
	margin: 0.5rem;
	margin-left: 0;
	background: inherit;
	border: none;
	font-size: 1.75rem;
	padding: 0;
}

.bottom_arrow
{
	position: absolute;
	left: 50%;
	bottom: 0;
	width: 0.75rem;
	height: 0.75rem;
	transform: translate(-50%, 50%) rotate(45deg);
	background: white;
}

</style>