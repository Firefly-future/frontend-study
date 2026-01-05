<script>
import { computed } from 'vue';
import Child1 from './components/Child1.vue';
export default {
  components: {
    Child1
  },
  data() {
    return {
      title: '我是app',
      num: 0
    }
  },
  // 数据直接传给所有后代组件，后代组件再通过inject接收此数据
  provide() {
    return{
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
      this.num += n
    }
  }
}
</script>

<template>
  <div class="app">
    <h5>{{ title }}</h5>
    <button @click="num--">num-</button>
    <h4>{{ num }}</h4>
    <button @click="num++">num+</button>
    <Child1 :title="title"></Child1>
  </div>
</template>

<style scoped>
.app {
  border: 1px solid red;
}
</style>
