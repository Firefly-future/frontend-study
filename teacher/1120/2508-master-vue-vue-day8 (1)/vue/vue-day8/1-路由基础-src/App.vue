<script setup>
import { reactive, ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'

// 获取路由实例对象，可以跳转页面
const router = useRouter()

const navList = reactive([
  { path: '/home', title: '首页' },
  { path: '/detail', title: '详情' },
  { path: '/search', title: '搜索' },
  { path: '/login', title: '登陆' }
])

const goPage = path => {
  // 跳转路由，追加历史记录，可以返回
  // router.push(path)
  router.push({
    path
  })

  // 替换历史记录，不可以返回
  // router.replace(path)

  // 前进
  // router.forward()
  // 后退
  // router.back()
}
</script>

<template>
  <div class="app">
    <h2>app</h2>
    <nav>
      <!-- <RouterLink
        v-for="item in navList"
        :key="item.path"
        :to="item.path"
      >{{ item.title }}</RouterLink> -->
      <button
        v-for="item in navList"
        :key="item.path"
        @click="goPage(item.path)"
      >
        {{ item.title }}
      </button>
    </nav>
    <RouterView />
  </div>
</template>

<style lang='scss' scoped>
nav {
  display: flex;
  a {
    flex: 1;
    line-height: 40px;
    text-align: center;
  }
  .router-link-active {
    background: tomato;
  }
}
</style>
