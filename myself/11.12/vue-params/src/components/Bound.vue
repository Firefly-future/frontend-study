<script>
export default {
    props: ['name', 'price', 'count', 'title'],
    data() {
        return {
        }
    },
    methods: {
        add() {
            this.$emit('change', {
                title: this.title,
                n: 1
            })
        },
        odd() {
            this.$emit('changeList', {
                title: this.title,
                n: 1
            })
        }
    }
}
</script>

<template>
    <div class="box">
        <!-- <h3>{{ name }}</h3> -->
        <h3>商品：{{ title }}</h3>
        <p>价格：{{ price }}</p>
        <button @click="$emit('change', { title, n: -1 })">-</button>
        <p>数量：{{ count }}</p>
        <button @click="add">+</button>
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
// scoped  此效果只在当前vue生效
.box {
    display: flex;
    align-items: center;
    background-color: #ccc;
    padding: 0 15px;

    button {
        background: red;
    }
}
</style>