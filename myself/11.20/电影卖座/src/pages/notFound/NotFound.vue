<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="notFound">
    <h2>找不到页面</h2>
    <RouterLink :to="'/home'">去首页</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.notFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
