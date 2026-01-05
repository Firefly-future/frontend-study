<script setup>
  import { ref } from 'vue';
  import Child1 from './components/Child1.vue';
  import Child2 from './components/Child2.vue';
  const num = ref(10)
  const show = ref(true)
</script>

<template>
  <div class="app">
    <h1>我是App</h1>
    <button @click="show = !show">显示/隐藏</button>
    <Child1 v-if="show"></Child1>
    <Child2></Child2>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    padding: 20px;
    border: 2px solid;
  }
</style>
