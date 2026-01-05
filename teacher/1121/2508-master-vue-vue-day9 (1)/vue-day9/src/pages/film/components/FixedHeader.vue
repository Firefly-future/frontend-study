<script setup>
import Nav from './Nav.vue'
</script>

<template>
  <div class="fixed-header">
    <h3>
      <RouterLink to="/city">北京</RouterLink>
      电影
    </h3>
    <Nav />
  </div>
</template>

<style lang='scss' scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  h3 {
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid;
    position: relative;
    a {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      text-align: center;
    }
  }
}
</style>
