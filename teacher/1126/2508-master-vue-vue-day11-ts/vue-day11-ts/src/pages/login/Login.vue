<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const isLogin = ref(true)

</script>

<template>
  <div class="page">
    <LoginForm v-if="isLogin" />
    <RegisterForm v-else />
  </div>
</template>

<style lang='scss' scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: url(https://img.alicdn.com/tfs/TB1cpTewMHqK1RjSZFEXXcGMXXa-2872-1580.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
