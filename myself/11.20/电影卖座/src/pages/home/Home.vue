<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
const navList = [
  {
    path: `/home/film`,
    title: "电影",
    matchPath: "/home/film",
  },
  { path: "/home/cinema", title: "影院" },
  { path: "/home/mine", title: "我的" },
];

const isActive = (item) => {
  if (item.matchPath) {
    return route.path.startsWith(item.matchPath);
  }
  return route.path === item.path;
};
// const activeIndex = [
//   {
//     path: "/home/film/now",
//     title: "电影",
//   },
//   {
//     path: "/home/film/coming",
//     title: "电影",
//   },
//   {
//     path: "/home/cinema",
//     title: "影院",
//   },
//   {
//     path: "/home/mine",
//     title: "我的",
//   },
// ];
</script>
<template>
  <div class="home">
    <main>
      <RouterView></RouterView>
    </main>
    <footer>
      <RouterLink
        v-for="item in navList"
        :key="item.path"
        :to="item.path"
        :class="{
          'router-link-active': isActive(item),
        }"
      >
        {{ item.title }}
      </RouterLink>
      <!-- <div class="btns" v-for="item in activeIndex" :key="item.path">
        {{ item.title }}
      </div> -->
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    overflow: auto;
  }
  // .btns {
  //   border-top: 1px solid #ddd;
  //   height: 50px;
  //   display: flex;
  //   background: #ddd;
  // }
  footer {
    border-top: 1px solid #ddd;
    height: 50px;
    display: flex;
    background: #fff;
    a {
      flex: 1;
      line-height: 50px;
      text-align: center;
      text-decoration: none;
      color: black;
    }
  }
}

.router-link-active {
  background: tomato;
}
</style>
