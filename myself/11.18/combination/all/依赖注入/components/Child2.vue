<script setup>
import Child3 from './Child3.vue';

</script>

<template>
    <div class="child2">
        <h3>我是第二个子组件</h3>

        <Child3></Child3>
    </div>
</template>

<style lang="scss" scoped>
.child2 {
    border: 1px solid green;
    padding: 20px;
}
</style>