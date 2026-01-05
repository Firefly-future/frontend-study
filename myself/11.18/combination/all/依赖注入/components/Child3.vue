<script setup>
import { inject } from 'vue';
const rootTitle=inject('rootTitle')
const rootNum=inject('rootNum')
const changeTitle=inject('rootChangeTitle')
</script>

<template>
    <div class="child3">
        <h3>我是第三个子组件</h3>
        <p>rootTitle:{{ rootTitle }}</p>
        <p>{{ rootNum }}</p>
        <button @click="changeTitle('我是组件三')">修改标题</button>
    </div>
</template>

<style lang="scss" scoped>
.child3 {
    border: 1px solid blue;
    padding: 20px;
}
</style>