<script>

import Child2 from './Child2.vue';
export default {
    components: {
        Child2
    },
    props:['title']
}
</script>

<template>
    <div class="box1">
        <h5>{{ title }}的第一个组件</h5>
        <Child2></Child2>
    </div>
</template>

<style lang="scss" scoped>
.box1 {
    padding: 20px;
    border: 1px solid red;
}
</style>