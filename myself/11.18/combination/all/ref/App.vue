<script setup>
import { ref } from 'vue';
// 定义响应式变量，=>{value:值}
// 在js中获取和修改变量需要通过value属性 在模版中不需要
const title=ref('标题')  //{value：标题}
const num=ref(10)
const arr=ref([1,2,3,4,5,6,7])
const obj=ref({name:'小明',age:22})

const add=()=>{
  console.log(title.value)
  num.value++
  console.log('add',num.value)
}

const titleRef=ref(null)
const submit=()=>{
  console.log(titleRef.value)
}
</script>

<template>
<div class="app">
  <h1>{{ title }}</h1>
  <button @click="num--">-</button>{{ num }}<button @click="add">+</button>
  <input type="text" v-model="title">
  <button @click="submit">按钮</button>
  <!-- ref获取dom元素 需要在js中定义同名的ref变量 -->
  <h2 ref="titleRef">{{ title }}</h2>
  <ul>
    <li v-for="item in arr">{{ item }}</li>
  </ul>
  {{ obj }}
</div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
