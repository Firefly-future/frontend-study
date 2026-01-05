<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const show = ref(true);
const changeCount = () => {
  console.log(userStore.count++);
};
</script>
<template>
  <button @click="show = !show">显示</button>
  <h2 v-if="show">电影</h2>
  <hr />
  <button @click="userStore.addAge(1)">age+1</button>
  <button @click="userStore.user.age -= 5">age-5</button>
  <div>{{ userStore.user }}</div>
  <div>{{ userStore.info }}</div>
  <hr />
  <button @click="changeCount">{{ userStore.count }}</button>
  <hr />
</template>

<style lang="scss" scoped></style>
