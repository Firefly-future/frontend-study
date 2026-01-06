<script>

export default {
  name: 'Child3',
  data() {
    return {
      searchText: ''
    }
  },
  created() {
    console.log('%c child3 创建完成', 'color: green; font-size: 20px')
  },
  beforeUnmount() {
    console.log('%c child3 销毁之前', 'color: red; font-size: 20px')
  }
}
</script>

<template>
  <div class="test">
    <h2>组件3</h2>
    <input type="text" placeholder="搜索" v-model="searchText">
    {{ searchText }}
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
