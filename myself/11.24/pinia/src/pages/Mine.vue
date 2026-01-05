<script setup>
import { useUserStore } from "@/stores/user";
import { useGoodsStore } from "@/stores/goods";
const userStore = useUserStore();
const goodsStore = useGoodsStore();
</script>
<template>
  <h2>我的</h2>
  <input type="text" v-model="userStore.user.name" />
  <div>用户名：{{ userStore.user.name }}</div>
  <div @click="userStore.addAge(1)">年龄：{{ userStore.user.age }}</div>
  <div>性别：{{ userStore.user.sex }}</div>
  {{ goodsStore.goods }}
</template>
<style lang="scss" scoped></style>
