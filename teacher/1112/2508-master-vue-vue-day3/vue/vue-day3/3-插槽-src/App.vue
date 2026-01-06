<script>
import ButtonCounter from './components/ButtonCounter.vue'
import Dialog from './components/Dialog.vue'

export default {
  components: {
    ButtonCounter,
    Dialog
  },
  data () {
    return {
      apple: {
        title: '黄元帅苹果',
        price: 20,
        count: 2
      },
      show: false,
      slotName: 'header'
    }
  },
  methods: {
    changeCount({ title, n }) {
      console.log('子组件调用此函数，传入的数据', n)
      this.apple.count += n
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>学习组件</h1>
    <button @click="show = true">我是按钮</button>
    <!--
      1. 通过属性给子组件传递参数
      2. 通过事件给子组件传递函数
      3. 组件双标签内的元素会渲染到组件内的插槽中（slot）
    -->
    <ButtonCounter
      :title="apple.title"
      :price="apple.price"
      :count="apple.count"
      @change="changeCount"
    >
      <input type="text">
      <p>我是一个p标签</p>
      <ul>
        <li>111</li>
        <li>222</li>
      </ul>
    </ButtonCounter>

    <Dialog
      v-if="show"
      @close="show = false"
    >
      <template #[slotName]>
        <h2>我是标题</h2>
      </template> 

      <template #default="obj">
        <!-- #default="obj" 作用域插槽：让插槽内可以使用子组件内部的变量 -->
        <div class="form">
          <div class="row">姓名： <input type="text"></div>
          <div class="row">年龄： <input type="text"></div>
          <div class="row">性别： <input type="text"></div>
        </div>
        {{ obj }}
      </template>

      <template v-slot:footer>
        <button>确定</button>
        <button>取消</button>
      </template> 
    </Dialog>
  </div>
</template>

<style lang='scss'>

</style>
