<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from './store/user'

const userStore = useUserStore()

userStore.getUserInfo()
</script>

<template>
  <RouterView />
</template>

<style lang='scss' scoped>

</style>
