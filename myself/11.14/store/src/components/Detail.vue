<script>
import Ratings from './Ratings.vue';
export default {
    components: {
        Ratings
    },
    props: ['info'],
    methods: {
        changeCounted(num) {
            this.$emit('changeCount', this.info.name, num)
        }
    },
    computed: {
        infoCount() {
            return this.info.count || 0
        }
    }
}
</script>

<template>
    <div class="food-detail">
        <div @click="$emit('back')">
            <svg t="1763385654091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4700" width="48" height="48">
                <path
                    d="M316.3 512l289.2 289.2c16.7 16.7 16.7 43.7 0 60.3-16.7 16.7-43.7 16.7-60.3 0L225.8 542.2c-16.7-16.7-16.7-43.7 0-60.3l319.4-319.4c16.7-16.7 43.7-16.7 60.3 0 16.7 16.7 16.7 43.7 0 60.3L316.3 512z"
                    fill="#000000" p-id="4701"></path>
            </svg>
        </div>
        <img :src="info.image" alt="">
        <div class="content">
            <h3>{{ info.name }}</h3>
            <p>月售{{ info.sellCount }}份 好评率{{ info.rating }}%</p>
            <div class="price-count">
                <div class="price">￥{{ info.price }}</div>
                <div class="btns">
                    <template v-if="infoCount > 0">
                        <button @click="changeCounted(-1)">-</button>
                        {{ infoCount }}
                        <button @click="changeCounted(1)">+</button>
                    </template>
                    <button v-else @click="changeCounted(1)" class="car">加入购物车</button>
                </div>
            </div>
        </div>
        <div class="blank"></div>
        <div class="summary">
            <h4>商品信息</h4>
            {{ info.info }}
        </div>
        <Ratings :ratingList="info.ratings"></Ratings>
    </div>
</template>

<style lang="scss" scoped>
.food-detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    overflow: auto;
    padding-bottom: 56px;
    background: #FFFFFF;

    img {
        width: 100vw;
        height: 375px;
    }

    .icon {
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        padding: 18px;

        h3 {
            font-size: 14px;
            color: #333;
            font-weight: 700;
            line-height: 14px;
            margin-bottom: 8px;
        }

        p {
            font-size: 10px;
            color: #999;
        }

        .price {
            color: #f01414;
        }
    }
}

.price-count {
    display: flex;
    align-items: center;
    height: 30px;
    justify-content: space-between;

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

    .car {
        background-color: #00A0DC;
        width: 100%;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border-radius: 15px;
        border: none;
    }
}

.blank {
    height: 16px;
    width: 100vw;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    border-top: 1px solid rgba(7, 17, 27, .1);
}

.summary {
    padding: 10px;
}
</style>