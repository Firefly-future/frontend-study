<script setup>
import { ref } from 'vue'
import { useCount } from '../hooks/useCount'
import { useMousePos } from '../hooks/useMousePos'

// 使用组合式函数
const { num, start, stop } = useCount(10)
const mousePos = useMousePos()
const title = ref('标题')

</script>

<template>
  <div class="child">
    <h3>child1</h3>
    <h4 v-copy="title">{{ title }}</h4>
    <input type="text" v-model="title">
    <p>
      倒计时：{{ num }}
      <button @click="start">开始</button>
      <button @click="stop">暂停</button>
    </p>
    <p>当前鼠标在页面的位置: {{ mousePos }}</p>
  </div>
</template>

<style lang='scss' scoped>
.child {
  border: 3px solid red;
  padding: 20px;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: .5);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    background: #fff;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
  }
}
</style>
