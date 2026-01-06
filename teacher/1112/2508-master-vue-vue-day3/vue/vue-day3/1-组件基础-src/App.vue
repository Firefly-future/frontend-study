<script>
import ButtonCounter from './components/ButtonCounter.vue'
export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <div class="app">
    <h1>学习组件</h1>
    <button>我是按钮</button>
    <ButtonCounter v-for="item in 5" :key="item" />
    <ButtonCounter></ButtonCounter>
  </div>
</template>

<style lang='scss'>

</style>
