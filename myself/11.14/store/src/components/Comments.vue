<script>
import Star from './Star.vue';
import Ratings from './Ratings.vue';
import { getRatings } from '../serve/index.js';
export default {
    props: ['sellerInfo'],
    components: {
        Star,
        Ratings
    },
    data() {
        return {
            ratingList: []
        }
    },
    methods: {
        async getRatingsData() {
            try {
                const res = await getRatings()
                console.log(res.data.data)
                this.ratingList = res.data.data
            } catch (e) {
                console.log(e)
            }
        }
    },
    created() {
        this.getRatingsData()
    }
}
</script>

<template>
    <div class="comments">
        <div class="overview">
            <div class="overview-left">
                <div class="score">{{ sellerInfo?.score }}</div>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家<span>{{ sellerInfo?.rankRate }}%</span></div>
            </div>
            <div class="overview-right">
                <p class="serve"><b>服务态度</b>
                    <Star :num="sellerInfo?.serviceScore"></Star> <span>{{ sellerInfo?.serviceScore
                    }}</span>
                </p>
                <p class="rating-score"><b>商品评分</b>
                    <Star :num="sellerInfo?.foodScore"></Star> <span>{{ sellerInfo?.foodScore
                    }}</span>
                </p>
                <p><b>送达时间</b> <span>{{ sellerInfo?.deliveryTime }}分钟</span></p>
            </div>
        </div>
        <div class="blank"></div>
        <Ratings :ratingList="ratingList"></Ratings>
    </div>
</template>

<style lang="scss" scoped>
.overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
        width: 137px;
        border-right: 1px solid #d9dde1;
        text-align: center;

        .score {
            font-size: 24px;
            line-height: 28px;
            margin-bottom: 6px;
            color: #fc9153;
        }

        .title {
            font-size: 12px;
            color: #333;
            margin-bottom: 8px;
            line-height: 12px;
        }

        .rank {
            font-size: 10px;
            line-height: 10px;
            color: #999;
        }
    }

    .overview-right {
        flex: 1;

        p {
            display: flex;
            // justify-content: center;
            align-items: center;

            font-size: 12px;
            color: #333;
            margin-bottom: 7px;
            margin-left: 10px;

            b {
                font-weight: normal;
                margin-right: 10px;
            }

            span {
                color: #fc9153;
            }

            &:nth-child(3) span {
                color: #999;
            }
        }
    }
}

.blank {
    height: 16px;
    width: 100%;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    border-top: 1px solid rgba(7, 17, 27, .1);
}
</style>
