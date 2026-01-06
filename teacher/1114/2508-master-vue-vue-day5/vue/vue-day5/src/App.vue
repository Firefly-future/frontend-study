<script>
import Header from './components/Header.vue'
import Goods from './components/Goods.vue'
import Comments from './components/Comments.vue'
import Store from './components/Store.vue'

import { getSeller } from './services'
export default {
  data () {
    return {
      sellerInfo: {},
      activeIndex: 1,
      navList: [
        { title: '商品', componentName: 'Goods' },
        { title: '评论', componentName: 'Comments' },
        { title: '商家', componentName: 'Store' }
      ]
    }
  },
  components: {
    Header,
    Goods,
    Comments,
    Store
  },
  methods: {
    // 获取商家信息
    async getSellerData () {
      try {
        const res = await getSeller()
        console.log(res.data.data)
        this.sellerInfo = res.data.data
      } catch(e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getSellerData()
  }
}
</script>

<template>
  <div class="app">
    <Header :info="sellerInfo" />
    <nav>
      <span
        v-for="(item, index) in navList"
        :key="item.title"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      >{{ item.title }}</span>
      <i :style="{ transform: `translateX(${100 * activeIndex}%)` }"></i>
    </nav>
    <main>
      <KeepAlive>
        <component
          :is="navList[activeIndex].componentName"
          :sellerInfo="sellerInfo"
        ></component>
      </KeepAlive>
    </main>
  </div>
</template>

<style lang='scss' scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
nav {
  height: 36px;
  border-bottom: 1px solid #ddd;
  display: flex;
  position: relative;
  span {
    flex: 1;
    line-height: 36px;
    text-align: center;
    color: #666;
    font-size: 14px;
    &.active {
      color: #f01414;
    }
  }
  i {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 2px;
    width: calc(100% / 3);
    background: #f01414;
    transition: transform 0.3s linear;
  }
}
main {
  flex: 1;
}
</style>
