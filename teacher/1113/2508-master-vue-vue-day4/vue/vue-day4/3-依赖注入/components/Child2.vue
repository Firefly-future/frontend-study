<script>
import Child3 from './Child3.vue'
export default {
  inject: ['num'],
  components: {
    Child3
  },
  data() {
    return {
    }
  }
}
</script>

<template>
  <div class="test">
    <h2>组件2</h2>
    <h3>num: {{ num }}</h3>
    <Child3 />
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
