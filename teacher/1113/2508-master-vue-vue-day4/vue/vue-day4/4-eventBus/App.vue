<script>
import Test from './components/Test.vue'
import Child2 from './components/Child2.vue'

export default {
  components: {
    Test,
    Child2
  },
  data () {
    return {
      num: 10
    }
  },
  methods: {
  }
}
</script>

<template>
  <div class="app">
    <h1>app</h1>
    <Test @changeNum="n => num += n" />
    <Child2 :num="num" />
  </div>
</template>

<style lang='scss' scoped>

</style>
