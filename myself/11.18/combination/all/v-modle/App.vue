<script setup>
import Child from './components/Child.vue';
import { ref, provide } from 'vue'
const title = ref('我是父组件标题')
const num = ref(10)

const changeTitle = t => {
  title.value = t
}
</script>

<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <input type="text" v-model="title">
    <button @click="num++">点击次数：{{ num }}</button>
    <Child v-model="num" v-model:title="title"></Child>
    <Child :modelValue="num" @update:modelValue="v => num = v" :title="title" @update:title="v => title = v">
    </Child>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
