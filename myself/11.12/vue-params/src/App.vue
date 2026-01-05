<script>
import Bound from './components/Bound.vue';
import Dialog from './components/Dialog.vue';
export default {
  components: {
    Bound,
    Dialog
  },
  data() {
    return {
      // apple: {
      //   name: '红富士苹果',
      //   price: 10,
      //   count: 1
      // },
      list: [
        {
          title: '红富士苹果',
          price: 10,
          count: 1
        },
        {
          title: '香蕉',
          price: 15,
          count: 1
        },
        {
          title: '橙子',
          price: 20,
          count: 1
        }
      ],
      show: false,
      obj: {
        name: '小明',
        age: 22,
        sex: '男'
      }
    }
  },
  methods: {
    change({ title, n }) {
      this.apple.count += n
    },
    changeList({ title, n }) {
      const cur = this.list.find(item => item.title === title)
      cur.count += n
    }
  }
}

</script>

<template>
  <div class="app">
    <button @click="show = true">++++</button>
    <!-- <Bound :name="apple.name" :price="apple.price" :count="apple.count" @change="change"></Bound> -->
    <Bound v-for="item in list" :key="item.title" :title="item.title" :price="item.price" :count="item.count"
      @change="changeList">
      <!-- 插槽插在Bound组件双标签中 -->
      <h1>我是插槽</h1>
      <div class="list" v-for="value in 5" :key="value">{{ value }}</div>
    </Bound>
    <Dialog v-if="show" @close="show = false">
      <template #header>
        <h2>我是标题</h2>
      </template>
      <template #default="obj">
        <!-- obj 使得子组件可以展示自己的内部变量 -->
        <div>姓名: <input type="text"></div>
        <div>年龄: <input type="number"></div>
        <div>性别: <input type="text"></div>
        {{ obj }}
      </template>

      <template  v-slot:footer>
        <button @click="show=false">确定</button>
        <button @click="show=false">取消</button>
      </template>

    </Dialog>
  </div>
</template>

<style lang="scss">
h1 {
  color: red;
}
</style>
