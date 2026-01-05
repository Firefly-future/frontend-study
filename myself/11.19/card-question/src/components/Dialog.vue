<script setup>
const props=defineProps(['score'])
const emits=defineEmits(['close'])
</script>
<template>
    <div class="dialog">
       <div class="dialog-main">
         <h3>您的得分为</h3>
         <p>{{score }}</p>
         <button @click="emits('close')">确定</button>
       </div>
    </div>
</template>
<style lang="scss" scoped>
.dialog{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .dialog-main{
        width: 300px;
        height: 200px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
            margin: 15px 0;
            font-size: 20px;
            color: red;
        }
        button{
            width: 100px;
            height: 30px;
            background-color: #007bff;
            color: #fff;
            border-radius: 5px;
        }
    }
}
</style>