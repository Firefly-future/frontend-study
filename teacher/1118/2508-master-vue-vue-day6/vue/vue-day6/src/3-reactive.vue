<script setup>
import { ref, reactive } from 'vue'

// reactive 定义变量
// 1. 只能定义对象和数组类型
// 2. 不能重新赋值，只能修改内部的数据
// 3. 不需要通过 value 获取

const list = ref(['a', 'b', 'c'])
let arr = reactive([1,2,3,4,5,6,7])
const obj = reactive({ name: '小明', age: 22 })

const change = () => {
  console.log(list.value.map(v => v + '1'))
  console.log(arr.map(v => v + '1'))

  list.value = []
  arr = []

  setTimeout(() => {
    list.value.push(111)
    // arr.push(111)
    // console.log(arr)
  }, 1000)
}
const change2 = () => {
  arr.push(Math.random())
  obj.name = Math.random()
}
</script>

<template>
  <div class="app">
    <button @click="change">修改数据</button>
    <button @click="change2">按钮</button>
    <div>{{ list }}</div>
    {{ arr }}
    <ul>
      <li v-for="item in arr" :key="item">{{ item }}</li>
    </ul>
    {{ obj }}
  </div>
</template>

<style lang='scss' scoped>

</style>
