<script setup>
import { ref, nextTick } from 'vue'

const num = ref(0)

const add = () => {
  num.value++
  nextTick()
    .then(() => {
      // 等待 dom 更新之后执行
      console.log(document.querySelector('p').outerHTML)
    })
}
</script>

<template>
  <div class="app">
    <button @click="add">+</button>
    <p>{{ num }}</p>
  </div>
</template>

<style lang='scss' scoped>

</style>
