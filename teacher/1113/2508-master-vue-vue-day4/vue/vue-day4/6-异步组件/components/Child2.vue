<script>
export default {
  name: 'Child2',
  data() {
    return {
    }
  },
  created() {
    console.log('%c child2 创建完成', 'color: green; font-size: 20px')
  },
  beforeUnmount() {
    console.log('%c child2 销毁之前', 'color: red; font-size: 20px')
  }
}
</script>

<template>
  <div class="test">
    <h2>组件2</h2>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
