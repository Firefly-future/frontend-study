<script>
export default {
  data() {
    return {
      title: 'hello vue',
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      type: 0,
      typeEm: [
        '全部', '奇数', '偶数'
      ]
    }
  },
  // 计算：根据某个或多个响应式变量生成新变量的时候使用
  // 使用函数计算  调用几次 计算几次，函数中没有使用的数据改变也会重新计算
  // 计算属性：有缓存，当计算属性中使用的变量改变时重新计算函数 没改变时直接从缓存中读取
  // 计算属性的函数不需要手动调用，vue会自动调用函数缓存结果，使用时当做变量使用，但是不可以赋值
  computed: {
    // odd1() {
    //   console.log('函数运行了')
    //   return this.list.filter(item => item % 2 === 1)
    // }
    odd1(){
      console.log('函数运行了')
      if(this.type===0) return this.list
      const oddN1=this.type===1?1:0
      return this.list.filter(item=>item%2===oddN1)
    }
  },
  methods: {
    odd() {
      console.log('函数运行了')
      // return this.list.filter(item=>item%2===1)
      if (this.type === 0) return this.list
      const oddN = this.type === 1 ? 1 : 0
      return this.list.filter(item => item % 2 === oddN)
    },
    change() {
      this.type = this.type === 2 ? 0 : this.type + 1
    }
  }
}
</script>

<template>
  <h1 v-html="title"></h1>
  <button @click="change">{{ typeEm[type] }}</button>
  <button @click="list.push(list.length+1)">添加数据</button>
  <button @click="odd1=100">修改计算属性</button>
  <input type="text" v-model="title">
  <!-- <ul>
    <li v-for="item in odd1">{{ item }}</li>
  </ul>
  {{ odd1 }} -->
  
  <ul>
    <li v-for="item in odd()">{{ item }}</li>
  </ul>
  {{ odd() }}

</template>

<style lang="scss"></style>
