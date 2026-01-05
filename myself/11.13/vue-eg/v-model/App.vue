<script>
import { computed } from 'vue';
import Child1 from './components/Child1.vue';
import Child2 from './components/Child2.vue';
export default {
  components: {
    Child1,
    Child2
  },
  data() {
    return {
      title: '我是默认app',
      num: 0,
      form: {
        name: '小小灰',
        age: 2,
        gender: '女'
      }
    }
  },
  // 数据直接传给所有后代组件，后代组件再通过inject接收此数据
  provide() {
    return {
    }
  },
  methods: {
    changeNum(n) {
      this.num += n
    }
  }
}
</script>

<template>
  <div class="app">
    <h5>{{ title }}</h5>
    更换标题:<input type="text" v-model.trim="title">
    <hr />
    更换标题：<input type="text" :value="title" @input="e => title = e.target.value.trim()">
    <hr />

    <button @click="num--">num-</button>
    <h4>{{ num }}</h4>
    <button @click="num++">num+</button>
    <Child2 label="姓名" :model-value="form.name" @update:model-value="v => form.name = v"></Child2>
    <!-- <Child1 v-model:title="title"></Child1>
    <Child1 v-model="num"></Child1> -->
    <button>提交</button>
    <Child1 
    :title="title"
    @update:title='v=>title=v'
    :model-value="num"
    @update:model-value="v=>num=v"
    ></Child1>
    {{ form }}
  </div>
</template>

<style scoped>
.app {
  border: 1px solid red;
}
</style>
