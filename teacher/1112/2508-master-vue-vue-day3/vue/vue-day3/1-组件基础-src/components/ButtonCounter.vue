<script>
import Desc from './Desc.vue'
export default {
  components: {
    Desc
  },
  data () {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <div class="box">
    <h3>我是一个组件</h3>
    <button @click="count--">-</button>
    {{ count }}
    <button @click="count++">+</button>
    <Desc />
  </div>
</template>

<style lang='scss' scoped>
// scoped: 让样式只在此组件内生效
// 原理：给组件内部的元素添加 data-v 开头的自定义属性，通过属性选择器给元素添加样式
.box {
  border: 1px solid red;
  padding: 10px;
}
button {
  background: red;
}
</style>
