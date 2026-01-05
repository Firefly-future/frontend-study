<script>
import Child3 from './Child3.vue';
export default {
  components: {
    Child3
  },
  props: ['num'],
  data() {
    return {
    }
  }
}
</script>

<template>
  <div class="test">
    <h2>组件2</h2>
    <p>num: {{ num }}</p>
    <Child3 />
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
