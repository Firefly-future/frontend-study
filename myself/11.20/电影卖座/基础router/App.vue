<script setup>
import { ref, reactive } from "vue";
import { RouterLink, useRouter, RouterView } from "vue-router";
const router = useRouter();
const navList = reactive([
  {
    path: "/home",
    title: "首页",
  },
  {
    path: "/detail",
    title: "详情",
  },
  {
    path: "/search",
    title: "搜索",
  },
  {
    path: "/mine",
    title: "我的",
  },
]);

const goPath = (path) => {
  return router.push({
    path,
  });
};
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink v-for="item in navList" :key="item.path" :to="item.path">
        {{ item.title }}
      </RouterLink>
    </nav>
    <div class="view">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 50px;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    box-sizing: border-box;
    a {
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      padding: 10px 0;
      text-decoration: none;

      &.router-link-active {
        background-color: tomato;
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>
