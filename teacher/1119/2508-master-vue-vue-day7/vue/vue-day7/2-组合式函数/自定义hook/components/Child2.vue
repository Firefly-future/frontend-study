<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { format } from '../utils'
import { useCount } from '../hooks/useCount'

const { num } = useCount(80, true)


</script>

<template>
  <div class="child">
    <h3>child2</h3>
    <h4>{{ format(num * 1000) }}</h4>
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
