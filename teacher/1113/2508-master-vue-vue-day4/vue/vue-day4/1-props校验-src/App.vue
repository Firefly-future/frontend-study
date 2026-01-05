<script>
import Test from './components/Test.vue'
export default {
  components: {
    Test
  },
  data () {
    return {
    }
  }
}
</script>

<template>
  <div class="app">
    <Test
      title="标题1111"
      :count="2"
      tipType="cc"
    />
  </div>
</template>

<style lang='scss' scoped>

</style>
