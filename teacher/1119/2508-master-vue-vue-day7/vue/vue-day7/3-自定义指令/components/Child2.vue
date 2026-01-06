<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { format } from '../utils'
import { useCount } from '../hooks/useCount'

const { num } = useCount(80, true)
const formatTime = computed(() => format(num.value * 1000))

</script>

<template>
  <div class="child">
    <h3>child2</h3>
    <button v-copy="formatTime">复制</button>
    <h4>{{ formatTime }}</h4>
    <ul>
      <li v-for="v in 5">{{ v }}</li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.child {
  border: 3px solid red;
  padding: 20px;
}
</style>
