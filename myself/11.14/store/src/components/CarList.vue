<script>
export default {
    props: ['list']
}
</script>

<template>
    <div class="carlist" @click.self="$emit('close')">
        <div class="cart-content">
            <div class="car-header">
                <b>购物车</b>
                <span @click="$emit('clear')">清空</span>
            </div>
            <ul class="list">
                <li v-for="food in list" :key="food.name">
                    <div class="name">{{ food.name }}</div>
                    <div class="price">￥{{ food.price }}</div>
                    <div class="btns">
                        <button @click="$emit('changeCount',food.name,-1)">-</button>
                        {{ food.count }}
                        <button @click="$emit('changeCount',food.name,1)">+</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.carlist {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba($color: #000000, $alpha: .5);
    z-index: 1;
}

.cart-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 48px;
    background-color: #fff;
}

.car-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F3F5F7;
    height: 40px;
    line-height: 40px;
    padding: 0 18px;

    b {
        color: #333;
        font-size: 14px;
    }

    span {
        color: #00a0dc;
        font-size: 12px;
    }
}

.list {
    max-height: 300px;
    overflow: auto;

    li {
        display: flex;
        padding: 8px 10px;

        .price {
            flex: 1;
            margin: 0 10px;
            color: #f01414;
            font-size: 14px;
            text-align: right;
        }
    }
}

.btns {
    display: flex;
    align-items: center;
}

button {
    background-color: #00A0DC;
    color: #fff;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    font-size: 18px;
    line-height: 18px;
    border-radius: 50%;
    border: none;
}
</style>