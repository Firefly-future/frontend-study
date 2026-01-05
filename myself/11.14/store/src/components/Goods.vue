<script>
import { getGoods } from '@/serve';
import Carbar from './Carbar.vue';
import CarList from './CarList.vue';
import Detail from './Detail.vue';
export default {
    components: {
        Carbar,
        CarList,
        Detail
    },
    computed: {
        total() {
            return this.carList.reduce((prev, val) => {
                prev.count += val.count
                prev.price += val.count * val.price
                return prev
            }, {
                count: 0,
                price: 0
            })
        }
    },
    watch: {
        total: {
            handler() {
                if (this.total.count === 0) {
                    this.showList = false
                }
            },
            deep: true
        }
    },
    data() {
        return {
            activeIndex: 0,
            goods: [],
            showList: false,
            carList: [],
            foodDetail:null
        }
    },
    methods: {
        async getGoodsData() {
            try {
                const res = await getGoods()
                console.log(res.data.data)
                this.goods = res.data.data
                await this.$nextTick()
                this.offsetTops = [...this.$refs.tabContent.children].map(el => el.offsetTop)
                console.log(this.offsetTops)
            } catch (e) {
                console.log(e)
            }
        },
        changeCount(name, num) {
            this.goods.forEach((item, index) => {
                item.foods.forEach((food, i) => {
                    // 根据传入的name 查找所有数据
                    if (food.name === name) {
                        if (food.count) {
                            food.count += num
                            //数量为0 将食物从购物车中删除
                            if (food.count === 0) {
                                const index = this.carList.findIndex(v => v.name === name)
                                if (index > -1) {
                                    this.carList.splice(index, 1)
                                }
                            }
                        } else {
                            food.count = 1
                            // 购物车中无此食物名字，再添加
                            if (!this.carList.find(v => v.name === name)) {
                                this.carList.push(food)
                            }
                        }
                    }
                })
            })
        },
        clear() {
            this.carList.forEach(item => {
                item.count = 0
            })
            this.carList = []
        },
        changeFloor(index) {
            this.activeIndex = index
            this.$refs.tabContent.scrollTop = this.$refs.tabContent.children[index].offsetTop-180
            // 点击左侧按钮添加标记，1s内不要出发滚动事件
            this.isClick = true
            if (this.timeoutId) clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.isClick = false
            }, 1000);
        },
        scrollRight(e) {
            // 如果点击了左侧按钮不要触发滚动事件
            if (this.isClick) return
            // 根据当前滚动的位置去查找对应的高亮下标
            const index = this.offsetTops.findIndex((v, i) => {
                if (i === this.offsetTops.length - 1) return true
                return e.target.scrollTop >= v-195 && e.target.scrollTop < this.offsetTops[i + 1]-195
            })
            console.log(e.target.scrollTop, index)
            this.activeIndex = index
        }
    },
    created() {
        this.getGoodsData()
    }
}
</script>

<template>
    <div class="goods-wrap">
        <div class="tab-wrap">
            <div class="tab-nav">
                <div :class="['tab-nav-item', { active: activeIndex === index }]" v-for="(item, index) in goods"
                    :key="item.name" @click="changeFloor(index)">
                    <p>
                        <i v-if="item.type !== -1" :class="`icon${item.type}`"></i>
                        {{ item.name }}
                    </p>
                </div>
            </div>
            <div class="tab-content" ref="tabContent" @scroll="scrollRight">
                <div v-for="item in goods" :key="item.name" class="foods-wrap">
                    <h3>{{ item.name }}</h3>
                    <ul>
                        <li v-for="item in item.foods" :key="item.name" class="food">
                            <img :src="item.image" alt="" @click="foodDetail=item">
                            <div class="food-info">
                                <h4>{{ item.name }}</h4>
                                <h6>{{ item.description }}</h6>
                                <p>月售<span>{{ item.sellCount }}</span>份 好评率<span>{{ item.rating }}</span>%</p>
                                <div class="pirce-count">
                                    <p class="price">￥{{ item.price }}</p>
                                    <div class="btns">
                                        <template v-if="item.count > 0">
                                            <button @click="changeCount(item.name, -1)">-</button>
                                            {{ item.count }}
                                        </template>
                                        <button @click="changeCount(item.name, 1)">+</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <CarList v-if="showList" :list="carList" @changeCount="changeCount" @close="showList = false" @clear="clear">
        </CarList>
        <Carbar :count="total.count" :price="total.price" @toggleList="showList = !showList"></Carbar>
        <Detail
        v-if="foodDetail"
        :info="foodDetail"
        @back="foodDetail=false"
        @changeCount="changeCount"
        ></Detail>
    </div>
</template>

<style lang="scss" scoped>
.goods-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .tab-wrap {
        flex: 1;
        overflow: hidden;
        display: flex;

        .tab-nav {
            width: 80px;
            background: #F3F5F7;
            overflow: auto;
            font-size: 12px;
            color: #666674;

            .tab-nav-item {
                padding: 0 10px;
                height: 56px;
                color: #666;
                display: flex;
                justify-content: center;
                align-items: center;

                p {
                    text-align: center;

                    i {
                        width: 12px;
                        height: 12px;
                        background-size: 12px 12px;
                        background-position: center;
                        background-repeat: no-repeat;
                        display: inline-block;
                    }

                    .icon1 {
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDUxMzhFRUM1M0IzMTFFNkExMTdCNjk0ODU0MDU5Q0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDUxMzhFRUQ1M0IzMTFFNkExMTdCNjk0ODU0MDU5Q0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NTEzOEVFQTUzQjMxMUU2QTExN0I2OTQ4NTQwNTlDRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NTEzOEVFQjUzQjMxMUU2QTExN0I2OTQ4NTQwNTlDRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pox67+QAAARASURBVHjarFZbbBRVGP5mdvbS3e52t7Td2lDaIG2kSAtBIVHjBRMhhFBJMDU+EY3B8KCJvhiffODReCFqTPDBKAYvCTFqxCgB0lBjQhQUFlIs1KIi272wu3Rvs7MzfmdmOzPb1oQmnPS02/+c8//f//3f+c9KeOPnbQAOcsZxZ0eS80WFvw5x9jYtGQZQ55T4WZatv0ZjTVrClW5Y656mxTbOD3kaHQv3+xQZoRYFitdjBZsPWtGAWyqg1hlYshwXa+ayrPD/asPujBUigNrknZt23R1DYu8wxp8ewqN9BFKo4sHeCPZt6cEj96xANOwHUkWgrGFtdwif7FyDH/ashZ/AUGJAyQ6iKovSJSgP9/VF/Obc0BnEqXwV98db8dZjq8wt755NYuJyBluHOvH8+k776MTe9dhxOIFZkaFXNm1OABFU8E4EOZFqY8RDXnjvakWqXLNtL4x0Yf/GOGTziIF8pY6pXAVfTd1EVWRRc847AVQd8agfoyNxPLQybJtf3dyDZ9Z14Oy/RbOOAsexP/N4ffwa8nWdLBmYq2oo8DwqBOFXLPTGwgCajqjfg5fu60Zni9c2z5D/C9mKmYlBtBL5/WwyjV9/mwXaAw61PEt1NEThFFq2P1E1k5kKhg+dw8unZmzz27/cwM6DZ/DeuSQFYh0cag9i5UAM61j4/u5WbF4dxflnR3Bk1wBiAQap6UtQ1Bh1KiPHlOdHiv8LVG7xvUbaXqGivJRplXXzUv9eyvPejiC+vJzF0fOz1p0gIGXRBaNRNxzT/g1xPLwqAtWF6qNECj9eTGF0OI4xylaMk9cKOHD6L5y8MUeqPLZUZbf/FhanLebHtv422/ZATysGWfysK6vjMwUcOTGD71ns+XH6+i2cIHJDb77Rio28qmNsUxzvbO1HRCCwneWx/fAFjG10WlUswPU2P3+cfeYZCqGprdgZiHS0OqZ5odzOxfh8Mot6uoQul7I0w7jtjufUgI4TmTK+5mURWT7BFhEkZQHRY6jt3rDP3npdtANZvq0AslvH6TkVo58m8MHvSfq0eCzViDYawCb2HNM590xMk/uAZ5kZUG7RkA8Vj2bS4WmoYE7VEIv4sIXtQoyPL6WRvVm2lLKsANT7mp4wvtk92CStIB09NdBOwDKmWKMDP/1N9KxHXV8mReT7KmtwMV1GV9DrYk5iF+3jhdLx3Ld/oMgg8zL0ueRo3uAliq+4a5Atqnj8i0s4+uQgVlOGx6ZzOH4lhzdJ3fg/BYxTAAj57O6bYrGv5KqYJGXfXc3R22LaJL7J4rZE7JbN7ujzyQiy7eYEWsl6hEzOWxRH40Qr6AtzJll40SzNPc1J5JWmLBrvqsr+ruqadcBjydRccx9m7ynxCS2JJ1S8AYq80LnJoqhBapFZ9HNxS8X7+n+PvQmG+wT3wrm01LcBZAT6fZzviwf6Dn9tyYhe+Z8AAwA383zjPVFQZwAAAABJRU5ErkJggg==);
                    }

                    .icon2 {
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzEyMkUyN0Q1M0IzMTFFNkExMTdCNjk0ODU0MDU5Q0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzEyMkUyN0U1M0IzMTFFNkExMTdCNjk0ODU0MDU5Q0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMTIyRTI3QjUzQjMxMUU2QTExN0I2OTQ4NTQwNTlDRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMTIyRTI3QzUzQjMxMUU2QTExN0I2OTQ4NTQwNTlDRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pskd84kAAATBSURBVHjarFZtTJtVFH76DS2lfLQULQQnY2xukglu/hCzIRISNVOj84eKITpdsgQSY8zcYpYYF+cSNydGliXTaOKS/diELDATp4MMthFGcCIMNwKhyPhuoUAp0C+fe19ogU6NyU5y0/vee8859zznOedWhbrCUgBVHHbcXxnlqFTRwQAnmTHboQAQDgIqNaDWrdnzcy+0tKflguqfnAyKXasyVykGQ4tU0sOoS4BOpYE3OI+AWI9IGCadGWoanwl4+RmmqtDlhVTatQ5SeQUsLl0Leo1eua1vBIdz98BZfB4/bf8cRk0cEPAB/hme9uCrLe+hZ+dZ1D7+GR5NXA94B5V9EZmIKiqLUZf+WWRaNuL4IxX4Y6YPVr0FFq0JRdZ8BOncoDMiUZsAHyOy6iywG5Lxgr0QF0abkawxYLejFB92V8MroloBqXYlrnriucv+pBzf/lUvl72BeSz4xvBU+g58v/UQXYWQrk+KqB3OfQc2Q6o0NLzgwqddJwB9ciSSqANiaDMoit0z/ciIS5PzRK0RVTTc4P4dVb1n+G3Cy45i5Jmz5f61yU5cGW+Fl0m/NtVJiyYlJzERMHkhkTDKRnMWNpkfiuxUrNuN6cAcPmqppEY8Mk0PRhycctbi0p3TgPlhSQ4FHrW0h6WZ8qHSwa5PkV/7u0+iur9GzicWp7CrbT9uzTpRsr4MxetejRgXsi1pE3Zmv4Geknp8nXcQZjJPMnFVBILTTNRWwQjKmeEGvP7A03I+yeRfHG3Bz08cR37yFgSprCW+k0xmPG/78Ya34fZ7kaZPhD3OinPDl9Ew0sg8WCT1tZEIeLjAkotmdweGiKst6yW5k8R6OJBThkZ3Ow50fYEgYfCzLhbo+M2sF3GQUamY+H2dx3Bh6FfcFSzSJUaKT3EgwoIGlbe+xBxvYyQFM+KVJNvImE827MHpgTq0jl6lsllhCGuiL21b5Mwr6UW4Pd2LsYk2+EUusFy+dYVT/LWAScxlHRzKKccOawHzYSEUGswG53DT04sckwO3vQNwGGwwM6oQYTURVjNZtlLym8rxG51IqgKeKItoKIVGX3OUrFLwEIrnb3yAE5srUZ7xLDFuRLfnT5hIx8eSN6MoNV+eqx+7jgaOO3PDBCPqNFrXxO266wZqRpvgZKsQ1azUgQmeuSGc57oQceOjfWfx/tV3cdJZE1H/hhAe6zgCr2gnpHKsA7WBuVZhb8dRhvkWLk+0L3UonmdO2l03MciKLrVtR09xLZCcJ/eWJY1nYHQo+QyH7uFAMIlNbdw3DDfDNKij6CXw1kNT3fhh6JLsrKecP0JL/LPi0v/zUVjTX8NKNarCzH603MOiwtlvjvR8h9apLubiOTifqYFRRL2McGyrXhvBallWEB1VOmPo03MjqB1pwjSrO5U5EzWyLAth//9xoOJD48Pd+QlcHG/BonxMeJQ4h4lvWUsFCppFBU/LjvOLqw11I1dkN4i1VFfoEWRZBROX0w0pMoqRBTcrNxB7B65lm7JYC3HsU/0IBGaX6BlexXLhgLUNY4wBFp58BkV31MTH3Es+r4xAMkbQMta4EJ8AepwjKzb9xn/hRliBbMXDcw/jQlzCwV6OavFA3+e/LS6OfX8LMADW/rWE+F3eIAAAAABJRU5ErkJggg==);
                    }

                }

                &.active {
                    background: #fff;
                    color: #333;
                }
            }
        }
    }
}

.tab-content {
    flex: 1;
    overflow: auto;
    scroll-behavior: smooth;

    h3 {
        background: #F3F5F7;
        font-size: 12px;
        font-weight: normal;
        color: #666;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        padding-left: 14px;
    }

    .food {
        display: flex;
        padding: 12px;
        position: relative;

        .food-info {
            flex: 1;
            margin-left: 12px;
        }

        h4 {
            color: #5E5E5E;
            font-size: 14px;
        }

        h6 {
            color: #666;
            font-size: 10px;
        }

        p {
            font-size: 12px;
            color: #666;
        }

        .pirce-count {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 24px;

            .price {
                color: #f01414;
                font-size: 14px;
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
        }
    }
}
</style>
