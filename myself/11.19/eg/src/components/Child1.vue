<script setup>
import { useCount } from '@/hooks/useCount';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useQusetion } from '@/hooks/useQuestion';

const {num,start,stop}=useCount(10)
const mousePos =useMousePosition()
const {questions,loading,getData}=useQusetion()
getData()
</script>
<template>
    <div class="child1">
        <div class="loading" v-if="loading">
            <p>加载中...</p>
        </div>
        <h2>我是child1组件</h2>
        <p>
            倒计时：{{ num }}
            <button @click="start">开始</button>
            <button @click="stop">暂停</button>
        </p>
        <p>鼠标当前的位置：{{ mousePos }}</p>
        {{ questions }}
    </div>
</template>
<style lang="scss" scoped>
    .child1 {
        padding: 20px;
        border: 2px solid red;
    }
  
</style>