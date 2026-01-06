<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cinemas = ref([])

axios.get('https://m.maizuo.com/gateway', {
  params: {
    cityId: 110100,
    ticketFlag: 1,
    k: 3865988
  },
  headers: {
    'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
    'x-host': 'mall.film-ticket.cinema.list'
  }
})
  .then(res => {
    console.log(res.data.data.cinemas)
    cinemas.value = res.data.data.cinemas
  })

const goDetail = cinemaId => {
  // 通过动态路由传参数
  // router.push(`/cinema/detail/${cinemaId}`)
  router.push({
    name: 'cinemaDetail',
    params: {
      cinemaId
    }
  })

  // 通过 query 传参数
  // router.push(`/cinema/detail?cinemaId=${cinemaId}`)
  // router.push({
  //   path: '/cinema/detail',
  //   query: {
  //     cinemaId,
  //     a: 100,
  //     b: 200
  //   }
  // })
}

</script>

<template>
  <div class="cinema-page">
    <div
      v-for="item in cinemas"
      :key="item.cinemaId"
      class="cinema-item"
      @click="goDetail(item.cinemaId)"
    >
      <h3>{{ item.name }}</h3>
      <p>{{ item.address }}</p>
      <p>¥{{ item.lowPrice }}起</p>
      <p>{{ item.Distance.toFixed(1) }}km</p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cinema-page {
  height: 100%;
  overflow: auto;
}
.cinema-item {
  padding: 15px;
  border-bottom: 1px solid;
}
</style>
