<script setup>
import { getFilmDetail } from '@/services'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Photos from '@/components/Photos.vue'

const route = useRoute()
const info = ref({})
const showPhoto = ref(false)

getFilmDetail(route.query.id)
  .then(res => {
    console.log(res.data.data.film)
    info.value = res.data.data.film
  })
</script>

<template>
  <h1>{{ info.name }}</h1>
  <img :src="info.poster" width="150" alt="">
  <p>{{ info.synopsis }}</p>
  <ul>
    <li v-for="item in info.photos" :key="item" @click="showPhoto = true">
      <img :src="item" width="120" alt="">
    </li>
  </ul>
  <Photos
    v-model:visible="showPhoto"
    :photos="info.photos"
  />
</template>

<style lang='scss' scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}
</style>
