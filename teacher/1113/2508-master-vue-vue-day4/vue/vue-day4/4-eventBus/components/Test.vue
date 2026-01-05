<script>
import event from '../EventBus'

export default {
  data() {
    return {
    }
  },
  methods: {
    clickFn() {
      console.log(event)
      // 调用 eventBus 中的事件
      event.emit('changeTitle', Math.random())
    }
  },
  created() {
  }
}
</script>

<template>
  <div class="test">
    <h2>组件1</h2>
    <button @click="$emit('changeNum', 1)">修改</button>
    <button @click="clickFn">修改组件4</button>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
