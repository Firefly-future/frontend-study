<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getFilmList } from '@/services'
import { ref, watch } from 'vue'
import FixedHeader from './components/FixedHeader.vue'
import Nav from './components/Nav.vue'
import { typeEnum } from './constants'

const scrollTop = ref(0)
const films = ref([])
const pageNum = ref(1)
const total = ref(0)
const route = useRoute()
const router = useRouter()

// 根据不同的路由调用接口
const getListData = async () => {
  const res = await getFilmList({
    type: typeEnum[route.params.type],
    pageNum: pageNum.value
  })
  films.value = films.value.concat(res.data.data.films)
  total.value = res.data.data.total
}

// 监听滚动
const filmScroll = e => {
  const { clientHeight, scrollTop: top, scrollHeight } = e.target
  scrollTop.value = top
  if (clientHeight + top + 1 >= scrollHeight && films.value.length < total.value && films.value.length > 0) {
    console.log('滚动到底部了')
    pageNum.value++
    getListData()
  }
}

const goDetail = id => {
  router.push({
    path: '/film/detail',
    query: {
      id
    }
  })
}

// 监听路由参数变化，给接口传入不同的参数
watch(
  route,
  async () => {
    if (!typeEnum[route.params.type]) {
      router.replace('/home/film/now')
      return
    }
    pageNum.value = 1
    films.value = []
    getListData()
  },
  {
    immediate: true
  }
)

</script>

<template>
  <div class="film-page" @scroll="filmScroll">
    <Nav />
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
    <div class="tip" v-show="films.length >= total">没有更多数据了</div>
  </div>
  <FixedHeader v-show="scrollTop > 400" />
</template>

<style lang='scss' scoped>
.film-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.tip {
  line-height: 40px;
  background: #ddd;
  text-align: center;
  color: #999;
}
</style>
