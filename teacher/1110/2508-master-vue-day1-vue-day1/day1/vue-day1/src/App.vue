<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      num: 0
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
    <h1>{{ title }}</h1>
    <button @click="num--">-</button>
    {{ num }}
    <button @click="num++">+</button>
    <!-- <div :class="['child', { red: num >= 5, border: num >= 10 }]"></div> -->
    <!-- <div :class="{ child: true, red: num > 10, border: num >= 5 }"></div> -->
    <!-- <div :class="['child', num >= 5 ? 'red' : 'green']"></div>  -->

    <div class="child" :style="[{ background: 'red', width: '300px' }, { border: '5px solid' }]"></div>
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
.border {
  border: 3px solid #333;
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
