<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      htmlstr: '我是一个<span style="color: #fff">标题</span>',
      list: [1,2,3,34,45]
    }
  }
}

</script>

<template>
  <div class="box">
    <h1 v-text="htmlstr"></h1>
    <h1 v-html="htmlstr"></h1>
    <h1>{{ htmlstr }} 12343232</h1>
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
