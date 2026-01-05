<script>

export default {
    props: ['visible']
}
</script>

<template>
    <div class="dialog" v-if="visible">
        <div class="content">
            <div class="close" @click="$emit('update:visible',false)" >X</div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.dialog {
    position: fixed;
    left: 0;
    top: 0;
    padding: 30px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #000000, $alpha: .5);
}

.content {
    // position: relative;
    width: 400px;
    height: 400px;
    background-color: #ddd;
}

.close {
    cursor: pointer;
}
</style>
