<script setup>
import { ref } from 'vue';
const num=ref(100)
const add=n=>{
    num.value+=n
}

// 暴露数据给父元素调用，父元素可通过ref获取此对象的数据
defineExpose({
    num,
    add
})
</script>

<template>
    <div class="child1">
        <h3>我是第一个Child组件</h3>
        <button @click="add(-1)">-</button>
        {{ num }}
        <button @click="add(2)">+</button>
    </div>
</template>

<style lang="scss" scoped>
.child1 {
    border: 3px solid red;
    padding: 20px;
}
</style>
