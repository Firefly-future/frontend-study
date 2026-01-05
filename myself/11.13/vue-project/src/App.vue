<script>
import First from './components/First.vue';
import Second from './components/Second.vue';
export default {
  components: {
    First,
    Second
  },
  data() {
    return {
      title: '我是默认标题',
      num: 100,
      price: 10,
      form: {
        name: '小白',
        age: 33550337,
        sex: '男'
      }
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
  <!-- First 数组接收 -->
  <First :title :num></First>
  <!-- Second 对象接收 -->
  <Second :title :num :price :info="{
    name: '小白',
    age: 33550337,
    sex: '男'
  }" tipType="aa" @change.self="changeNum"></Second>

  <h2>{{ title }}</h2>
  <input type="text" v-model="title">
  <input type="text" :value="title" @input="e => title = e.target.value">


</template>



<style lang="scss" scoped></style>
