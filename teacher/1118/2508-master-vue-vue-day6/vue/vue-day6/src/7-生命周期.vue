<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
import axios from 'axios'

const num = ref(0)

const add = () => {
  num.value++
}

console.log(num.value)
const id = setInterval(() => {
  num.value ++
}, 1000)

axios.get('http://39.96.210.90:5001/banner')
  .then(res => {
    console.log(res.data)
  })

onMounted(() => {
  console.log('组件挂载成功，可以获取到页面的 dom 元素111')
})

onMounted(() => {
  console.log('组件挂载成功，可以获取到页面的 dom 元素222')
})

onMounted(() => {
  console.log('组件挂载成功，可以获取到页面的 dom 元素333')
})

onBeforeUnmount(() => {
  clearInterval(id)
})

</script>

<template>
  <div class="app">
    <button @click="add">+</button>
    <p>{{ num }}</p>
  </div>
</template>

<style lang='scss' scoped>

</style>
