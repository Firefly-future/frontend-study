<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <main>
      <RouterView />
    </main>
    <footer>
      <RouterLink to="/home/film">电影</RouterLink>
      <RouterLink to="/home/cinema">影院</RouterLink>
      <RouterLink to="/home/mine">我的</RouterLink>
    </footer>
  </div>
</template>

<style lang='scss' scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    overflow: hidden;
  }
  footer {
    height: 50px;
    background: #fff;
    border-top: 1px solid #dddddd;
    display: flex;
    a {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
    .router-link-active {
      background: tomato;
    }
  }
}
</style>
