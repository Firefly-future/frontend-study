<script setup>
import Child from './components/Child.vue';
import { ref } from 'vue';
const title=ref('我是父组件标题')
const num = ref(0)
const changeNum=()=>{
  num.value++
}
const changeTitle=t=>{
  title.value=t
}
</script>

<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <button @click="num--">-</button>
    {{ num }}
    <button @click="changeNum">点击次数:{{ num }}</button>
    <Child :title="title" :num="num" @changeTitle="changeTitle"></Child>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
