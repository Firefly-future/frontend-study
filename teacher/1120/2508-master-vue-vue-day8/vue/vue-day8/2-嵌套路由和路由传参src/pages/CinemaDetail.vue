<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const info = ref({})

// 获取当前路由信息（path、query...）
const route = useRoute()
// console.log('获取 query 参数', route.query.cinemaId)
console.log('获取动态路由参数', route.params)

axios.get('https://m.maizuo.com/gateway/', {
  params: {
    // cinemaId: route.query.cinemaId,
    cinemaId: route.params.cinemaId,
    k: 6728459
  },
  headers: {
    'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
    'x-host':  'mall.film-ticket.cinema.info'
  }
})
  .then(res => {
    console.log(res.data.data.cinema)
    info.value = res.data.data.cinema
  })
</script>

<template>
  <div class="detail">
    <h1>{{ info.name }}</h1>
    <p>{{ info.address }}</p>
    <p>{{ info.notice }}</p>
  </div>
</template>

<style lang='scss' scoped>
.detail {
  background: tomato;
  width: 100vw;
  height: 100vh;
}
</style>
