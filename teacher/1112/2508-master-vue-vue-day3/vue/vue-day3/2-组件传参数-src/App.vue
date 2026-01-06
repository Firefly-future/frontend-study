<script>
import ButtonCounter from './components/ButtonCounter.vue'
export default {
  components: {
    ButtonCounter
  },
  data () {
    return {
      apple: {
        title: '黄元帅苹果',
        price: 20,
        count: 2
      },
      list: [
        {
          title: '红富士苹果',
          price: 10,
          count: 1
        },
        {
          title: '香蕉',
          price: 5,
          count: 1
        },
        {
          title: '樱桃',
          price: 15,
          count: 1
        }
      ]
    }
  },
  methods: {
    changeCount({ title, n }) {
      console.log('子组件调用此函数，传入的数据', n)
      this.apple.count += n
    },
    changeItem({ title, n }) {
      const cur = this.list.find(v => v.title === title)
      cur.count += n
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>学习组件</h1>
    <button>我是按钮</button>
    <!--
      1. 通过属性给子组件传递参数
      2. 通过事件给子组件传递函数
    -->
    <ButtonCounter
      :title="apple.title"
      :price="apple.price"
      :count="apple.count"
      @change="changeCount"
    />
    <ButtonCounter
      v-for="item in list"
      :key="item.title"
      :title="item.title"
      :price="item.price"
      :count="item.count"
      @change="changeItem"
    />
  </div>
</template>

<style lang='scss'>

</style>
