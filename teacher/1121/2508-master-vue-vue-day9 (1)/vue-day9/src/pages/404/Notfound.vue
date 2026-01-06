<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page">
    <p>访问的页面不存在</p>
    <RouterLink to="/home">去首页</RouterLink>
  </div>
</template>

<style lang='scss' scoped>
.page {
  text-align: center;
  padding-top: 100px;
}
</style>
