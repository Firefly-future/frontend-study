<script>

export default {
  name: 'Child1',
  data() {
    return {
      num: 1
    }
  },
  methods: {
  },
  created() {
    console.log('%c child1 创建完成', 'color: green; font-size: 20px')
  },
  beforeUnmount() {
    console.log('%c child1 销毁之前', 'color: red; font-size: 20px')
  }
}
</script>

<template>
  <div class="test">
    <h1>Child1 组件</h1>
    <button @click="num++">点击次数：{{ num }}</button>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
