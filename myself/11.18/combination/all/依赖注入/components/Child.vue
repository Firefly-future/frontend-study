<script setup>
import Child2 from './Child2.vue'
import { inject } from 'vue'
// // 获取父组件传入的参数
// const props = defineProps(['title', 'num'])
// // 获取父组件传入的事件
// const emits = defineEmits(['changeTitle'])
// console.log(props.title, props.num)
// const reset = () => {
//     emits('changeTitle','我是按钮一')
// }
</script>

<template>
    <div class="child1">
        <h3>我是第一个Child组件</h3>
        <!-- <p>
            父组件标题：{{ title }}
            <button @click="$emit('changeTitle','重置标题')">重置标题</button>
            <button @click="emits('changeTitle','我是按钮11111111111')">修改标题</button>
            <button @click="reset">按钮2222</button>
        </p> -->

    <Child2></Child2>
    </div>
</template>

<style lang="scss" scoped>
.child1 {
    border: 3px solid red;
    padding: 20px;
}
</style>
