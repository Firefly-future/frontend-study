<script>

import Star from './Star.vue';

export default {
    components: {
        Star
    },
    props: ['ratingList'],
    data() {
        return {
            activeIndex: 0,
            typelist: [
                { text: '全部', type: 0 },
                { text: '满意', type: 1 },
                { text: '不满意', type: 2, gray: true }
            ],
            on: true
        }
    },
    methods: {
        updateTime(time) {
            return new Date(time).toLocaleString().replace(/\//g, '-')
        }
    },
    computed: {
        filterList() {
            const type = this.typelist[this.activeIndex].type
            let list = this.ratingList
            if (type > 0) {
                list = list.filter(v => {
                    return type === 1 ? v.score > 3 : v.score < 3
                })
            }
            if (!this.on) return list
            return list.filter(v => v.text)
        }
    },
    watch: {
        ratingList: {
            handler() {
                // 监听评论列表改变，计算每种评论的数量
                this.typelist.forEach(item => {
                    if (item.type === 1) {
                        item.text += this.ratingList.filter(v => v.rateType === 0).length
                    } else if (item.type === 2) {
                        item.text += this.ratingList.filter(v => v.rateType === 1).length
                    } else {
                        item.text += this.ratingList.length
                    }
                })
            },
            immediate: true
        }
    }
}
</script>

<template>
    <div class="ratings">
        <div class="select-type">
            <span v-for="(item, index) in typelist" :key="item.type"
                :class="{ active: activeIndex === index, gray: item.gray }" @click="activeIndex = index">
                {{ item.text }}
            </span>
        </div>
        <div class="switch" :class="{ on }" @click="on = !on">
            <svg t="1763123333135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="5391" id="mx_n_1763123333137" width="16" height="16">
                <path
                    d="M512 10.180608C235.034624 10.180608 10.508288 235.266048 10.508288 512.9216S235.034624 1015.66464 512 1015.66464s501.491712-225.08544 501.491712-502.74304S788.965376 10.180608 512 10.180608z m263.69024 359.264256L442.761216 736.657408a40.96 40.96 0 0 1-59.342848 1.417216l-158.398464-158.79168c-15.976448-16.01536-15.94368-41.951232 0.07168-57.92768 16.01536-15.970304 41.949184-15.94368 57.925632 0.07168l127.981568 128.301056 304.003072-335.306752c15.19616-16.758784 41.099264-18.026496 57.856-2.832384 16.758784 15.194112 18.028544 41.097216 2.832384 57.856z"
                    fill="#515151" p-id="5392"></path>
            </svg>
            <span>只看有内容的评价</span>
        </div>
        <main>
            <ul>
                <li v-for="item in filterList" :key="item.rateTime">
                    <div class="avator">
                        <img width="28" height="28" :src="item.avator" alt="">
                    </div>
                    <div class="content">
                        <h3>
                            <b>{{ item.username }}</b>
                            <i>{{ updateTime(item.rateTime) }}</i>
                        </h3>
                        <div class="star">
                            <Star v-if="item.score" :num="item.score" :size="10"><span>{{ item.deliveryTime }}</span></Star>
                        </div>
                        <div class="text">{{ item.text }}</div>
                        <div><span v-for="val in item.recommend" :key="val">{{ val }}</span></div>
                    </div>
                </li>
            </ul>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.ratings {
    .select-type {
        display: flex;
        padding: 18px;

        span {
            padding: 8px 12px;
            font-size: 12px;
            color: #666;
            background: #CCECF8;
            margin-right: 8px;
        }

        .active {
            background-color: #00A0DC;
            color: #fff;
        }

        .gray {
            background: #ccc;

            &.active {
                background: #484646;
            }
        }
    }

    .switch {
        display: flex;
        align-items: center;
        color: #999;
        border-top: 1px solid rgba(7, 17, 27, .1);
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        line-height: 24px;
        padding: 12px 18px;

        .icon {
            margin-right: 10px;
        }

        &.on .icon path {
            fill: #1afa29;
        }

    }
}

ul {
    padding: 0 18px;

    li {
        display: flex;
        // flex-direction: column;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, .1);

        .content {
            margin-left: 14px;
            flex: 1;
            display: flex;
            flex-direction: column;

            h3 {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;

                b {
                    font-size: 12px;
                    color: #666;
                    font-weight: normal;
                }

                i {
                    font-weight: normal;
                    font-size: 12px;
                    color: #666;
                    font-style: normal;
                }
            }

            .text {
                margin-top: 6px;
                font-size: 12px;
                color: #333;
                line-height: 18px;
            }

            span {
                border-radius: 4px;
                padding: 0 6px;
                font-size: 10px;
                border: 1px solid rgba(7, 17, 27, .1);
                margin: 0 8px 4px 0;
                color: #999;
            }
        }
    }
}

.avator {
    width: 28px;
    height: 28px;
    overflow: hidden;
    border-radius: 50%;
}
</style>
