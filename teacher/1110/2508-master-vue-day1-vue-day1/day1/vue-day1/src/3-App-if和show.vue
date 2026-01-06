<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      list: [1,2,3,34,45],
      num: 10,
      flag: true
    }
  }
}


</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <div v-show="flag" class="red child"></div>
    <div v-if="num > 10 && num < 20" class="green child"></div>
    <div v-else-if="num >= 20 && num < 30" class="yellow child"></div>
    <div v-else class="orange child"></div>
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
