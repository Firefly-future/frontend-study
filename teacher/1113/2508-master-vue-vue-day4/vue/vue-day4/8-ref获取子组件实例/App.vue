<script>
import Box from './components/Box.vue'
export default {
  components: {
    Box
  },
  data () {
    return {
    }
  },
  methods: {
    submit() {
      // ref 获取 dom 元素
      console.log(this.$refs.title)
      // ref 获取 组件实例，可以调用子组件内部的数据和方法
      console.log(this.$refs.box)
      this.$refs.box.add(2)
    }
  }
}
</script>

<template>
  <div class="app">
    <h1 ref="title">app</h1>
    <button @click="submit">按钮</button>
    <Box ref="box" />
  </div>
</template>

<style lang='scss' scoped>

</style>
