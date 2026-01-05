<script>
import Dialog from './Dialog.vue';
export default {
    components: {
        Dialog
    },
    name: 'Hot',
    data() {
        return {
            show: false
        }
    },
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
        <button @click="show = true">显示</button>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
        <!-- v-model:visible='show' -->
         <!--:value='visible' @input='visible=$event.target.value'-->
         <!-- Teleport 使目标文件传送到指定位置 -->
        <Teleport :to="'body'">
            <Dialog v-model:visible="show"></Dialog>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
.box {
    border: 1px solid red;
    padding: 20px;
}
</style>