<script setup>
import { ref, reactive, watch, watchEffect, onWatcherCleanup } from 'vue'

const titleEl = ref(null)
const title = ref('标题')
const num = ref(0)
const obj = ref({ name: '小明', age: 22 })
const arr = reactive([{ name: '小红' }, 1,2,3,4,5,6,7])
const person = reactive({ name: '老王', age: 22 })

// 监听单个变量
// watch(title, (newVal, oldVal) => {
//   console.log('title改变了', newVal, oldVal)
//   console.log(titleEl.value.outerHTML)
// })
// 监听多个变量
// watch([title, num], ([newTitle, newNum], [oldTitle, oldNum]) => {
//   console.log('title或者num改变了', newTitle, newNum, oldTitle, oldNum)
// })

// const changeObj = () => {
//   obj.value = {}
// }
// // 监听引用类型，默认只能监听重新赋值，监听内部变化需要添加深度监听 deep: true
// watch(obj, () => {
//   console.log('obj改变了', obj.value)
// }, {
//   deep: true,
//   // immediate: true 进入页面立即执行一次函数
// })

// // 监听 reactive 变量，默认是深度监听
// watch(arr, () => {
//   console.log('arr改变了', arr)
// }, {
//   // immediate: true
// })

// 监听对象的某个属性
// watch([
//   () => person.name,
//   () => person.age
// ], () => {
//   console.log('person.name, person.age 改变了')
// }, {
//   // once: true // 一次性监听器
// })

// 第三个参数
// watch(obj, () => {
//   console.log('obj改变了', obj.value)
// }, {
//   deep: true, // 深度监听
//   immediate: true, // 进入页面立即执行一次函数
//   once: true, // 一次性监听器
//   flush: 'post' // 让回调函数在 dom 更新后执行
// })

// 自动监听函数内部使用的变量，进入页面会立即执行一次
// watchEffect(() => {
//   console.log('这是标题', title.value)
//   console.log('这是person', person.name)
//   console.log('这是obj', obj.value.name)
// })


// watch(title, (newVal, oldVal) => {
//   const id = setInterval(() => {
//     num.value++
//     console.log(num.value)
//   }, 1000)

//   onWatcherCleanup(() => {
//     // 清除上一次定时器
//     console.log('清除上一次定时器')
//     clearInterval(id)
//   })
// })

</script>

<template>
  <div class="app">
    <h2 ref="titleEl">{{ title }}</h2>
    <input type="text" v-model="title">
    <div>
      <button @click="num++">+</button>
      {{ num }}
    </div>
    <div>
      <input type="text" v-model="obj.name">
      <button @click="changeObj">修改obj</button>
      <p>{{ obj }}</p>
    </div>
    <button @click="arr.push(arr.length + 1)">添加数据</button>
    <button @click="arr[0].name = Math.random()">修改arr[0].name</button>
    <ul>
      <li v-for="item in arr" :key="item">{{ item }}</li>
    </ul>
    <div>
      <input type="text" v-model="person.name">
      <button @click="person.age++">age++</button>
      <p>{{ person }}</p>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
