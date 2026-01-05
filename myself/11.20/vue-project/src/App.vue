<script setup>
  import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router';
  import { ref, reactive } from 'vue'

  // 获取路由实例对象，可以跳转页面
  const router = useRouter()
  const route = useRoute()
  const navList = reactive([
    { path: '/home', title: '首页' },
    { path: '/detail', title: '详情页' },
    { path: '/search', title: '搜索页' },
    { path: '/login', title: '登录页' }
  ])

  const goPage = path => {
    // 跳转路由，追加历史记录，可以返回，
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

  const isActive = path => {
    return route.path === path
  }

</script>

<template>
  <div class="app">
    <nav>
      <!-- <RouterLink v-for="item in navList" :key="item.path" :to="item.path">{{ item.title }}</RouterLink> -->
      <button v-for="item in navList" :key="item.path" @click="goPage(item.path)"
        :class="{ 'active': isActive(item.path) }">{{ item.title }}</button>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    overflow: auto;
  }

  nav {
    display: flex;
    align-items: center;
    height: 40px;

    button {
      flex: 1;
      height: 40px;

      &.active {
        background-color: tomato;
      }
    }
  }

  .router-link-active {
    background-color: tomato;
  }

</style>
