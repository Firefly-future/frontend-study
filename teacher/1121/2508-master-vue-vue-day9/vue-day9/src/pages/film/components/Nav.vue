<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navList } from '../constants'

const route = useRoute()

const activeIndex = computed(() => {
  return navList.findIndex(v => v.path === route.path)
})

</script>

<template>
  <nav>
    <RouterLink
      v-for="(item) in navList"
      :key="item.path"
      :to="item.path"
    >
      {{ item.title }}
    </RouterLink>
    <div class="line" :style="{ transform: `translateX(${activeIndex * 100}%)` }"></div>
  </nav>
</template>

<style lang='scss' scoped>
nav {
  height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  position: relative;
  a {
    flex: 1;
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: #333;
  }
  .router-link-active {
    color: tomato;
  }
  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    transition: transform 0.3s linear;
    &::after {
      content: '';
      display: block;
      margin: 0 auto;
      width: 72px;
      height: 3px;
      background: tomato;
    }
  }
}
</style>
