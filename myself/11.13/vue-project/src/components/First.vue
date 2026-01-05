<script>
export default {
    props: ['title', 'num']
}

</script>

<template>
    <div class="box1">
        <h6>我是第一个组件</h6>
        <div class="title">{{ title }}</div>
        <div class="num">{{ num }}</div>
    </div>
</template>

<style lang="scss" scoped>
.box1{
    border: 2px solid red;
}
</style>