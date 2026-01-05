<script setup>
const props=defineProps(['modelValue','title'])
const emits=defineEmits(['update:modelValue','update:title'])

// 简化v-model的获取方式
const num = defineModel()
const titleModel=defineModel('title')
console.log(num)
</script>

<template>
    <div class="child1">
        <h3>我是第一个Child组件</h3>
        <p><button @click="emits('update:title',Date.now())">修改title</button>
        {{ title }}
        </p>
        <button @click="emits('update:modelValue',modelValue-1)">-</button>
        {{ modelValue }}
        <button @click="emits('update:modelValue',modelValue+1)">+</button>
        <hr>
        <p>
            <button @click="titleModel=Date.now()">修改title</button>
            {{ titleModel }}
        </p>
        <button @click="num--">-</button>{{ num }}<button @click="num++">+</button>
    </div>
</template>

<style lang="scss" scoped>
.child1 {
    border: 3px solid red;
    padding: 20px;
}
</style>
