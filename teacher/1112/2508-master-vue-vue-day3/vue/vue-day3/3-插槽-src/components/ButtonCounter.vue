<script>
import Desc from './Desc.vue'
export default {
  // 接收父组件传入的参数，props 变量时只读的，组件内不能直接修改 props 变量
  props: ['title', 'price', 'count'],
  components: {
    Desc
  },
  data () {
    return {
    }
  },
  methods: {
    add() {
      // 调用父组件传入的自定义事件
      this.$emit('change', {
        title: this.title,
        n: 1
      })
    }
  }
}
</script>

<template>
  <div class="box">
    <h3>{{ title }}</h3>
    <div>价格：¥{{ price }}</div>
    <button @click="$emit('change', { title, n: -1 })">-</button>
    {{ count }}
    <button @click="add">+</button>
    <Desc />
    <!-- 插槽：调用组件时双标签内的元素会渲染到此位置 -->
    <slot></slot>
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
