<script setup>
import { ref } from 'vue';
import Child1 from './components/Child1.vue'
import Child2 from './components/Child2.vue'

const show = ref(true)
</script>

<template>
  <div class="app">
    <h2>app</h2>
    <button @click="show = !show">显示/隐藏</button>
    <Child1 v-if="show" />
    <Child2 />
  </div>
</template>

<style lang='scss' scoped>

</style>
