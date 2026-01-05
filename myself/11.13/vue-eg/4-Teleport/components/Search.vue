<script>
export default {
    name: 'Search',
    data() {
        return {
            title: '我是搜索'
        }
    },
    created() {
        console.log('创建成功 search')
    },
    beforeUnmount() {
        console.log('销毁成功 search')
    }
}
</script>

<template>
    <div class="box">
        <h2>{{ title }}</h2>
        搜索<input type="text" placeholder="请输入搜索内容" v-model="title">
    </div>
</template>

<style lang="scss" scoped>
.box {
    border: 1px solid red;
    padding: 20px;
}
</style>