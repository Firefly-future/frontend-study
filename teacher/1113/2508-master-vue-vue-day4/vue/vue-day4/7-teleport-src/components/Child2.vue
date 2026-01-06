<script>
import Dialog from './Dialog.vue'
export default {
  components: {
    Dialog
  },
  name: 'Child2',
  data() {
    return {
      show: false
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
    <button @click="show = true">显示</button>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <!-- Teleport: 把内部的元素渲染到指定的位置 -->
    <Teleport to="body">
      <Dialog v-model:visible="show" />
    </Teleport>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
