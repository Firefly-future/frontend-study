<script setup>
    import { formatTime } from '@/utils/util';
    import { useCount } from '../hooks/useCount'
    const { num } = useCount(7, true)
</script>
<template>
    <div class="child2">
        <h4>我是child2组件</h4>
        <h3>{{ formatTime(num*1000) }}</h3>
        <ul>
            <li v-for="i in 6">{{ i }}</li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .child2 {
        padding: 20px;
        border: 4px solid green;
    }
</style>