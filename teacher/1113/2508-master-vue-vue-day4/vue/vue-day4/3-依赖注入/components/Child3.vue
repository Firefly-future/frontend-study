<script>
import ButtonCounter from './ButtonCounter.vue'
export default {
  components: {
    ButtonCounter
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
    <ButtonCounter />
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
