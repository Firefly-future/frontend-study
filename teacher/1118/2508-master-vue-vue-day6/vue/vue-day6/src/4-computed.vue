<script setup>
import { ref, reactive, computed } from 'vue'

const isOdd = ref(true)
const arr = reactive([1,2,3,4,5,6,7])
const add = () => {
  arr.push(arr.length + 1)
}

const newList = computed(() => {
  return arr.filter(v => {
    return v % 2 === (isOdd.value ? 1 : 0)
  })
})

const len = computed(() => {
  return arr.length
})
</script>

<template>
  <div class="app">
    <button @click="isOdd = !isOdd">{{ isOdd ? '奇数' : '偶数' }}</button>
    <button @click="add">添加数据</button>
    <ul>
      <li v-for="item in newList" :key="item">{{ item }}</li>
    </ul>
    {{ arr }}
    <hr />
    {{ len }}
  </div>
</template>

<style lang='scss' scoped>

</style>
