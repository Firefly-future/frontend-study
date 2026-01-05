<script setup>
import Child from './components/Child.vue';
import { ref ,provide} from 'vue';
const title=ref('我是父组件标题')
const num = ref(0)
const changeNum=()=>{
  num.value++
}
const changeTitle=t=>{
  title.value=t
}
provide('rootTitle',title)
provide('rootNum',num)
provide('rootChangeTitle',changeTitle)
</script>

<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <button @click="num--">-</button>
    {{ num }}
    <button @click="changeNum">点击次数:{{ num }}</button>
    <Child></Child>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
