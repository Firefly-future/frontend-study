<script>
// 全选
export default {
  data() {
    return {
      list: JSON.parse(localStorage.getItem('list')) || [
        { title: '苹果', price: 10, count: 1, checked: true },
        { title: '香蕉', price: 5, count: 2, checked: true },
        { title: '橘子', price: 3, count: 3, checked: false }
      ]
    }
  },
  watch: {
    list: {
      handler(newVal) {
        console.log('监听list', newVal)
        this.checkAll = this.list.every(v => v.checked)
        localStorage.setItem('list', JSON.stringify(this.list))
      },
      deep: true,
      immediate: true
    }

  },
  methods: {
    changeAll(e) {
      this.list.forEach(item => {
        item.checked = e.target.checked
      }
      )
    }
  },
  computed: {
    total() {
      return this.list.reduce((prev, val) => {
        return prev + (val.checked ? val.count * val.price : 0)
      }, 0)
    }
  }
}
</script>

<template>
  <div class="box">
    <div>
      <input type="checkbox" v-model="checkAll" @change="changeAll">全选
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="item.title">
        <h3>
          <input type="checkbox" v-model="item.checked">
          {{ item.title }}
        </h3>
        <p>价格：￥{{ item.price }}</p>
        <button @click="item.count++">+</button>
        <p>数量：{{ item.count }}</p>
        <template v-if="item.count>0">
          <button @click="item.count--">-</button>
        </template>
      </li>
    </ul>
    
    <div>总价：{{ total }}</div>
    {{ list }}

  </div>

</template>
<style lang="scss"></style>
