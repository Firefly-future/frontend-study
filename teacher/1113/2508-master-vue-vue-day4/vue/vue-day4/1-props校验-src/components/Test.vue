<script>
export default {
  // props: ['title', 'price']
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 20
    },
    count: [String, Number],
    info: {
      type: Object,
      // 引用类型的默认值必须是函数
      default() {
        return {
          name: '小明',
          age: 22
        }
      }
    },
    tipType: {
      validator(value, props) {
        if (value === 'aa' || value === 'bb') {
          return true
        }
        return false
      }
    }
  },
  data() {
    return {
      a: 1
    }
  }
}
</script>

<template>
  <div class="test">
    <h2>{{ title }}</h2>
    <p>价格: ¥{{ price.toFixed(2) }}</p>
    <p>{{ info }}</p>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
