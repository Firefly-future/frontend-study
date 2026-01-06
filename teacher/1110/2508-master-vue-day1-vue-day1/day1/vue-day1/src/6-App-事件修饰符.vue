<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      show: true,
      num: 0
    }
  },
  // 定义方法
  methods: {
    log (text) {
      alert(text)
    },
    submit(e) {
      console.log('提交')
    }
  }
}
</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <a href="https://baidu.com" @click.prevent="log('a标签')">链接</a>

    <div class="child" @click.self="log('父元素')">
      <button @click="log('按钮1')">按钮1</button>
      <button @click="log('按钮2')">按钮2</button>
      <button @click.once="log('按钮3')">按钮3</button>
    </div>

    <input type="text" @keydown.enter="submit">
  </div>
</template>


<style lang="scss">
.box {
  background: #ccc;
  h1 {
    color: red;
  }
}
.child {
  width: 100px;
  height: 100px;
}
.red {
  background: red;
}
.green {
  background: green;
}
.yellow {
  background: yellow;
}
.orange {
  background: orange;
}
</style>
