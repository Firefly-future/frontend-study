<script>
export default {
    name:'Singer',
    data(){
        return {
            num:0
        }
    },
    created() {
        console.log('创建成功 singer')
        this.timer = setInterval(() => {
            this.num++
            console.log(this.num)
        }, 1000)
    },
    beforeUnmount() {
        console.log('销毁成功 singer')
        clearInterval(this.timer)
    },
    //   activated() {
    //     console.log('显示 singer')
    //     this.timer = setInterval(() => {
    //         this.num++
    //         console.log(this.num)
    //     }, 1000)
    // },
    // deactivated() {
    //     console.log('隐藏 singer')
    //     clearInterval(this.timer)
    // }
}
</script>

<template>
    <div class="box">
        <h1>
            我是歌手
        </h1>
    </div>
</template>

<style lang="scss" scoped>
.box {
    border: 1px solid red;
    padding: 20px;
}
</style>