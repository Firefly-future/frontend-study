<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCinemaList } from '@/services'
import Header from './components/Header.vue'

const router = useRouter()
const cinemas = ref([])
const currentArae = ref('all')

const getData = async (ticketFlag = 1) => {
  try {
    const res = await getCinemaList({
      ticketFlag
    })
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

const citiesData = computed(() => {
  const options = [...new Set(cinemas.value.map(item => item.districtName))]
  const data = [{ label: '全城', value: 'all' }]
  return data.concat(options.map(v => ({ label: v, value: v })))
})

const filterCinemas = computed(() => {
  if (currentArae.value === 'all') return cinemas.value
  return cinemas.value.filter(v => v.districtName === currentArae.value)
})

</script>

<template>
  <div class="cinema-page">
    <Header
      @search="getData"
      @filterArea="e => currentArae = e"
      :cityOptions="citiesData"
    />
    <div class="list">
      <div
        v-for="item in filterCinemas"
        :key="item.cinemaId"
        class="cinema-item"
        @click="goDetail(item.cinemaId)"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.address }}</p>
        <p>¥{{ item.lowPrice }}起</p>
        <p>{{ item.Distance.toFixed(1) }}km</p>
        <p>区域：{{ item.districtName }}</p>
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
