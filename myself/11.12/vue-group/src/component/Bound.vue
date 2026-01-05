<script>
export default{
    props:['name','price','count'],
    data(){
        return {
        }
    },
    methods:{
        add(){
            this.$emit('change',{
                name:this.name,
                n:1
            })
        }
    }
}
</script>

<template>
<div class="box">
    <h3>{{ name }}</h3>
    <p>价格：{{price}}</p>
    <button @click="$emit('change',{name,n:-1})">-</button>
    <p>数量：{{ count }}</p>
    <button @click="add">+</button>
</div>
</template>

<style lang="scss" scoped>
// scoped  此效果只在当前vue生效
.box{
    background-color: #ccc;
    padding: 0 15px;
    button{
        background: red;
    }
}
</style>