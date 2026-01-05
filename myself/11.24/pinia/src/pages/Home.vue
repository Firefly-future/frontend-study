<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="home">
    <main>
      <RouterView></RouterView>
    </main>
    <footer>
      <RouterLink to="/home/film">电影</RouterLink>
      <RouterLink to="/home/creame">影院</RouterLink>
      <RouterLink to="/home/mine">我的</RouterLink>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: #adc;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
  }
  footer {
    border-top: 2px solid #ddd;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    a {
      flex: 1;
      text-align: center;
      text-decoration: none;
      border: 1px solid #ccc;
    }
    .router-link-active {
      background-color: #961;
    }
  }
}
</style>
