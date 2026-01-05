<script>
import Child1 from './components/Child1.vue';
import Child2 from './components/Child2.vue';
export default {
  components: {
    Child1,
    Child2
  },
  data() {
    return {
      title:'翁法螺丝抽象纪',
      num:10
    }
  },
  // 数据直接传给所有后代组件，后代组件再通过inject接收此数据
  provide() {
    return {
    }
  },
  methods: {
    changeNum(n){
      this.num+=n
    }
  }
}
</script>

<template>
  <div class="app">
   <h1>{{ title }}</h1>
   <button @click="changeNum(-1)">-</button>
   {{ num }}
   <button @click="changeNum(1)">+</button>
   <Child1 @changeNum="n=>num+=n"></Child1>
   <Child2 :num="num"></Child2>
  </div>
</template>

<style scoped>
.app {
  border: 1px solid red;
}
button{
  padding: 3px  20px;
  font-size: 20px;
}
</style>
