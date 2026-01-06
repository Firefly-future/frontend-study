<script>
export default {
  // 接收外层组件传入的数据
  inject: ['title', 'num', 'changeTitle', 'changeNum']
}
</script>

<template>
  <div class="box">
    <h3>{{ title }}</h3>
    <button @click="changeTitle(Math.random())">修改标题</button>
    <hr />
    <button @click="changeNum(num - 1)">-</button>
    {{ num }}
    <button @click="changeNum(num + 1)">+</button>
  </div>
</template>

<style lang='scss' scoped>
.box {
  padding: 20px;
  border: 3px green solid;
}
</style>
