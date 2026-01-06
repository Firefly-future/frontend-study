<script>
import Child from './components/Child.vue'
export default {
  components: {
    Child
  },
  data() {
    return {
      title: '标题',
      obj: { name: '小明' },
      arr: [1,2,3]
    }
  },
  // 创建阶段
  beforeCreate() {
    // 组件创建之前，跟 vue 相关的内容还无法使用
    console.log(this.title)
  },
  created() {
    // 组件创建完成，数据可以使用，但是页面还没有渲染，可以在此处调用接口获取数据
    // console.log(this.obj)
    // console.log(this.arr)
    // console.log(document.querySelector('h1'))
  },
  // 挂载阶段
  // beforeMount() {
  //   // 挂载之前，还无法获取渲染后的dom
  //   console.log(this.obj)
  //   console.log(this.arr)
  //   console.log(document.querySelector('h1'))
  // },
  mounted() {
    // 组件渲染完成，可以获取到最新的dom元素
    console.log('组件挂载成功', document.querySelector('h1'))
  },
  // 更新阶段
  beforeUpdate() {
    console.log('组件 dom 更新之前', this.title, document.querySelector('h1').outerHTML)
  },
  updated() {
    // 可以获取到组件更新后的最新的 dom 元素
    console.log('组件 dom 更新完成', this.title, document.querySelector('h1').outerHTML)
  },
  // 组件销毁阶段
  beforeUnmount() {
    console.log('组件销毁之前')
  },
  unmounted() {
    console.log('组件销毁完成')
  }
}
</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <input type="text" v-model="title">
    <ul>
      <li v-for="item in arr">{{ item }}</li>
    </ul>
  </div>
  <Child v-if="title.length > 0" />
</template>

<style lang="scss">

</style>
