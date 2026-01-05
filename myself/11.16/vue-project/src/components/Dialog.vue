<script>
export default {
    props: ['show','totalScore']
}

</script>

<template>
    <div class="dialog" v-if="show">
        <div class="tip">
            <h3>您的分数为</h3>
            <p>{{ totalScore() }}</p>
            <button @click="$emit('close',false)">确定</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.dialog{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}
.tip {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    p{
        color: red;
        margin: 10px 0;
    }
    button{
        padding: 5px 10px;
        background-color: #93D733;
        color: #fff;
    }
}
</style>