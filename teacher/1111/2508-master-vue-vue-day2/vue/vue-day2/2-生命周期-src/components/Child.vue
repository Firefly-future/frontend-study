<script>
export default {
  data() {
    return {
      num: 0
    }
  },
  created() {
    console.log('%c child组件创建成功', 'color: red; font-size: 20px')
    this.intervalId = setInterval(() => {
      this.num++
      console.log(this.num)
    }, 1000)
  },
  // 销毁阶段，用来清除异步
  beforeUnmount() {
    console.log('%c child组件销毁之前', 'color: red; font-size: 20px')
    clearInterval(this.intervalId)
  },
  unmounted() {
    console.log('%c child组件销毁之后', 'color: red; font-size: 20px')
  }
}
</script>

<template>
  <div class="child-box">
    <h2>我是子元素 -> {{ num }}</h2>
  </div>
</template>

<style lang='scss'>
.child-box {
  border: 3px solid red;
  padding: 20px;
}
</style>
