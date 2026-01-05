<script>

export default {
  name: 'Child4',
  data() {
    return {
      num: 0
    }
  },
  // created() {
  //   console.log('%c child4 创建完成', 'color: green; font-size: 20px')
  //   this.timer = setInterval(() => {
  //     this.num++
  //     console.log(this.num)
  //   }, 1000)
  // },
  // beforeUnmount() {
  //   console.log('%c child4 销毁之前', 'color: red; font-size: 20px')
  //   clearInterval(this.timer)
  // }
  // 被 keepAlive 缓存的组件特有的生命周期
  // 组件显示时执行
  activated() {
    console.log('%c child4 显示', 'color: green; font-size: 20px')
    this.timer = setInterval(() => {
      this.num++
      console.log(this.num)
    }, 1000)
  },
  // 组件隐藏时执行
  deactivated() {
    console.log('%c child4 隐藏', 'color: red; font-size: 20px')
    clearInterval(this.timer)
  }
}
</script>

<template>
  <div class="test">
    <h2>组件4</h2>
    <h3>num: {{ num }}</h3>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
