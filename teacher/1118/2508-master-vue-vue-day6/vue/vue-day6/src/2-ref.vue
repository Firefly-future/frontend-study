<script setup>
import { ref } from 'vue'

// 定义响应式变量 => { value: 值 }
// 1. 可以定义任意类型变量，可以重新赋值
// 2. 在js中获取和修改变量需要通过 value 属性，在模版中不用写value
const title = ref('我是标题') // { value: '我是标题' }
const num = ref(10) // { value: 10 }
const arr = ref([1,2,3,4,5])
const obj = ref({ name: '小明' })


const add = () => {
  console.log(title.value)
  num.value++
  console.log('add', num.value)
}

const titleRef = ref(null)
const submit = () => {
  console.log(titleRef.value)
}
</script>

<template>
  <div class="app">
    <input type="text" v-model="title">
    <button @click="submit">按钮</button>
    <!-- ref 获取 dom 元素需要在 js 中定义同名的 ref 变量 -->
    <h1 ref="titleRef">{{ title }}</h1>
    <p>{{ num }}</p>
    <button @click="add">+</button>
    <button @click="num++">+</button>
    <ul>
      <li v-for="item in arr" :key="item">{{ item }}</li>
    </ul>
    {{ obj }}
  </div>
</template>

<style lang='scss' scoped>

</style>
