<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();

// 直接结构count 不是响应式变量，修改count时store上的数据不更新
// const { count } = userStore;

// 跟store中的count建立响应式链接

const { count } = storeToRefs(userStore);

const add = () => {
  console.log(count);
  console.log(count.value++);
  userStore.addAge(1);
};
</script>
<template>
  <h2>影院</h2>
  <button @click="add">count:{{ count }}</button>
  <div>{{ userStore }}</div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  background: #adc;
}
</style>
