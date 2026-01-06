<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCinemaList } from '@/services'
import Header from './components/Header.vue'

const router = useRouter()
const cinemas = ref([])

const getData = async () => {
  try {
    const res = await getCinemaList()
    console.log(res.data.data.cinemas)
    cinemas.value = res.data.data.cinemas
  } catch(e) {
    console.log(e)
  }
}
getData()

const goDetail = cinemaId => {
  router.push({
    name: 'cinemaDetail',
    params: {
      cinemaId
    }
  })
}

</script>

<template>
  <div class="cinema-page">
    <Header />
    <div class="list">
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
  </div>
</template>

<style lang='scss' scoped>
.cinema-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.list {
  flex: 1;
  overflow: auto;
}
.cinema-item {
  padding: 15px;
  border-bottom: 1px solid;
}
</style>
