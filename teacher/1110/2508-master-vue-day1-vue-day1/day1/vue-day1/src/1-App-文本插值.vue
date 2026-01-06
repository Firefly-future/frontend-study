<script>
let a = 100

export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      list: [1,2,3,34,45]
    }
  }
}
</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <h2>{{ a }}</h2>
    <div>{{ list }}</div>
  </div>
</template>


<style lang="scss">
.box {
  background: #ccc;
  h1 {
    color: red;
  }
}
</style>
