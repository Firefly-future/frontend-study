<script>

export default {
  data () {
    return {
      num: 0,
      title: localStorage.getItem('title') || '标题',
      obj: {
        name: '小明',
        hobby: ['吃饭', '睡觉']
      }
    }
  },
  // 监听变量改变，自动执行回调函数
  watch: {
    // title(newVal, oldVal) {
    //   console.log('title改变了', newVal, oldVal)
    //   localStorage.setItem('title', this.title)
    // },
    // 监听对象时，内部属性改变不会执行回调函数，对象重新赋值才会执行函数
    // obj(newVal) {
    //   console.log('obj 改变了', newVal)
    // },
    // 想监听对象内部属性修改，需要添加深度监听
    obj: {
      handler(newVal) {
        console.log('obj 改变了', newVal)
      },
      deep: true, // 深度监听
      // immediate: true // 进入页面立即执行一次回调函数
      // once: true // 一次性监听器，监听到一次改变后就取消监听
    },
    // title(newVal, oldVal, onClean) {
    //   let n = 0
    //   const id = setInterval(() => {
    //     console.log(n++)
    //   }, 1000)
    //   onClean(() => {
    //     // 清理上一次监听函数中的副作用
    //     clearInterval(id)
    //   })
    // }
    // title: {
    //   handler() {
    //     console.log(document.querySelector('h1').outerHTML)
    //   },
    //   flush: 'post' // 让 handler 在dom更新之后执行，默认情况下 handler 在数据改变后，dom 更新前执行
    // }
  },
  methods: {
    fn() {
      this.$watch('num', (newNum) => {
        console.log('num 改变了', newNum)
      })
    }
  }
}
</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <input type="text" v-model="title">
    <button @click="title = '默认标题'">重置</button>
    <hr />
    <input type="text" v-model="obj.name" />
    <button @click="obj = {}">赋值obj</button>
    <button @click="obj.hobby[0] = Math.random()">修改hobby</button>
    <p>{{ obj }}</p>
    <hr />
    <button @click="num++">num点击次数:{{ num }}</button>
    <button @click="fn">创建一个监听</button>
  </div>
</template>

<style lang="scss">

</style>
