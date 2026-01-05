<script>

export default {
    props:['list']
    
}

</script>

<template> 
<ul>
    <li v-for="item in list" :key="item.title">
        <img :src="item.src" alt="">
        <h2>{{ item.title }}</h2>
        <p>{{ item.price }}</p>
        <p>{{ item.alcohol }}</p>
        <p>{{ item.region }}</p>
        <p>{{ item.varietal }}</p>
        <p>{{ item.year }}</p>
    </li>
    <span @click="$emit('close')">❌</span>
</ul>

</template>

<style scoped>
ul{
    position: fixed;
    left: 0;
    top: 0; 
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(129, 124, 124);
    color: #fff;
    li{
        flex: 1;
        height: 100%;
        border: 1px solid #776f6f;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 30px;
        &:nth-child(2){
            background-color: #605d5d;
        }
    }
}
span{
        position: fixed;
        right: 10px;
        top: 10px;
        font-size: 20px;
        cursor: pointer;
    }

</style>
