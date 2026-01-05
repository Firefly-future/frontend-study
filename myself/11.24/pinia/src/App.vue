<script setup>
import { reactive } from "vue";
import { RouterView } from "vue-router";

const obj = reactive({ name: "xxx", age: 22 });
</script>
<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped></style>
