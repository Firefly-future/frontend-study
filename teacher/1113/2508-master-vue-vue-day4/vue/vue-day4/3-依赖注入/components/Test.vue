<script>
import Child2 from './Child2.vue';
export default {
  components: {
    Child2
  },
  data() {
    return {
    }
  }
}
</script>

<template>
  <div class="test">
    <h2>组件1</h2>
    <Child2 />
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
