<script>
import Header from './componments/Header.vue';
import Main from './componments/Main.vue';
import Compare from './componments/Compare.vue';
import axios from 'axios';
export default {
  components: {
    Header,
    Main,
    Compare
  },
  data() {
    return {
      list: [],
      headerList: [],
      show: false
    }
  },
  methods: {
    async getList() {
      try {
        const res = await axios.get('http://39.96.210.90:3000/api/bottle')
        console.log(res.data)
        this.list = res.data.map(item => {
          return {
            ...item,
            // 图片路径
            src: 'http://39.96.210.90:3000/' + item.src
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    changeActive(title) {
      // 找到列表中与当前标题一致的
      const cur = this.list.find(v => v.title === title)
      if (this.headerList.length >= 3 && !cur.isActive) return
      cur.isActive = !cur.isActive
      if (cur.isActive) {
        this.headerList.push(cur)
      } else {
        this.headerList = this.headerList.filter(v => v.title !== title)
      }
    }
  },
  created() {
    this.getList()
  }
}

</script>

<template>
  <div class="container">
    <Header v-if="headerList.length > 0" :list="headerList" @change="changeActive" @compare="show = true"></Header>
    <main>
      <Main v-for="item in list" :key="item.title" :info="item" @changeActive="changeActive"></Main>
    </main>
    <Compare v-if="show" :list="headerList" @close="show = false"></Compare>
  </div>
</template>

<style scoped>
main {
  width: 700px;
  min-height: 400px;
  margin: 40px auto;
  background: #aaa;
  display: flex;
  flex-wrap: wrap;
}
</style>
