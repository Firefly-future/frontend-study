<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getFilmList } from '../services'
import { ref, watch } from 'vue'

const scrollTop = ref(0)
const films = ref([])
const route = useRoute()
const router = useRouter()

// 路由枚举值
const typeEnum = {
  now: 1,
  coming: 2
}

// 监听路由参数变化，给接口传入不同的参数
watch(route, async () => {
  const res = await getFilmList({
    type: typeEnum[route.params.type]
  })
  console.log(res.data.data.films)
  films.value = res.data.data.films
}, {
  immediate: true
})

const filmScroll = e => {
  // console.log(e.target.scrollTop)
  scrollTop.value = e.target.scrollTop
}

const goDetail = id => {
  router.push({
    path: '/film/detail',
    query: {
      id
    }
  })
}
</script>

<template>
  <div class="film-page" @scroll="filmScroll">
    <nav>
      <RouterLink to="/home/film/now">正在热映</RouterLink>
      <RouterLink to="/home/film/coming">即将上映</RouterLink>
    </nav>
    <div class="list">
      <div
        v-for="item in films"
        :key="item.filmId"
        class="film"
        @click="goDetail(item.filmId)"
      >
        <h3>{{ item.name }}</h3>
        <img :src="item.poster" width="100" alt="">
      </div>
    </div>
  </div>
  <div v-show="scrollTop > 400" class="fixed-header">
    <h3>
      <RouterLink to="/city">北京</RouterLink>
      电影
    </h3>
    <nav>
      <RouterLink to="/home/film/now">正在热映</RouterLink>
      <RouterLink to="/home/film/coming">即将上映</RouterLink>
    </nav>
  </div>
</template>

<style lang='scss' scoped>
.film-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  h3 {
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid;
    position: relative;
    a {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      text-align: center;
    }
  }
}
nav {
  height: 50px;
  border-bottom: 1px solid;
  display: flex;
  a {
    flex: 1;
    text-align: center;
    line-height: 50px;
  }
}
</style>
