<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      show: true,
      num: 0,
      url: 'https://baidu.com'
    }
  },
  // 定义方法
  methods: {
    change () {
      this.title = Math.random()
    }
  }
}
</script>

<template>
  <div class="box">
    <button :disabled="url.length > 10" @click="change">修改</button>
    <h1>{{ title }}  aaaaaaaa</h1>
    <hr />
    <input type="text" @input="e => url = e.target.value" />
    <a v-bind:href="url">链接</a>
    <a :href="url">链接</a>
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
