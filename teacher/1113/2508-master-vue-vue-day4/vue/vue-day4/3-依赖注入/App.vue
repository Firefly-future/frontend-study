<script>
import Test from './components/Test.vue'
import { computed } from 'vue'

export default {
  components: {
    Test
  },
  data () {
    return {
      title: '标题',
      num: 10
    }
  },
  // 把数据直接传递给所有后代组件，后代组件通过 inject 接收此处数据
  provide() {
    return {
      title: computed(() => this.title),
      num: computed(() => this.num),
      changeTitle: this.changeTitle,
      changeNum: this.changeNum
    }
  },
  methods: {
    changeTitle(title) {
      this.title = title
    },
    changeNum(n) {
      this.num = n
    }
  }
}
</script>

<template>
  <div class="app">
    <h2>title: {{ title }}</h2>
    <h2>num: {{ num }}</h2>
    <button @click="num++">num+</button>
    <Test :title="title" />
  </div>
</template>

<style lang='scss' scoped>

</style>
