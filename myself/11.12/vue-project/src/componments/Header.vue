<script>

export default {
    props:['list']
}

</script>

<template>
<nav>
    <ul>
        <li v-for="item in list" :key="item.title" @click="$emit('change',item.title)">
            <img :src="item.src" alt="">
        </li>
        <li v-if="list.length<3"></li>
    </ul>
    <button :disabled="list.length<=1" @click="$emit('compare')">compare</button>
</nav>
</template>

<style scoped>
nav{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    font-size: 14px;
    ul{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        li{
            flex: 1;
            width: 40px;
            height: 50px;
            border: 1px solid #ccc;
            margin: 0 2px;
            font-size: 10px;
            img{
                width: 30px;
                height: 45px;
            }
        }
    }
    button{
        padding: 5px;
        background: #5055b7;
        &:disabled{
            background-color: #4c4d56;
        }
    }
}

</style>
