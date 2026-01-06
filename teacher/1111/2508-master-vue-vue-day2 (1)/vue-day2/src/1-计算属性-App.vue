<script>

export default {
  data () {
    return {
      title: '我是标题',
      type: 0,
      list: [1, 2, 3, 4, 5, 6, 7],
      typeEnum: {
        0: '全部',
        1: '奇数',
        2: '偶数'
      }
    }
  },
  computed: {
    // 使用场景：需要根据某个或者多个响应式变量生成新变量的时候使用
    // 使用函数计算：调用几次计算几次、函数中没有使用的数据改变也会重新计算
    // 计算属性：
    //   1. 有缓存，当计算属性中使用的变量改变时重新计算函数，没改变时直接从缓存中读取。
    //   2. 计算属性的函数不需要手动调用，vue会自动调用函数缓存结果，使用时当成变量使用，但是不可以赋值。
    odd1() {
      console.log('计算数据')
      if (this.type === 0) return this.list
      const isOdd = this.type === 1 ? 1 : 0
      return this.list.filter(v => v % 2 === isOdd)
    }
  },
  methods: {
    odd() {
      console.log('计算数据')
      if (this.type === 0) return this.list
      const isOdd = this.type === 1 ? 1 : 0
      return this.list.filter(v => v % 2 === isOdd)
    },
    change () {
      this.type = this.type === 2 ? 0 : this.type + 1
    }
  }
}
</script>

<template>
  <div class="box">
    <input type="text" v-model="title">
    <h2>{{ title }}</h2>
    <button @click="change">{{ typeEnum[type] }}</button>
    <button @click="list.push(list.length + 1)">添加数据</button>
    <!-- 计算属性不可以重新赋值 -->
    <!-- <button @click="odd1 = 100">修改计算属性</button> -->
    <ul>
      <li v-for="val in odd1" :key="val">{{ val }}</li>
    </ul>
    <p>{{ odd1 }}</p>
    <p>{{ odd1 }}</p>
    <p>{{ odd1 }}</p>
    <p>{{ odd1 }}</p>
    <p>{{ odd1 }}</p>
    <p>{{ odd1 }}</p>
  </div>
</template>

<style lang="scss">

</style>
