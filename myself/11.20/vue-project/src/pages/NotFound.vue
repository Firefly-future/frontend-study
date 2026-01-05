<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="page">
        <h1>404NotFound</h1>
        <RouterLink to="/home">去首页</RouterLink>
    </div>
</template>
<style lang="scss" scoped>
.page{
    padding-top: 100px;
    text-align: center;
}
</style>