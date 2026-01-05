<script setup>
import { ref } from 'vue'

const showOption = ref(false)
</script>

<template>
  <div class="header">
    <div class="title-bar">
      <span>城市</span>
      <h3>影院</h3>
      <span>搜索</span>
    </div>
    <div class="filter">
      <div class="filter-item" @click="showOption = true">全城</div>
      <div class="filter-item" @click="showOption = true">App订票</div>
      <div class="filter-item" @click="showOption = true">最近去过</div>
    </div>
  </div>
  <template v-if="showOption">
    <div class="filter-mark" @click="showOption = false"></div>
    <div class="options"></div>
  </template>
</template>

<style lang='scss' scoped>
.header {
  height: 100px;
  border-bottom: 1px solid #ddd;
  position: relative;
  z-index: 1;
  background: #fff;
}
.title-bar {
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  text-align: center;
  h3 {
    flex: 1;
  }
  span {
    width: 60px;
  }
}
.filter {
  display: flex;
  line-height: 50px;
  .filter-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
}
.filter-mark {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: .5);
}
.options {
  position: absolute;
  top: 100px;
  height: 200px;
  width: 100%;
  background: #fff;
}
</style>
