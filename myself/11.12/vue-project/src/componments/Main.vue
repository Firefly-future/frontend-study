<script>

export default {
    props:['info']
}

</script>

<template>
    <div :class="['container',{active:info.isActive}]">
        <span @click="$emit('changeActive',info.title)">
            {{ info.isActive? '✔️':'+' }}
        </span>
        <img :src="info.src" alt="">
        <h2>{{ info.title }}</h2>
        <p>{{ info.price }}</p>
        <button @click="$emit('changeActive',info.title)">加入购物车</button>
    </div>
</template>

<style scoped>
.container{
    width: 155px;
    height: 300px;
    border: 1px solid #ccc;
    margin: 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 20px;
    position: relative;
    span{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
    h2{
        margin: 5px 0;
        height: 60px;
    }
    .active{
        border-color: #adc;
    }
    button{
        padding: 3px 6px;
    }
}
</style>
