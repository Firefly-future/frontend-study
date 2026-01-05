<script>
import { ref, computed, onMounted, watch } from 'vue'

export default {
  setup() {
    // 组合式api
    console.log('setup', this)
    const num = ref(10)
    const abc = computed(() => 123)
    const add = () => {
    }

    watch(num, () => {
      console.log('num改变了')
    })
    onMounted(() => {
      console.log('组件挂载完成')
    })
    return {
      num,
      add,
      abc
    }
  },
  // data () {
  //   return {
  //     title: '标题'
  //   }
  // },
  // computed: {
  // },
  // watch: {
  // },
  // methods: {
  // },
  // created () {
  //   console.log('created', this)
  // }
}
</script>

<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <p>{{ num }}</p>
    <button @click="num++">+</button>
  </div>
</template>

<style lang='scss' scoped>

</style>
