<script>
export default {
  data() {
    return {
      title: '我是box',
      num: 10,
      sex: '男'
    }
  },
  methods: {
    add(n) {
      this.num += n
    }
  },
  created() {
    console.log(this)
  }
}
</script>

<template>
  <div class="box">
    <h3>我是box组件</h3>
    <p>num: {{ num }}</p>
    <button @click="add(1)">+</button>
  </div>
</template>

<style lang='scss' scoped>
.box {
  border: 3px solid green;
  padding: 20px;
  background: #ccc;
}
</style>
