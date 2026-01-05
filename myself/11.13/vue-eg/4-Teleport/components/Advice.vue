<script>
export default {
    name:'Advice',
    data() {
        return {
            num: 1
        }
    },
    created() {
        console.log('创建成功 advice')
    },
    beforeUnmount() {
        console.log('销毁成功 advice')
    }
}
</script>

<template>
    <div class="box">
        <h1>我的新歌推荐</h1>
        <p>{{ num }}</p>
        <button @click="num++">点击+1</button>
    </div>
</template>

<style lang="scss" scoped>
.box {
    border: 1px solid red;
    padding: 20px;
}
</style>