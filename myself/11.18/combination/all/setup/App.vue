<script>
import { ref, computed, onMounted, watch } from 'vue'
export default {
  setup() {
    console.log("setup", this)
    const title = ref('标题')
    const num = ref(10)
    const abc = computed(() => 123)
    watch(num, () => {
      console.log('num改变了', num)
    })
    onMounted(() => {
      console.log('挂载成功了')
    })
    return {
      title,
      num,
      abc
    }
  }
}
</script>

<template>
  <h1>{{ title }}</h1>
  {{ num }}
  <button @click="num++">+</button>
  {{ abc }}
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
