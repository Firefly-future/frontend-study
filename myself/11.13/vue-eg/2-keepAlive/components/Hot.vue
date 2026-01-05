<script>
export default {
    name: 'Hot',
    created() {
        console.log('创建成功 hot')
    },
    beforeUnmount() {
        console.log('销毁成功 hot')
    }
}
</script>

<template>
    <div class="box">
        <h1>
            我是热歌榜
        </h1>
    </div>
</template>

<style lang="scss" scoped>
.box {
    border: 1px solid red;
    padding: 20px;
}
</style>