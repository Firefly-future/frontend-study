<script setup>
import Child from './components/Child.vue';
import { ref, provide } from 'vue'
const title = ref('我是父组件标题')
const num = ref(10)
const ChildRef=ref(null)
const titleEl=ref(null)

const getChildRef=()=>{
  // 调用子组件内部的数据和方法
  console.log(ChildRef.value.num)
}

</script>

<template>
  <div class="app">
    <input type="text" v-model="title">
    <h2 ref="titleEl">{{ title }}</h2>
    <button @click="num++">点击次数：{{ num }}</button>
    <button @click="getChildRef">获取childref</button>
    <!-- 通过ref获取子组件数据 -->
    <Child ref="ChildRef"></Child>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
