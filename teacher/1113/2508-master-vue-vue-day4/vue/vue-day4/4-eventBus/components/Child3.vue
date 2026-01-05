<script>
import Child4 from './Child4.vue';

export default {
  components: {
    Child4
  },
  data() {
    return {
    }
  }
}
</script>

<template>
  <div class="test">
    <h2>组件3</h2>
    <Child4 />
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
